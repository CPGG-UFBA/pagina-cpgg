import { AdminAuthDialog } from '@/components/AdminAuthDialog'

interface AdminLoginEventPhotosProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginEventPhotos({ isOpen, onClose, onLogin }: AdminLoginEventPhotosProps) {
  const handleSuccess = (role: string) => {
    if (role === 'coordenacao' || role === 'secretaria') {
      onLogin()
    }
  }

  return (
    <AdminAuthDialog
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={handleSuccess}
      requiredRole="any"
      title="Login Administrativo - Fotos de Eventos"
    />
  )
}
