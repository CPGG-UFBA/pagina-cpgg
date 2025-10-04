import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import styles from './Map.module.css';

interface VisitorLocation {
  id: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  visitor_count: number;
}

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<VisitorLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track current visitor
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        console.log('Starting visitor tracking...');
        
        // Try to get visitor's IP
        let ip = 'unknown';
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ip = ipData.ip;
          console.log('Visitor IP:', ip);
        } catch (ipError) {
          console.error('Failed to get IP:', ipError);
        }
        
        // Try multiple geolocation APIs
        let locationData = null;
        
        // Try API 1: ipapi.co
        try {
          console.log('Trying ipapi.co...');
          const response1 = await fetch(`https://ipapi.co/${ip}/json/`);
          const data1 = await response1.json();
          console.log('ipapi.co response:', data1);
          
          if (data1.city && data1.country && !data1.error) {
            locationData = {
              city: data1.city,
              country: data1.country,
              latitude: parseFloat(data1.latitude),
              longitude: parseFloat(data1.longitude)
            };
          }
        } catch (e) {
          console.error('ipapi.co failed:', e);
        }
        
        // Try API 2: ip-api.com (as fallback)
        if (!locationData) {
          try {
            console.log('Trying ip-api.com...');
            const response2 = await fetch(`https://freeipapi.com/api/json/${ip}`);
            const data2 = await response2.json();
            console.log('freeipapi.com response:', data2);
            
            if (data2.cityName && data2.countryName) {
              locationData = {
                city: data2.cityName,
                country: data2.countryName,
                latitude: parseFloat(data2.latitude),
                longitude: parseFloat(data2.longitude)
              };
            }
          } catch (e) {
            console.error('freeipapi.com failed:', e);
          }
        }
        
        // If we got location data, save it
        if (locationData && locationData.latitude && locationData.longitude) {
          console.log('Saving location data:', locationData);
          
          // Check if location already exists
          const { data: existingLocation } = await supabase
            .from('visitor_locations')
            .select('*')
            .eq('city', locationData.city)
            .eq('country', locationData.country)
            .maybeSingle();

          if (existingLocation) {
            // Update visitor count
            const { error } = await supabase
              .from('visitor_locations')
              .update({ visitor_count: existingLocation.visitor_count + 1 })
              .eq('id', existingLocation.id);
            
            console.log('Updated visitor count:', error ? 'Error' : 'Success');
          } else {
            // Insert new location
            const { error } = await supabase
              .from('visitor_locations')
              .insert({
                city: locationData.city,
                country: locationData.country,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                visitor_count: 1
              });
            
            console.log('Inserted new location:', error ? 'Error - ' + error.message : 'Success');
          }
          
          // Reload locations
          const { data: updatedLocations } = await supabase
            .from('visitor_locations')
            .select('*');
          
          if (updatedLocations) {
            console.log('Loaded locations:', updatedLocations.length);
            setLocations(updatedLocations);
          }
        } else {
          console.error('Could not determine location');
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  // Load visitor locations
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('visitor_locations')
          .select('*');

        if (error) throw error;
        
        setLocations(data || []);
      } catch (error) {
        console.error('Error loading locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with a basic style (no token needed for basic styles)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'simple-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'simple-tiles'
          }
        ]
      },
      center: [0, 0],
      zoom: 2,
      projection: 'globe'
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  // Add markers when locations are loaded
  useEffect(() => {
    if (!map.current || isLoading || locations.length === 0) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.visitor-marker');
    existingMarkers.forEach(marker => marker.remove());

    locations.forEach(location => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'visitor-marker';
      markerElement.style.cssText = `
        width: ${Math.max(20, Math.min(50, location.visitor_count * 5))}px;
        height: ${Math.max(20, Math.min(50, location.visitor_count * 5))}px;
        background: radial-gradient(circle, #ff6b6b, #ee5a52);
        border: 2px solid #fff;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      `;
      markerElement.textContent = location.visitor_count.toString();

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 5px 0; color: #333;">${location.city}, ${location.country}</h3>
          <p style="margin: 0; color: #666;">Visitantes: ${location.visitor_count}</p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [locations, isLoading]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mapa de Visitantes do CPGG</h1>
          <p className={styles.subtitle}>
            Visualize a localização de todos os visitantes do site ao redor do mundo
          </p>
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.mapWrapper}>
            <div className={styles.mapContainer}>
              <div ref={mapContainer} className={styles.map} />
              {isLoading && (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p>Carregando dados dos visitantes...</p>
                </div>
              )}
            </div>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Total de Localizações</h3>
                <p className={styles.statNumber}>{locations.length}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Total de Visitantes</h3>
                <p className={styles.statNumber}>
                  {locations.reduce((sum, loc) => sum + loc.visitor_count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.earthSide}>
            <img 
              src="https://i.imgur.com/z6pTgZ1.jpg" 
              alt="Terra CPGG" 
              className={styles.earthImage}
            />
            <p className={styles.earthText}>Conectando o mundo através da Geofísica</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}