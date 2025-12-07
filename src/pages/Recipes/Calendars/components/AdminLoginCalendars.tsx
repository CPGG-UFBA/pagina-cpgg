import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface AdminLoginCalendarsProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
}

export function AdminLoginCalendars({ isOpen, onClose, onLogin }: AdminLoginCalendarsProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      onLogin(email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError('Credenciais inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[320px] !p-3 !gap-0" style={{ maxHeight: 'fit-content' }}>
        <DialogHeader className="!pb-1 !space-y-0">
          <DialogTitle className="text-sm">Login - Calendários</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="space-y-0.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-0.5">
            <Label htmlFor="password" className="text-xs">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="h-7 text-xs"
            />
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
          <div className="flex justify-end gap-1 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} size="sm" className="h-7 text-xs px-2">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} size="sm" className="h-7 text-xs px-2">
              {isLoading ? '...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
