// Dados dos pesquisadores organizados por programa
export const researcherData = {
  oil: [
    { name: 'Milton José Porsani (Chefe)', route: '/researchers/personal/Porsani', chief: true },
    { name: 'Alexsandro Guerra Cerqueira', route: '/researchers/personal/Alexsandro' },
    { name: 'Amin Bassrei', route: '/researchers/personal/Amin' },
    { name: 'Ana Virgínia Alves de Santana', route: '/researchers/personal/AnaV' },
    { name: 'Joelson da Conceição Batista', route: '/researchers/personal/Joelson' },
    { name: 'Luiz Cesar Correa Gomes', route: '/researchers/personal/LCesar' },
    { name: 'Reynam da Cruz Pestana', route: '/researchers/personal/Reynam' },
    { name: 'Wilson Mouzer Figueiró', route: '/researchers/personal/Wilson' },
  ],

  environment: [
    { name: 'Alanna Costa Dutra (Chefe)', route: '/researchers/personal/Alanna', chief: true },
    { name: 'Alexandre Barreto Costa', route: '/researchers/personal/Alexandre' },
    { name: 'Eduardo Reis Viana Rocha Junior', route: '/researchers/personal/Eduardo' },
    { name: 'Luiz Rogério Bastos Leal', route: '/researchers/personal/LRogerio' },
    { name: 'Maria do Rosário Zucchi', route: '/researchers/personal/MZucchi' },
    { name: 'Susana Silva Cavalcanti', route: '/researchers/personal/Susana' },
    { name: 'Suzan Souza de Vasconcelos', route: '/researchers/personal/Suzan' },
  ],

  mineral: [
    { name: 'Edson Emanuel Starteri Sampaio (Chefe)', route: '/researchers/personal/Edson', chief: true },
    { name: 'Alice Marques Pereira Lau', route: '/researchers/personal/Alice' },
    { name: 'Angela Beatriz de Menezes Leal', route: '/researchers/personal/Angela' },
    { name: 'Carlson de Matos Maia Leite', route: '/researchers/personal/Carlson' },
    { name: 'Aroldo Misi', route: '/researchers/personal/Aroldo' },
    { name: 'Jailma Santos de Souza de Oliveira', route: '/researchers/personal/Jailma' },
    { name: 'Johildo Salomão Figuerêdo Barbosa', route: '/researchers/personal/Johildo' },
    { name: 'José Haroldo da Silva Sá', route: '/researchers/personal/Haroldo' },
    { name: 'Simone Cerqueira Pereira Cruz', route: '/researchers/personal/Simone' },
  ],

  oceanography: [
    { name: 'Camila Brasil Louro da Silveira (Chefe)', route: '/researchers/personal/Camila', chief: true },
    { name: 'Arthur Antonio Machado', route: '/researchers/personal/Arthur' },
  ],

  coast: [
    { name: 'José Maria Dominguez Landim (Chefe)', route: '/researchers/personal/Landim', chief: true },
    { name: 'Marília de Dirceu Machado de Oliveira', route: '/researchers/personal/Marilia' },
    { name: 'Ricardo Piazza Meireles', route: '/researchers/personal/RicardoM' },
    { name: 'Ruy Kenji Papa de Kikuchi', route: '/researchers/personal/Ruy' },
  ],
}

// Função para normalizar nomes
export const normalize = (name: string) =>
  name
    .replace(/\s*\(Chefe\).*/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()

// Função para ordenar programa colocando o chefe primeiro
export const sortProgram = (
  items: { name: string; route: string; chief?: boolean }[]
) => {
  const chief = items.find((i) => i.chief)
  const rest = items
    .filter((i) => !i.chief)
    .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name), 'pt-BR', { sensitivity: 'base' }))
  return chief ? [chief, ...rest] : rest
}

// Função para contar o total de pesquisadores
export const getTotalResearchersCount = () => {
  return Object.values(researcherData).reduce((total, program) => total + program.length, 0)
}

// Função para obter dados ordenados dos pesquisadores
export const getOrderedResearchersData = () => {
  return {
    oil: sortProgram(researcherData.oil),
    environment: sortProgram(researcherData.environment),
    mineral: sortProgram(researcherData.mineral),
    oceanography: sortProgram(researcherData.oceanography),
    coast: sortProgram(researcherData.coast),
  }
}