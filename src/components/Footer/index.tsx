export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10" />
      <div className="bg-muted">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Linkedin
            </a>
            <a 
              href="http://www.pggeofisica.ufba.br/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pós-Graduação em Geofísica
            </a>
            <a 
              href="https://pggeologia.ufba.br/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pós-Graduação em Geologia
            </a>
          </div>
        </nav>
      </div>
    </footer>
  )
}