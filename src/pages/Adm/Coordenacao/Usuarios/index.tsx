import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Undo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import logocpgg from '@/assets/cpgg-logo.jpg'
import styles from './usuarios.module.css'

interface UserProfile {
  id: string
  full_name: string
  email: string
  institution: string
  phone: string
  user_id: string
}

interface AdminUser {
  id: string
  email: string
  role: string
}

export function UsuariosAdmin() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null)
  const [deletedUsers, setDeletedUsers] = useState<UserProfile[]>([])
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = sessionStorage.getItem('admin_user')
    if (userData) {
      setAdminUser(JSON.parse(userData))
      // Sincroniza auth.users -> user_profiles antes de listar
      supabase.rpc('sync_auth_users_to_profiles').then(() => {
        loadUsers()
      })
    } else {
      navigate('/adm/coordenacao')
    }
  }, [navigate])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('full_name', { ascending: true })

      if (error) throw error

      setUsers(data || [])
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar usuários.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncUsers = async () => {
    setIsSyncing(true)
    try {
      const { data, error } = await supabase
        .rpc('sync_auth_users_to_profiles')

      if (error) throw error

      const result = data as { success: boolean; synced_users: number; message?: string; error?: string }
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao sincronizar usuários')
      }

      toast({
        title: 'Sincronização concluída',
        description: `${result.synced_users} usuário(s) sincronizado(s) com sucesso.`,
      })

      // Recarregar a lista
      await loadUsers()
    } catch (error: any) {
      console.error('Erro ao sincronizar usuários:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao sincronizar usuários. Tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsSyncing(false)
    }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      // Usar função SQL para deletar do banco e auth
      const { data, error } = await supabase
        .rpc('delete_user_complete', {
          _user_profile_id: userToDelete.id
        })

      if (error) throw error

      const result = data as { success: boolean; error?: string; message?: string }
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao deletar usuário')
      }

      // Adicionar à lista de deletados para possível desfazer
      setDeletedUsers(prev => [...prev, userToDelete])

      // Remover da lista atual
      setUsers(prev => prev.filter(user => user.id !== userToDelete.id))

      toast({
        title: 'Usuário removido',
        description: `${userToDelete.full_name} foi removido com sucesso.`,
      })

      setDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao remover usuário. Tente novamente.',
        variant: 'destructive'
      })
    }
  }

  const handleUndoDelete = async (deletedUser: UserProfile) => {
    try {
      // Restaurar na tabela user_profiles
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: deletedUser.id,
          user_id: deletedUser.user_id,
          full_name: deletedUser.full_name,
          email: deletedUser.email,
          institution: deletedUser.institution,
          phone: deletedUser.phone,
          first_name: deletedUser.full_name.split(' ')[0],
          researcher_route: null
        })

      if (error) throw error

      // Adicionar de volta à lista
      setUsers(prev => [...prev, deletedUser].sort((a, b) => a.full_name.localeCompare(b.full_name)))

      // Remover da lista de deletados
      setDeletedUsers(prev => prev.filter(user => user.id !== deletedUser.id))

      toast({
        title: 'Usuário restaurado',
        description: `${deletedUser.full_name} foi restaurado com sucesso.`,
      })
    } catch (error: any) {
      console.error('Erro ao restaurar usuário:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao restaurar usuário. Tente novamente.',
        variant: 'destructive'
      })
    }
  }

  const openDeleteDialog = (user: UserProfile) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <p>Carregando usuários...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logocpgg} alt="CPGG Logo" className={styles.logo} />
        <h1>Administrar Usuários</h1>
        <Button
          onClick={() => navigate('/adm/coordenacao/dashboard')}
          variant="outline"
          className={styles.backButton}
        >
          ← Voltar ao Dashboard
        </Button>
        <Button
          onClick={handleSyncUsers}
          disabled={isSyncing}
          className={styles.syncButton}
        >
          {isSyncing ? 'Sincronizando...' : 'Sincronizar Usuários'}
        </Button>
      </div>

      {deletedUsers.length > 0 && (
        <div className={styles.undoSection}>
          <h3>Usuários removidos recentemente:</h3>
          {deletedUsers.map(user => (
            <div key={user.id} className={styles.undoItem}>
              <span>{user.full_name}</span>
              <Button
                onClick={() => handleUndoDelete(user)}
                variant="outline"
                size="sm"
                className={styles.undoButton}
              >
                <Undo size={16} />
                Desfazer
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Instituição</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.institution}</td>
                <td>{user.phone}</td>
                <td>
                  <Button
                    onClick={() => openDeleteDialog(user)}
                    variant="destructive"
                    size="sm"
                    className={styles.deleteButton}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum usuário cadastrado encontrado.</p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Usuário</DialogTitle>
            <DialogDescription>
              Deseja remover o usuário {userToDelete?.full_name}?
              <br />
              Esta ação irá deletar todas as informações do usuário do banco de dados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              NÃO
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
            >
              SIM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}