import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import styles from './VisitorCounter.module.css';

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const { data, error } = await supabase
          .from('visitor_locations')
          .select('visitor_count');

        if (error) throw error;

        // Sum all visitor counts from all locations
        const total = data?.reduce((sum, location) => sum + location.visitor_count, 0) || 0;
        setVisitorCount(total);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(0);
      }
    };

    fetchVisitorCount();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchVisitorCount, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.counter}>
      <span className={styles.text}>
        Visitantes: {visitorCount.toLocaleString()}
      </span>
    </div>
  );
}
