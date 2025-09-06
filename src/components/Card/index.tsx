import React from 'react';

interface CardProps {
  children: React.ReactNode;
  height?: number;
}

export function Card({ children, height }: CardProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '1.5rem',
      minHeight: height ? `${height}px` : 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      {children}
    </div>
  );
}