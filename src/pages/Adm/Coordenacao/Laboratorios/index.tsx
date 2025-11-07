import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import logocpgg from '@/assets/cpgg-logo.jpg'
import styles from './laboratorios.module.css'

interface Laboratory {
  id: string
  name: string
  acronym: string
  chief_name: string
  chief_alternative_email: string | null
}

interface AdminUser {
  id: string
  email: string
  role: string
}

interface EditingLab {
  id: string
  name: string
  acronym: string
  chief_name: string
  chief_alternative_email: string
}

export function LaboratoriosAdmin() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingLab, setEditingLab] = useState<EditingLab | null>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = sessionStorage.getItem('admin_user')
    if (userData) {
      setAdminUser(JSON.parse(userData))
      loadLaboratories()
    } else {
      navigate('/adm/coordenacao')
    }
  }, [navigate])

  const loadLaboratories = async () => {
    try {
      const { data, error } = await supabase
        .from('laboratories')
        .select('id, name, acronym, chief_name, chief_alternative_email')
        .order('acronym', { ascending: true })

      if (error) throw error
      setLaboratories(data || [])
    } catch (error: any) {
      console.error('Erro ao carregar laboratórios:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar laboratórios.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (lab: Laboratory) => {
    setEditingLab({
      id: lab.id,
      name: lab.name,
      acronym: lab.acronym,
      chief_name: lab.chief_name,
      chief_alternative_email: lab.chief_alternative_email || ''
    })
  }

  const handleCancelEdit = () => {
    setEditingLab(null)
  }

  const handleSaveEdit = async () => {
    if (!editingLab) return

    try {
      const { error } = await supabase
        .from('laboratories')
        .update({
          name: editingLab.name,
          acronym: editingLab.acronym,
          chief_name: editingLab.chief_name,
          chief_alternative_email: editingLab.chief_alternative_email || null
        })
        .eq('id', editingLab.id)

      if (error) throw error

      // Atualizar lista local
      setLaboratories(prev =>
        prev.map(lab =>
          lab.id === editingLab.id
            ? {
                ...lab,
                name: editingLab.name,
                acronym: editingLab.acronym,
                chief_name: editingLab.chief_name,
                chief_alternative_email: editingLab.chief_alternative_email || null
              }
            : lab
        )
      )

      setEditingLab(null)
      toast({
        title: 'Sucesso',
        description: 'Laboratório atualizado com sucesso.',
      })
    } catch (error: any) {
      console.error('Erro ao atualizar laboratório:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar laboratório. Tente novamente.',
        variant: 'destructive'
      })
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <p>Carregando laboratórios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logocpgg} alt="CPGG Logo" className={styles.logo} />
        <Button onClick={() => navigate('/adm/coordenacao/dashboard')} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Painel
        </Button>
      </div>
      
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Gerenciar Laboratórios</h1>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.labsTable}>
          <thead>
            <tr>
              <th>Nome do Laboratório</th>
              <th>Sigla</th>
              <th>Nome do Chefe</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {laboratories.map(lab => (
              <tr key={lab.id}>
                {editingLab?.id === lab.id ? (
                  <>
                    <td>
                      <Input
                        value={editingLab.name}
                        onChange={(e) =>
                          setEditingLab({ ...editingLab, name: e.target.value })
                        }
                        className={styles.editInput}
                      />
                    </td>
                    <td>
                      <Input
                        value={editingLab.acronym}
                        onChange={(e) =>
                          setEditingLab({ ...editingLab, acronym: e.target.value })
                        }
                        className={styles.editInput}
                      />
                    </td>
                    <td>
                      <Input
                        value={editingLab.chief_name}
                        onChange={(e) =>
                          setEditingLab({ ...editingLab, chief_name: e.target.value })
                        }
                        className={styles.editInput}
                      />
                    </td>
                    <td>
                      <Input
                        type="email"
                        value={editingLab.chief_alternative_email}
                        onChange={(e) =>
                          setEditingLab({
                            ...editingLab,
                            chief_alternative_email: e.target.value
                          })
                        }
                        className={styles.editInput}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleSaveEdit}
                          size="sm"
                          className={styles.saveButton}
                        >
                          <Save size={16} />
                          Salvar
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                        >
                          <X size={16} />
                          Cancelar
                        </Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{lab.name}</td>
                    <td>{lab.acronym}</td>
                    <td>{lab.chief_name}</td>
                    <td>{lab.chief_alternative_email || '-'}</td>
                    <td>
                      <Button
                        onClick={() => handleEdit(lab)}
                        size="sm"
                        variant="outline"
                      >
                        Editar
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {laboratories.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum laboratório cadastrado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
