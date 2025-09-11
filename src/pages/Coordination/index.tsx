import { useState, useEffect } from 'react'
import styles from './Coordination.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { EditButtonCoordination } from './components/EditButtonCoordination'
import { AdminLoginCoordination } from './components/AdminLoginCoordination'
import { EditableCoordinationMember } from './components/EditableCoordinationMember'
import { useToast } from '@/hooks/use-toast'

interface CoordinationMember {
  name: string
  title?: string
  section: 'coordination' | 'scientific' | 'deliberative'
}

export function Coordination() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [members, setMembers] = useState<CoordinationMember[]>([
    // Coordenação
    { name: 'Marcos Alberto Rodrigues Vasconcelos', title: 'Coordenador', section: 'coordination' },
    { name: 'Simone Cerqueira Pereira Cruz', title: 'Coordenadora Adjunta', section: 'coordination' },
    
    // Conselho Científico
    { name: 'Camila Brasil da Silveira', section: 'scientific' },
    { name: 'Edson Starteri Sampaio', section: 'scientific' },
    { name: 'José Maria Landin Dominguez', section: 'scientific' },
    { name: 'Luiz César Gomes Corrêa (rep. dos pesquisadores)', section: 'scientific' },
    { name: 'Marcos Alberto Rodrigues Vasconcelos', section: 'scientific' },
    { name: 'Milton José Porsani', section: 'scientific' },
    { name: 'Simone Cerqueira Pereira Cruz', section: 'scientific' },
    { name: 'Reynam da Cruz Pestana (rep. pesquisadores sêniores)', section: 'scientific' },
    
    // Conselho Deliberativo
    { name: 'Cristóvão de Cássio da Trindade de Brito (presidente)', section: 'deliberative' },
    { name: 'Frederico Vasconcelos Prudente', section: 'deliberative' },
    { name: 'Luiz Rogério Bastos Leal (rep. dos pesquisadores)', section: 'deliberative' },
    { name: 'Marcos Alberto Rodrigues Vasconcelos', section: 'deliberative' },
    { name: 'Simone Cerqueira Pereira Cruz', section: 'deliberative' },
    { name: 'Onofre H. D. J. das Flores (rep. estudantil)', section: 'deliberative' },
    { name: 'Leonardo Moreira Batista (suplente estudantil)', section: 'deliberative' },
  ])
  const [lastAction, setLastAction] = useState<{
    type: 'delete' | 'update'
    data: CoordinationMember
    timestamp: number
  } | null>(null)
  const [showUndo, setShowUndo] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    // Carrega dados do localStorage
    const savedMembers = localStorage.getItem('coordinationMembers')
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers))
    }
  }, [])

  const saveToStorage = (newMembers: CoordinationMember[]) => {
    localStorage.setItem('coordinationMembers', JSON.stringify(newMembers))
  }

  const handleLogin = (email: string, password: string) => {
    // Validação simples (em produção, isso seria feito via API)
    if (email === 'coordenacao@cpgg.ufba.br' || email === 'secretaria@cpgg.ufba.br') {
      setIsEditMode(true)
      setShowLogin(false)
      toast({ title: 'Login realizado', description: 'Modo de edição ativado.' })
    } else {
      toast({ 
        title: 'Acesso negado', 
        description: 'Apenas coordenação e secretaria podem editar.', 
        variant: 'destructive' 
      })
    }
  }

  const handleLogout = () => {
    setIsEditMode(false)
    setLastAction(null)
    setShowUndo(false)
    toast({ title: 'Logout realizado', description: 'Modo de edição desativado.' })
  }

  const showUndoButton = (action: typeof lastAction) => {
    setLastAction(action)
    setShowUndo(true)
    // Auto-hide após 10 segundos
    setTimeout(() => setShowUndo(false), 10000)
  }

  const handleUndo = () => {
    if (!lastAction) return

    if (lastAction.type === 'delete') {
      // Restaura membro excluído
      const newMembers = [...members, lastAction.data]
      setMembers(newMembers)
      saveToStorage(newMembers)
      toast({ title: 'Desfeito', description: 'Membro restaurado com sucesso.' })
    } else if (lastAction.type === 'update') {
      // Restaura nome anterior (implementar se necessário)
      toast({ title: 'Desfazer', description: 'Funcionalidade de desfazer edição em desenvolvimento.' })
    }

    setLastAction(null)
    setShowUndo(false)
  }

  const handleUpdateMember = (oldName: string, newName: string, newTitle?: string) => {
    const newMembers = members.map(member => 
      member.name === oldName 
        ? { ...member, name: newName, title: newTitle || member.title }
        : member
    )
    setMembers(newMembers)
    saveToStorage(newMembers)
    toast({ title: 'Atualizado', description: 'Nome atualizado com sucesso.' })
  }

  const handleDeleteMember = (name: string) => {
    const memberToDelete = members.find(m => m.name === name)
    if (!memberToDelete) return

    const newMembers = members.filter(member => member.name !== name)
    setMembers(newMembers)
    saveToStorage(newMembers)

    // Salva ação para desfazer
    showUndoButton({
      type: 'delete',
      data: memberToDelete,
      timestamp: Date.now()
    })

    toast({ title: 'Excluído', description: 'Membro removido com sucesso.' })
  }

  const getMembersBySection = (section: CoordinationMember['section']) => {
    return members.filter(member => member.section === section)
  }

  return (
    <>
      <Header />
      <div className={styles.heads}>
        <div className={styles.box1}>
          <div className={styles.coordination}>
            <ul>Coordenação</ul>
            <div className={styles.chief}>
              {getMembersBySection('coordination').map((member, index) => (
                <EditableCoordinationMember
                  key={`coordination-${index}`}
                  name={member.name}
                  title={member.title}
                  onUpdate={handleUpdateMember}
                  onDelete={handleDeleteMember}
                  isEditMode={isEditMode}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.box2}>
            <div className={styles.scientific}>
              <h1>Conselho Científico</h1>
              {getMembersBySection('scientific').map((member, index) => (
                <EditableCoordinationMember
                  key={`scientific-${index}`}
                  name={member.name}
                  onUpdate={handleUpdateMember}
                  onDelete={handleDeleteMember}
                  isEditMode={isEditMode}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.box3}>
            <div className={styles.deliberative}>
              <h1>Conselho Deliberativo</h1>
              {getMembersBySection('deliberative').map((member, index) => (
                <EditableCoordinationMember
                  key={`deliberative-${index}`}
                  name={member.name}
                  onUpdate={handleUpdateMember}
                  onDelete={handleDeleteMember}
                  isEditMode={isEditMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditButtonCoordination 
        onClick={() => setShowLogin(true)}
        isEditMode={isEditMode}
        onLogout={handleLogout}
      />

      {/* Botão de Desfazer */}
      {isEditMode && showUndo && lastAction && (
        <div className="fixed bottom-20 right-4 z-50">
          <div className="bg-card text-card-foreground border border-border rounded-lg p-3 shadow-lg flex items-center gap-3">
            <span className="text-sm">
              {lastAction.type === 'delete' ? 'Membro excluído' : 'Nome alterado'}
            </span>
            <button
              onClick={handleUndo}
              className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90 transition-colors"
            >
              Desfazer
            </button>
            <button
              onClick={() => setShowUndo(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <AdminLoginCoordination
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
      
      <Footer />
    </>
  )
}
