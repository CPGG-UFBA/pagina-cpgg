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

export function Researchers() {
  const { oil, environment, mineral, oceanography, coast } = getOrderedResearchersData()
  const [dbResearchers, setDbResearchers] = useState<any[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    fetchDbResearchers()
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

  const handleLogin = () => {
    setIsEditMode(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setIsEditMode(false)
  }

  const handleDeleteResearcher = async (id: string) => {
    try {
      const { error } = await supabase
        .from('researchers')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchDbResearchers()
    } catch (error) {
      console.error('Erro ao excluir pesquisador:', error)
    }
  }

  const handleUpdateResearcher = async (id: string, name: string) => {
    try {
      const { error } = await supabase
        .from('researchers')
        .update({ name })
        .eq('id', id)

      if (error) throw error

      fetchDbResearchers()
    } catch (error) {
      console.error('Erro ao atualizar pesquisador:', error)
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
        route: `/researchers/dynamic/${r.id}`, // Rota dinâmica
        chief: false
      }))

    // Combinar e ordenar alfabeticamente (mantendo chefe primeiro se existir)
    const allResearchers = [...staticResearchers, ...dbProgramResearchers]
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
              <h1>Exploração de Petróleo</h1>
              {getCombinedResearchers('oil').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={handleUpdateResearcher}
                  onDelete={handleDeleteResearcher}
                  dbResearchers={dbResearchers}
                />
              ))}
            </div>
            
            <div className={styles.Environment}> 
              <h1>Recursos Hidricos e Ambientais</h1>
              {getCombinedResearchers('environment').map((r, index) => (
                <EditableResearcher 
                  key={r.route || index}
                  researcher={r}
                  isEditMode={isEditMode}
                  onUpdate={handleUpdateResearcher}
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
                  onUpdate={handleUpdateResearcher}
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
                  onUpdate={handleUpdateResearcher}
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
                  onUpdate={handleUpdateResearcher}
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
