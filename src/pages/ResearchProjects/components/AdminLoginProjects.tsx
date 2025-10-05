import { AdminAuthDialog } from '@/components/AdminAuthDialog'

interface AdminLoginProjectsProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginProjects({ isOpen, onClose, onLogin }: AdminLoginProjectsProps) {
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
      title="Login Administrativo - Projetos de Pesquisa"
    />
  )
}
