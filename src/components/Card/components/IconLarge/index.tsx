import React from 'react';

interface IconLargeProps {
  children: React.ReactNode;
}

export function IconLarge({ children }: IconLargeProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem'
    }}>
      {children}
    </div>
  );
}