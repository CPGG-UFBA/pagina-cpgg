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
  const [visitorCount, setVisitorCount] = useState<number>(0);

  // Get visitor count from localStorage (same as footer)
  useEffect(() => {
    const storageKey = 'cpgg_unique_visitors';
    const existingVisitors = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setVisitorCount(existingVisitors.length);
  }, []);

  // Load visitor locations from database
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

  // Track visitor location using edge function (only once per session)
  useEffect(() => {
    const sessionKey = 'cpgg_map_tracked';
    if (sessionStorage.getItem(sessionKey)) return;
    
    sessionStorage.setItem(sessionKey, 'true');
    
    const trackLocation = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('track-visitor-location');
        
        if (error) {
          console.error('Error tracking location:', error);
          return;
        }
        
        if (data?.locations) {
          setLocations(data.locations);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error calling track-visitor-location:', error);
        setIsLoading(false);
      }
    };

    trackLocation();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with OpenStreetMap tiles
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [-43, -15],
      zoom: 3,
      attributionControl: true
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers when locations are loaded
  useEffect(() => {
    if (!map.current || isLoading || locations.length === 0) return;

    const addMarkers = () => {
      if (!map.current?.loaded()) {
        setTimeout(addMarkers, 100);
        return;
      }

      // Clear existing markers
      document.querySelectorAll('.visitor-marker').forEach(m => m.remove());

      // Add new markers
      locations.forEach(location => {
        const size = Math.max(20, Math.min(50, location.visitor_count * 5));
        
        const el = document.createElement('div');
        el.className = 'visitor-marker';
        el.style.cssText = `
          width: ${size}px;
          height: ${size}px;
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
        el.textContent = location.visitor_count.toString();

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #333;">${location.city}, ${location.country}</h3>
            <p style="margin: 0; color: #666;">Visitantes: ${location.visitor_count}</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      });
    };

    addMarkers();
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
                  <p>Carregando mapa...</p>
                </div>
              )}
            </div>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Total de Visitantes</h3>
                <p className={styles.statNumber}>{visitorCount.toLocaleString()}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Localizações Rastreadas</h3>
                <p className={styles.statNumber}>{locations.length}</p>
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