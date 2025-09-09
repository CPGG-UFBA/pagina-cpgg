import styles from './Researchers.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'

export function Researchers() {
  const normalize = (name: string) =>
    name
      .replace(/\s*\(Chefe\).*/i, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR')
      .trim()

  const sortProgram = (
    items: { name: string; route: string; chief?: boolean }[]
  ) => {
    const chief = items.find((i) => i.chief)
    const rest = items
      .filter((i) => !i.chief)
      .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name), 'pt-BR', { sensitivity: 'base' }))
    return chief ? [chief, ...rest] : rest
  }

  const oil = sortProgram([
    { name: 'Milton José Porsani (Chefe)', route: '/researchers/personal/Porsani', chief: true },
    { name: 'Alexsandro Guerra Cerqueira', route: '/researchers/personal/Alexsandro' },
    { name: 'Amin Bassrei', route: '/researchers/personal/Amin' },
    { name: 'Ana Virgínia Alves de Santana', route: '/researchers/personal/AnaV' },
    { name: 'Joelson da Conceição Batista', route: '/researchers/personal/Joelson' },
    { name: 'Luiz Cesar Correa Gomes', route: '/researchers/personal/LCesar' },
    { name: 'Reynam da Cruz Pestana', route: '/researchers/personal/Reynam' },
    { name: 'Wilson Mouzer Figueiró', route: '/researchers/personal/Wilson' },
  ])

  const environment = sortProgram([
    { name: 'Alanna Costa Dutra (Chefe)', route: '/researchers/personal/Alanna', chief: true },
    { name: 'Alexandre Barreto Costa', route: '/researchers/personal/Alexandre' },
    { name: 'Eduardo Reis Viana Rocha Junior', route: '/researchers/personal/Eduardo' },
    { name: 'Luiz Rogério Bastos Leal', route: '/researchers/personal/LRogerio' },
    { name: 'Maria do Rosário Zucchi', route: '/researchers/personal/MZucchi' },
    { name: 'Susana Silva Cavalcanti', route: '/researchers/personal/Susana' },
    { name: 'Suzan Souza de Vasconcelos', route: '/researchers/personal/Suzan' },
  ])

  const mineral = sortProgram([
    { name: 'Edson Emanuel Starteri Sampaio (Chefe)', route: '/researchers/personal/Edson', chief: true },
    { name: 'Alice Marques Pereira Lau', route: '/researchers/personal/Alice' },
    { name: 'Angela Beatriz de Menezes Leal', route: '/researchers/personal/Angela' },
    { name: 'Carlson de Matos Maia Leite', route: '/researchers/personal/Carlson' },
    { name: 'Aroldo Misi', route: '/researchers/personal/Aroldo' },
    { name: 'Jailma Santos de Souza de Oliveira', route: '/researchers/personal/Jailma' },
    { name: 'Johildo Salomão Figuerêdo Barbosa', route: '/researchers/personal/Johildo' },
    { name: 'José Haroldo da Silva Sá', route: '/researchers/personal/Haroldo' },
    { name: 'Marcos Alberto Rodrigues Vasconcelos', route: '/researchers/personal/Marcos' },
    { name: 'Simone Cerqueira Pereira Cruz', route: '/researchers/personal/Simone' },
  ])

  const oceanography = sortProgram([
    { name: 'Camila Brasil Louro da Silveira (Chefe)', route: '/researchers/personal/Camila', chief: true },
    { name: 'Arthur Antonio Machado', route: '/researchers/personal/Arthur' },
  ])

  const coast = sortProgram([
    { name: 'José Maria Dominguez Landim (Chefe)', route: '/researchers/personal/Landim', chief: true },
    { name: 'Marília de Dirceu Machado de Oliveira', route: '/researchers/personal/Marilia' },
    { name: 'Ricardo Piazza Meireles', route: '/researchers/personal/RicardoM' },
    { name: 'Ruy Kenji Papa de Kikuchi', route: '/researchers/personal/Ruy' },
  ])

  return (
    <>
      <Header />
      <div className={`${styles.researchers} hide-earth`}>
        <div className={styles.Programs}>
          <ul>Programas de Pesquisa e Corpo Científico </ul>
          <div className={styles.box}>
            <div className={styles.Oil}>
              <h1>Exploração de Petróleo</h1>
              {oil.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>
            
            <div className={styles.Environment}> 
              <h1>Recursos Hidricos e Ambientais</h1>
              {environment.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Mineral}>
              <h1> Petrologia, Metalogênese e Exp. Mineral</h1>
              {mineral.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Oceanography}> 
              <h1>Oceanografia Física</h1>
              {oceanography.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Coast}> 
              <h1>Geologia Marinha e Costeira</h1>
              {coast.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
