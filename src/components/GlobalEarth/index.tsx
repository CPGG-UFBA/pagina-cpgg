import earth from '../../assets/earth-imgur.png'

export function GlobalEarth() {
  console.log('GlobalEarth renderizando...')
  
  return (
    <div 
      id="global-earth-debug"
      style={{
        position: 'fixed',
        top: '140px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        width: '250px',
        height: '250px',
        display: 'block',
        visibility: 'visible',
        backgroundColor: 'red',
        border: '5px solid yellow'
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
        onLoad={() => console.log('Imagem da Terra carregada!')}
        onError={() => console.log('Erro ao carregar imagem da Terra')}
      />
    </div>
  )
}