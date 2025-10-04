import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting visitor location tracking...')

    // Get visitor IP from headers
    const forwarded = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const ip = forwarded?.split(',')[0] || realIp || 'unknown'
    
    console.log('Visitor IP:', ip)

    // Don't track localhost IPs
    if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      console.log('Skipping localhost IP')
      return new Response(
        JSON.stringify({ message: 'Localhost IP not tracked', locations: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Try to get location data from IP
    let locationData: LocationData | null = null

    // Try ipapi.co first (1000 requests/day free)
    try {
      console.log('Trying ipapi.co...')
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      const data = await response.json()
      
      console.log('ipapi.co response:', data)
      
      if (data.city && data.country_name && data.latitude && data.longitude && !data.error) {
        locationData = {
          city: data.city,
          country: data.country_name,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude)
        }
        console.log('Successfully got location from ipapi.co')
      }
    } catch (error) {
      console.error('ipapi.co failed:', error)
    }

    // If first API failed, try ip-api.com (45 requests/minute free)
    if (!locationData) {
      try {
        console.log('Trying ip-api.com...')
        const response = await fetch(`http://ip-api.com/json/${ip}`)
        const data = await response.json()
        
        console.log('ip-api.com response:', data)
        
        if (data.status === 'success' && data.city && data.country) {
          locationData = {
            city: data.city,
            country: data.country,
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon)
          }
          console.log('Successfully got location from ip-api.com')
        }
      } catch (error) {
        console.error('ip-api.com failed:', error)
      }
    }

    // If we couldn't get location data, return empty
    if (!locationData) {
      console.log('Could not determine location')
      return new Response(
        JSON.stringify({ message: 'Could not determine location', locations: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Saving location to database:', locationData)

    // Check if location already exists
    const { data: existingLocation, error: selectError } = await supabase
      .from('visitor_locations')
      .select('*')
      .eq('city', locationData.city)
      .eq('country', locationData.country)
      .maybeSingle()

    if (selectError) {
      console.error('Error checking existing location:', selectError)
      throw selectError
    }

    if (existingLocation) {
      // Update visitor count
      console.log('Updating existing location, current count:', existingLocation.visitor_count)
      const { error: updateError } = await supabase
        .from('visitor_locations')
        .update({ visitor_count: existingLocation.visitor_count + 1 })
        .eq('id', existingLocation.id)

      if (updateError) {
        console.error('Error updating location:', updateError)
        throw updateError
      }
      console.log('Successfully updated location')
    } else {
      // Insert new location
      console.log('Inserting new location')
      const { error: insertError } = await supabase
        .from('visitor_locations')
        .insert({
          city: locationData.city,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          visitor_count: 1
        })

      if (insertError) {
        console.error('Error inserting location:', insertError)
        throw insertError
      }
      console.log('Successfully inserted new location')
    }

    // Get all locations to return
    const { data: allLocations, error: fetchError } = await supabase
      .from('visitor_locations')
      .select('*')

    if (fetchError) {
      console.error('Error fetching locations:', fetchError)
      throw fetchError
    }

    console.log('Returning', allLocations?.length || 0, 'locations')

    return new Response(
      JSON.stringify({ 
        message: 'Location tracked successfully',
        locations: allLocations || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in track-visitor-location:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
