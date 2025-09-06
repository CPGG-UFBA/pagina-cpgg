import React from 'react';

interface TransparentCardProps {
  children: React.ReactNode;
}

export function TransparentCard({ children }: TransparentCardProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '2rem',
      backdropFilter: 'blur(10px)',
      marginBottom: '2rem'
    }}>
      {children}
    </div>
  );
}