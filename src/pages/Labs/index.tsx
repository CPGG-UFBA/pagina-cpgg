import { useState, useEffect } from 'react';
import styles from './Labs.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { EditButton } from '../Researchers/components/EditButton';
import { EditableLaboratory } from '../../components/EditableLaboratory';
import { AdminLoginLabs } from '../../components/AdminLoginLabs';
import { supabase } from '@/integrations/supabase/client';
import earth from '../../assets/earth-labs.png'

interface Laboratory {
  id: string
  name: string
  acronym: string
  chief_name: string
  description?: string
  pnipe_address?: string
  photo1_url?: string
  photo2_url?: string
  photo3_url?: string
}

export  function Labs() {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  useEffect(() => {
    fetchLaboratories()
  }, [])

  const fetchLaboratories = async () => {
    try {
      const { data, error } = await supabase
        .from('laboratories')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setLaboratories(data || [])
    } catch (error) {
      console.error('Erro ao buscar laboratórios:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateLaboratory = (updatedLab: Laboratory) => {
    setLaboratories(prev => 
      prev.map(lab => lab.id === updatedLab.id ? updatedLab : lab)
    )
  }

  const handleDeleteLaboratory = (id: string) => {
    setLaboratories(prev => prev.filter(lab => lab.id !== id))
  }

  const handleLogin = () => {
    setShowAdminLogin(true)
  }

  const handleAdminLogin = (email: string, password: string) => {
    setIsEditing(true)
    setShowAdminLogin(false)
  }

  const handleLogout = () => {
    setIsEditing(false)
  }
  return (
      <>
      <Header/>
          <div className={styles.labs}>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>Laboratórios e Reservas</h1>
                <EditButton 
                  onClick={handleLogin}
                  isEditMode={isEditing}
                  onLogout={handleLogout}
                />
              </div>

              <div className={styles.container}>
                  {/* Laboratórios estáticos */}
                  <a className={styles.card} href="Labs/Laiga">
                      <div className={styles.Laiga}>
                          <h2>LAIGA</h2>
                          <h2>Laboratório Integrado de Geofísica Aplicada</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Labs/Lamod">
                      <div className={styles.Lamod}>
                      <h2>LAMOD</h2>
                      <h2>Laboratório de Modelagem Física</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Labs/Lagep">
                      <div className={styles.Lagep}>
                      <h2>LAGEP</h2>
                      <h2>Laboratório de Geofísica do Petróleo</h2>
                      </div>
                  </a>

                  {/* Laboratórios dinâmicos do banco de dados */}
                  {laboratories.map((lab, index) => (
                    <div key={lab.id} className={`${styles.card} ${styles.dynamicLab}`}>
                      {isEditing ? (
                        <EditableLaboratory
                          laboratory={lab}
                          isEditing={isEditing}
                          onUpdate={handleUpdateLaboratory}
                          onDelete={handleDeleteLaboratory}
                        />
                      ) : (
                        <a href={`Labs/${lab.acronym}`} className={styles.labLink}>
                          <div className={styles.others}>
                            <h2>{lab.acronym}</h2>
                            <h2>{lab.name}</h2>
                          </div>
                        </a>
                      )}
                    </div>
                  ))}

                  <div className={styles.staticFigure}>
                    <img src={earth} alt='Terra' />
                  </div>
              </div>
          </div>

          <AdminLoginLabs
            isOpen={showAdminLogin}
            onClose={() => setShowAdminLogin(false)}
            onLogin={handleAdminLogin}
          />
          <Footer/>
      </>
  )
}