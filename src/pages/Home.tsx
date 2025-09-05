import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Home</h1>
      <p className="text-lg mb-8">Bem-vindo à página inicial.</p>
      
      <Link to="/upload">
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Acessar Upload de Arquivos
        </Button>
      </Link>
    </div>
  )
}