import React from 'react';

interface CheckBoxProps {
  id: string;
  label: string;
}

export function CheckBox({ id, label }: CheckBoxProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    }}>
      <input
        type="checkbox"
        id={id}
        style={{
          width: '16px',
          height: '16px',
          accentColor: '#2c66b8'
        }}
      />
      <label
        htmlFor={id}
        style={{
          fontSize: '0.9rem',
          color: '#333',
          cursor: 'pointer'
        }}
      >
        {label}
      </label>
    </div>
  );
}