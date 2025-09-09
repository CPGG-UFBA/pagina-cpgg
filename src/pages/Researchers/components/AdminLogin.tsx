import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface AdminLoginProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .in('role', ['secretaria', 'coordenacao'])
        .single()

      if (error || !data) {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos, ou usuário sem permissão.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login realizado",
        description: "Modo de edição ativado.",
      })
      
      setEmail('')
      setPassword('')
      onLogin()
    } catch (error) {
      console.error('Erro no login:', error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login Administrativo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-background text-foreground border-border hover:bg-muted">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}