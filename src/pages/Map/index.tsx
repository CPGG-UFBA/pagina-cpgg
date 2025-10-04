import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [locations, setLocations] = useState<VisitorLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate total visitors from all locations
  const totalVisitors = locations.reduce((sum, loc) => sum + loc.visitor_count, 0);

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

  // Track visitor location on every page load
  useEffect(() => {
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

    // Create map
    map.current = L.map(mapContainer.current, {
      center: [-15, -43],
      zoom: 3,
      scrollWheelZoom: true,
      zoomControl: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers when locations change
  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      if (!map.current) return;

      const size = Math.max(20, Math.min(50, location.visitor_count * 5));
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, #ff6b6b, #ee5a52);
          border: 2px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">${location.visitor_count}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([location.latitude, location.longitude], { icon })
        .bindPopup(`
          <div style="padding: 5px;">
            <h3 style="margin: 0 0 5px 0; color: #333; font-size: 14px;">${location.city}, ${location.country}</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">Visitantes: ${location.visitor_count}</p>
          </div>
        `)
        .addTo(map.current);

      markersRef.current.push(marker);
    });
  }, [locations]);

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
                <p className={styles.statNumber}>{totalVisitors.toLocaleString()}</p>
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