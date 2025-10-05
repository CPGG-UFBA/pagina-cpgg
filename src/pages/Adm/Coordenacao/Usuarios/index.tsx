import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Undo, ArrowLeft } from 'lucide-react'
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
import { LabChiefSelector } from '@/components/LabChiefSelector'
import logocpgg from '@/assets/cpgg-logo.jpg'
import styles from './usuarios.module.css'

interface UserProfile {
  id: string
  full_name: string
  email: string
  institution: string
  phone: string
  user_id: string
  researcher_route: string | null
  role?: string
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
      // Load regular users
      const { data: profilesData, error: profilesError } = await supabase
        .rpc('list_all_user_profiles')

      if (profilesError) throw profilesError

      // Load admin users (secretaria, TI, and coordenacao)
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email, role, full_name')
        .in('role', ['secretaria', 'ti', 'coordenacao'])
      
      if (adminError) throw adminError

      // Combine both lists
      const regularUsers = (profilesData || []).map((user: UserProfile) => ({
        ...user,
        role: user.researcher_route ? 'pesquisador' : 'usuario'
      }))

      const adminUsers = (adminData || []).map((admin: any) => ({
        id: admin.id,
        full_name: admin.full_name || admin.email.split('@')[0],
        email: admin.email,
        institution: 'UFBA',
        phone: '-',
        user_id: admin.id,
        researcher_route: null,
        role: admin.role
      }))

      setUsers([...regularUsers, ...adminUsers])
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
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    // Impedir secretária de deletar coordenador
    if (adminUser?.role === 'secretaria' && userToDelete.role === 'coordenacao') {
      toast({
        title: 'Ação não permitida',
        description: 'Secretária não pode remover o coordenador.',
        variant: 'destructive'
      })
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      return
    }

    try {
      // Verificar se é admin user (secretaria ou ti)
      if (userToDelete.role === 'secretaria' || userToDelete.role === 'ti') {
        // Deletar da tabela admin_users
        const { error } = await supabase
          .from('admin_users')
          .delete()
          .eq('id', userToDelete.id)

        if (error) throw error

        // Remover da lista atual
        setUsers(prev => prev.filter(user => user.id !== userToDelete.id))

        toast({
          title: 'Administrador removido',
          description: `${userToDelete.full_name} foi removido com sucesso.`,
        })
      } else {
        // Verificar se tem user_id (usuário autenticado) ou não (apenas perfil de pesquisador)
        if (userToDelete.user_id) {
          // Usuário autenticado - deletar do banco e auth
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
        } else {
          // Apenas perfil de pesquisador sem autenticação - deletar de user_profiles
          const { error } = await supabase
            .from('user_profiles')
            .delete()
            .eq('id', userToDelete.id)

          if (error) throw error

          // Adicionar à lista de deletados para possível desfazer
          setDeletedUsers(prev => [...prev, userToDelete])
        }

        // Se for pesquisador, deletar também da tabela researchers (usando nome como chave)
        if (userToDelete.role === 'pesquisador' || userToDelete.researcher_route) {
          const { error: researcherError } = await supabase
            .from('researchers')
            .delete()
            .eq('name', userToDelete.full_name)

          if (researcherError) {
            console.error('Erro ao deletar da tabela researchers:', researcherError)
          }
        }

        // Remover da lista atual
        setUsers(prev => prev.filter(user => user.id !== userToDelete.id))

        toast({
          title: 'Usuário removido',
          description: `${userToDelete.full_name} foi removido com sucesso.`,
        })
      }

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
      // Restaurar usando função SQL
      const { data, error } = await supabase
        .rpc('restore_user_profile', {
          _id: deletedUser.id,
          _user_id: deletedUser.user_id,
          _full_name: deletedUser.full_name,
          _email: deletedUser.email,
          _institution: deletedUser.institution,
          _phone: deletedUser.phone,
          _first_name: deletedUser.full_name.split(' ')[0],
          _researcher_route: deletedUser.researcher_route
        })

      if (error) throw error

      const result = data as { success: boolean; error?: string }
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao restaurar usuário')
      }

      // Recarregar lista
      await loadUsers()

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
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/adm/coordenacao/dashboard')} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Button>
          <h1>Administrar Usuários</h1>
        </div>
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
              <th>Cargo</th>
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
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: user.role === 'secretaria' ? '#9C27B0' : 
                                   user.role === 'ti' ? '#2196F3' : 
                                   user.role === 'coordenacao' ? '#FF9800' : 
                                   user.role === 'pesquisador' ? '#673AB7' : '#4CAF50',
                    color: 'white',
                    display: 'inline-block'
                  }}>
                    {user.role === 'secretaria' ? 'Secretária' : 
                     user.role === 'ti' ? 'T.I.' : 
                     user.role === 'coordenacao' ? 'Coordenação' : 
                     user.role === 'pesquisador' ? 'Pesquisador' : 'Usuário'}
                  </span>
                </td>
                <td>
                  <Button
                    onClick={() => openDeleteDialog(user)}
                    variant="destructive"
                    size="sm"
                    className={styles.deleteButton}
                    disabled={adminUser?.role === 'secretaria' && user.role === 'coordenacao'}
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