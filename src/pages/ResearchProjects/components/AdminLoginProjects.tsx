import { AdminAuthDialog } from '@/components/AdminAuthDialog'

interface AdminLoginProjectsProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginProjects({ isOpen, onClose, onLogin }: AdminLoginProjectsProps) {
  const handleSuccess = (role: string) => {
    console.log('🎯 HANDLE SUCCESS - Role:', role)
    if (role === 'coordenacao' || role === 'secretaria') {
      console.log('✅ Role aprovada, chamando onLogin')
      onLogin()
    } else {
      console.log('❌ Role não autorizada:', role)
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
