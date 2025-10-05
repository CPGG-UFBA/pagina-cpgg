import { AdminAuthDialog } from '@/components/AdminAuthDialog'

interface AdminLoginEventsProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginEvents({ isOpen, onClose, onLogin }: AdminLoginEventsProps) {
  const handleSuccess = (role: string) => {
    if (role === 'coordenacao' || role === 'ti') {
      onLogin()
    }
  }

  return (
    <AdminAuthDialog
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={handleSuccess}
      requiredRole="any"
      title="Login Administrativo - Eventos"
    />
  )
}
