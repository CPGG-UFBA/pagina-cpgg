import earth from '../../assets/earth-imgur.png'

export function GlobalEarth() {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '140px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '250px',
        height: '250px',
        display: 'block',
        visibility: 'visible',
        pointerEvents: 'none'
      }}
    >
      <img 
        src={earth} 
        alt='Terra Global CPGG' 
        style={{
          width: '250px',
          height: '250px',
          objectFit: 'contain',
          borderRadius: '50%',
          margin: '0',
          padding: '0',
          display: 'block',
          maxWidth: 'none',
          maxHeight: 'none'
        }}
      />
    </div>
  )
}