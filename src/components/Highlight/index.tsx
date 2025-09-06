import React from 'react';

interface HighlightProps {
  title: string;
  color: string;
  subtitle?: string;
  colorSubtitle?: string;
}

export function Highlight({ title, color, subtitle, colorSubtitle }: HighlightProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{
        color: color,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0'
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          color: colorSubtitle || color,
          fontSize: '1rem',
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}