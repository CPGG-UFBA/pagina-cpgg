import earth from '../../assets/earth-imgur.png'

export function GlobalEarth() {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '135px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '250px',
        height: '250px',
        display: 'block',
        visibility: 'visible'
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
          display: 'block'
        }}
      />
    </div>
  )
}