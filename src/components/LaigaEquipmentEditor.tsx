import { useState, useEffect } from 'react'
import { Edit2, Plus, Trash2, Save, X } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/hooks/use-toast'
import { AdminLoginLabs } from './AdminLoginLabs'

interface Equipment {
  id: string
  name: string
  description: string | null
  is_available: boolean
}

interface LaigaEquipmentEditorProps {
  onEquipmentChange: (equipments: string[]) => void
}

export function LaigaEquipmentEditor({ onEquipmentChange }: LaigaEquipmentEditorProps) {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newEquipment, setNewEquipment] = useState({ name: '', description: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEquipments()
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      // Autenticar com Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        })
        return
      }

      // Verificar se é coordenação
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', authData.user.id)
        .eq('role', 'coordenacao')
        .single()

      if (error || !data) {
        await supabase.auth.signOut()
        toast({
          title: "Erro de autenticação",
          description: "Você não tem permissão de coordenação.",
          variant: "destructive"
        })
        return
      }

      setIsAuthenticated(true)
      setShowLoginDialog(false)
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso. Agora você pode editar os equipamentos.",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Email ou senha inválidos ou você não tem permissões de coordenação",
        variant: "destructive"
      })
    }
  }

  const handleEditButtonClick = () => {
    if (isAuthenticated) {
      setIsEditMode(true)
    } else {
      setShowLoginDialog(true)
    }
  }

  const fetchEquipments = async () => {
    try {
      const { data, error } = await supabase
        .from('laiga_equipment')
        .select('*')
        .order('name')

      if (error) throw error

      setEquipments(data || [])
      onEquipmentChange((data || []).filter(eq => eq.is_available).map(eq => eq.name))
    } catch (error: any) {
      console.error('Erro ao buscar equipamentos:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar equipamentos",
        variant: "destructive"
      })
    }
  }

  const handleSaveEquipment = async (id: string, name: string, description: string) => {
    try {
      const { error } = await supabase
        .from('laiga_equipment')
        .update({ name, description })
        .eq('id', id)

      if (error) throw error

      await fetchEquipments()
      setEditingId(null)
      toast({
        title: "Sucesso",
        description: "Equipamento atualizado com sucesso"
      })
    } catch (error: any) {
      console.error('Erro ao salvar equipamento:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar equipamento",
        variant: "destructive"
      })
    }
  }

  const handleAddEquipment = async () => {
    if (!newEquipment.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome do equipamento é obrigatório",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('laiga_equipment')
        .insert([{
          name: newEquipment.name.trim(),
          description: newEquipment.description.trim() || null
        }])

      if (error) throw error

      await fetchEquipments()
      setNewEquipment({ name: '', description: '' })
      toast({
        title: "Sucesso",
        description: "Equipamento adicionado com sucesso"
      })
    } catch (error: any) {
      console.error('Erro ao adicionar equipamento:', error)
      toast({
        title: "Erro",
        description: "Erro ao adicionar equipamento",
        variant: "destructive"
      })
    }
  }

  const handleDeleteEquipment = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este equipamento?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('laiga_equipment')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchEquipments()
      toast({
        title: "Sucesso",
        description: "Equipamento removido com sucesso"
      })
    } catch (error: any) {
      console.error('Erro ao remover equipamento:', error)
      toast({
        title: "Erro",
        description: "Erro ao remover equipamento",
        variant: "destructive"
      })
    }
  }

  const toggleAvailability = async (id: string, currentAvailability: boolean) => {
    try {
      const { error } = await supabase
        .from('laiga_equipment')
        .update({ is_available: !currentAvailability })
        .eq('id', id)

      if (error) throw error

      await fetchEquipments()
      toast({
        title: "Sucesso",
        description: `Equipamento ${!currentAvailability ? 'ativado' : 'desativado'} com sucesso`
      })
    } catch (error: any) {
      console.error('Erro ao alterar disponibilidade:', error)
      toast({
        title: "Erro",
        description: "Erro ao alterar disponibilidade",
        variant: "destructive"
      })
    }
  }


  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleEditButtonClick}
        style={{
          position: 'absolute',
          top: '-50px',
          right: '10px',
          background: '#592cbb',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10
        }}
        title="Editar equipamentos"
      >
        <Edit2 size={20} />
      </button>

      <AdminLoginLabs
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />

      {isEditMode && isAuthenticated && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#333' }}>Gerenciar Equipamentos LAIGA</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setIsAuthenticated(false)
                    setIsEditMode(false)
                    toast({
                      title: "Logout realizado",
                      description: "Você saiu do modo de edição"
                    })
                  }}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Sair
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Adicionar novo equipamento */}
            <div style={{ 
              marginBottom: '30px', 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '10px' 
            }}>
              <h3 style={{ marginTop: 0, color: '#333' }}>Adicionar Novo Equipamento</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr', gap: '10px', alignItems: 'end' }}>
                <input
                  type="text"
                  placeholder="Nome do equipamento"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Descrição (opcional)"
                  value={newEquipment.description}
                  onChange={(e) => setNewEquipment(prev => ({ ...prev, description: e.target.value }))}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={handleAddEquipment}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Lista de equipamentos */}
            <div>
              <h3 style={{ color: '#333' }}>Equipamentos Cadastrados</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {equipments.map((equipment) => (
                  <div
                    key={equipment.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 3fr 1fr 1fr 1fr',
                      gap: '10px',
                      alignItems: 'center',
                      padding: '10px',
                      marginBottom: '10px',
                      backgroundColor: equipment.is_available ? '#f8f9fa' : '#ffe6e6',
                      borderRadius: '5px',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    {editingId === equipment.id ? (
                      <EditEquipmentForm
                        equipment={equipment}
                        onSave={handleSaveEquipment}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <>
                        <span style={{ fontWeight: 'bold', color: '#333' }}>{equipment.name}</span>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          {equipment.description || 'Sem descrição'}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          textAlign: 'center',
                          backgroundColor: equipment.is_available ? '#d4edda' : '#f8d7da',
                          color: equipment.is_available ? '#155724' : '#721c24'
                        }}>
                          {equipment.is_available ? 'Ativo' : 'Inativo'}
                        </span>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button
                            onClick={() => setEditingId(equipment.id)}
                            style={{
                              backgroundColor: '#007bff',
                              color: 'white',
                              border: 'none',
                              padding: '5px',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                            title="Editar"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => toggleAvailability(equipment.id, equipment.is_available)}
                            style={{
                              backgroundColor: equipment.is_available ? '#ffc107' : '#28a745',
                              color: 'white',
                              border: 'none',
                              padding: '5px',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                            title={equipment.is_available ? 'Desativar' : 'Ativar'}
                          >
                            {equipment.is_available ? '⏸️' : '▶️'}
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '5px',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditEquipmentForm({ 
  equipment, 
  onSave, 
  onCancel 
}: { 
  equipment: Equipment
  onSave: (id: string, name: string, description: string) => void
  onCancel: () => void 
}) {
  const [name, setName] = useState(equipment.name)
  const [description, setDescription] = useState(equipment.description || '')

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: '5px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          fontSize: '14px'
        }}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: '5px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          fontSize: '14px'
        }}
      />
      <span>-</span>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button
          onClick={() => onSave(equipment.id, name, description)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '5px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          <Save size={14} />
        </button>
        <button
          onClick={onCancel}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '5px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          <X size={14} />
        </button>
      </div>
      <span>-</span>
    </>
  )
}