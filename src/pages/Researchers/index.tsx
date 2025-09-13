import styles from './Researchers.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { getOrderedResearchersData } from '../../data/researchers'
import { EditButton } from './components/EditButton'
import { AdminLogin } from './components/AdminLogin'
import { EditableResearcher } from './components/EditableResearcher'
import { useToast } from '@/hooks/use-toast'

export function Researchers() {
  const { oil, environment, mineral, oceanography, coast } = getOrderedResearchersData()
  const [dbResearchers, setDbResearchers] = useState<any[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [adminCreds, setAdminCreds] = useState<{ email: string; password: string } | null>(null)
  const [hiddenStaticResearchers, setHiddenStaticResearchers] = useState<string[]>([])
  const [lastAction, setLastAction] = useState<{
    type: 'delete' | 'update' | 'hide'
    data: any
    timestamp: number
  } | null>(null)
  const [showUndo, setShowUndo] = useState(false)

  useEffect(() => {
    fetchDbResearchers()
    // Carrega pesquisadores estáticos ocultos do localStorage
    const hidden = localStorage.getItem('hiddenStaticResearchers')
    if (hidden) {
      setHiddenStaticResearchers(JSON.parse(hidden))
    }
  }, [])

  const fetchDbResearchers = async () => {
    try {
      const { data, error } = await supabase
        .from('researchers')
        .select('*')
        .order('name')

      if (error) throw error

      setDbResearchers(data || [])
    } catch (error) {
      console.error('Erro ao buscar pesquisadores:', error)
    }
  }

  const { toast } = useToast()

  const handleLogin = (email: string, password: string) => {
    setIsEditMode(true)
    setAdminCreds({ email, password })
    setShowLogin(false)
  }

  const handleLogout = () => {
    setIsEditMode(false)
    setAdminCreds(null)
    setLastAction(null)
    setShowUndo(false)
  }

  const showUndoButton = (action: typeof lastAction) => {
    setLastAction(action)
    setShowUndo(true)
  }

  const handleUndo = async () => {
    if (!lastAction || !adminCreds) return

    try {
      if (lastAction.type === 'delete') {
        // Restaura pesquisador excluído
        const { error } = await supabase.functions.invoke('admin-researchers', {
          body: {
            email: adminCreds.email,
            password: adminCreds.password,
            action: 'restore',
            data: lastAction.data,
          },
        })

        if (error) throw error

        await fetchDbResearchers()
        toast({ title: 'Desfeito', description: 'Exclusão desfeita com sucesso.' })
      } else if (lastAction.type === 'update') {
        // Restaura nome anterior
        const { error } = await supabase.functions.invoke('admin-researchers', {
          body: {
            email: adminCreds.email,
            password: adminCreds.password,
            action: 'update',
            id: lastAction.data.id,
            name: lastAction.data.oldName,
          },
        })

        if (error) throw error

        await fetchDbResearchers()
        toast({ title: 'Desfeito', description: 'Edição desfeita com sucesso.' })
      } else if (lastAction.type === 'hide') {
        // Restaura pesquisador estático oculto
        const newHidden = hiddenStaticResearchers.filter(name => name !== lastAction.data.name)
        setHiddenStaticResearchers(newHidden)
        localStorage.setItem('hiddenStaticResearchers', JSON.stringify(newHidden))
        toast({ title: 'Desfeito', description: 'Pesquisador restaurado na lista.' })
      }

      setLastAction(null)
      setShowUndo(false)
    } catch (error: any) {
      toast({ title: 'Erro ao desfazer', description: error.message, variant: 'destructive' })
    }
  }

  const handleDeleteResearcher = async (id: string, isStatic: boolean = false, name: string = '') => {
    if (!adminCreds) {
      toast({ title: 'Acesso negado', description: 'Faça login administrativo.', variant: 'destructive' })
      return
    }

    if (isStatic) {
      // Para pesquisadores estáticos, apenas oculta
      const newHidden = [...hiddenStaticResearchers, name]
      setHiddenStaticResearchers(newHidden)
      localStorage.setItem('hiddenStaticResearchers', JSON.stringify(newHidden))
      
      // Salva ação para desfazer
      showUndoButton({
        type: 'hide',
        data: { name },
        timestamp: Date.now()
      })
      
      toast({ title: 'Excluído', description: 'Pesquisador removido da lista.' })
      return
    }

    // Para pesquisadores do banco - salva dados antes de excluir
    const researcherToDelete = dbResearchers.find(r => r.id === id)
    setDbResearchers((prev) => prev.filter((r: any) => r.id !== id))

    try {
      const { error } = await supabase.functions.invoke('admin-researchers', {
        body: {
          email: adminCreds.email,
          password: adminCreds.password,
          action: 'delete',
          id,
        },
      })

      if (error) throw error

      // Salva ação para desfazer
      showUndoButton({
        type: 'delete',
        data: researcherToDelete,
        timestamp: Date.now()
      })

      toast({ title: 'Excluído', description: 'Pesquisador removido com sucesso.' })
    } catch (error: any) {
      toast({ title: 'Erro ao excluir', description: error.message, variant: 'destructive' })
      await fetchDbResearchers()
    }
  }

  const handleUpdateResearcher = async (id: string, name: string, isStatic: boolean = false, originalName: string = '', programKey: string = '') => {
    if (!adminCreds) {
      toast({ title: 'Acesso negado', description: 'Faça login administrativo.', variant: 'destructive' })
      return
    }

    if (isStatic) {
      // Migra pesquisador estático para o banco
      try {
        const { data, error } = await supabase
          .from('researchers')
          .insert({
            name,
            email: `${name.toLowerCase().replace(/\s+/g, '.')}@ufba.br`,
            program: programKey, // usa o programa correto
            description: `Pesquisador migrado do sistema estático`
          })
          .select()

        if (error) throw error

        // Oculta o estático e adiciona o novo do banco
        const newHidden = [...hiddenStaticResearchers, originalName]
        setHiddenStaticResearchers(newHidden)
        localStorage.setItem('hiddenStaticResearchers', JSON.stringify(newHidden))
        
        await fetchDbResearchers()
        toast({ title: 'Atualizado', description: 'Pesquisador migrado para o banco e nome atualizado.' })
      } catch (error: any) {
        toast({ title: 'Erro ao migrar', description: error.message, variant: 'destructive' })
      }
      return
    }

    // Para pesquisadores do banco - salva nome anterior
    const oldName = dbResearchers.find(r => r.id === id)?.name || ''
    setDbResearchers((prev) => prev.map((r: any) => (r.id === id ? { ...r, name } : r)))

    try {
      const { error } = await supabase.functions.invoke('admin-researchers', {
        body: {
          email: adminCreds.email,
          password: adminCreds.password,
          action: 'update',
          id,
          name,
        },
      })

      if (error) throw error

      // Salva ação para desfazer
      showUndoButton({
        type: 'update',
        data: { id, oldName, newName: name },
        timestamp: Date.now()
      })

      toast({ title: 'Atualizado', description: 'Nome atualizado com sucesso.' })
    } catch (error: any) {
      toast({ title: 'Erro ao atualizar', description: error.message, variant: 'destructive' })
      await fetchDbResearchers()
    }
  }

  // Função para combinar pesquisadores do arquivo estático com os do banco
  const getCombinedResearchers = (programKey: string) => {
    const staticResearchers = {
      oil,
      environment,
      mineral,
      oceanography,
      coast
    }[programKey as keyof typeof staticResearchers] || []

    const dbProgramResearchers = dbResearchers
      .filter(r => r.program === programKey)
      .map(r => ({
        name: r.name,
        route: `/researchers/dynamic/${r.id}`,
        chief: false,
        id: r.id,
        isDatabase: true
      }))

    // Filtra pesquisadores estáticos ocultos e adiciona informações extras
    const visibleStaticResearchers = staticResearchers
      .filter(r => !hiddenStaticResearchers.includes(r.name))
      .map(r => ({
        ...r,
        isDatabase: false,
        originalName: r.name,
        programKey: programKey // adiciona a chave do programa
      }))

    // Combinar e ordenar alfabeticamente (mantendo chefe primeiro se existir)
    const allResearchers = [...visibleStaticResearchers, ...dbProgramResearchers]
    const chief = allResearchers.find(r => r.chief)
    const rest = allResearchers
      .filter(r => !r.chief)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
    
    return chief ? [chief, ...rest] : rest
  }

  return (
    <>
      <Header />
      <div className={`${styles.researchers} hide-earth`}>
        <div className={styles.Programs}>
          <ul>Programas de Pesquisa e Corpo Científico </ul>
          <div className={styles.box}>
            <div className={styles.Oil}>
              <h1>Exploração e Produção de Petróleo</h1>
              {getCombinedResearchers('oil').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={(id, name, isStatic, originalName) => 
                    handleUpdateResearcher(id, name, isStatic, originalName, 'oil')}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>
            
            <div className={styles.Environment}> 
              <h1>Recursos Hidricos e Problemas Ambientais</h1>
              {getCombinedResearchers('environment').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={(id, name, isStatic, originalName) => 
                    handleUpdateResearcher(id, name, isStatic, originalName, 'environment')}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>

            <div className={styles.Mineral}>
              <h1> Petrologia, Metalogênese e Exp. Mineral</h1>
              {getCombinedResearchers('mineral').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={(id, name, isStatic, originalName) => 
                    handleUpdateResearcher(id, name, isStatic, originalName, 'mineral')}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>

            <div className={styles.Oceanography}> 
              <h1>Oceanografia Física</h1>
              {getCombinedResearchers('oceanography').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={(id, name, isStatic, originalName) => 
                    handleUpdateResearcher(id, name, isStatic, originalName, 'oceanography')}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>

            <div className={styles.Coast}> 
              <h1>Geologia Marinha e Costeira</h1>
              {getCombinedResearchers('coast').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={(id, name, isStatic, originalName) => 
                    handleUpdateResearcher(id, name, isStatic, originalName, 'coast')}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>
          </div>
        </div>
        
        <EditButton 
          onClick={() => setShowLogin(true)}
          isEditMode={isEditMode}
          onLogout={handleLogout}
        />
        
        {/* Botão de Desfazer */}
        {isEditMode && showUndo && lastAction && (
          <div className="fixed bottom-20 right-4 z-50">
            <div className="bg-card text-card-foreground border border-border rounded-lg p-3 shadow-lg flex items-center gap-3">
              <span className="text-sm">
                {lastAction.type === 'delete' ? 'Pesquisador excluído' : 
                 lastAction.type === 'update' ? 'Nome alterado' : 
                 'Pesquisador ocultado'}
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
        
        <AdminLogin
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      </div>
      <Footer />
    </>
  )
}
