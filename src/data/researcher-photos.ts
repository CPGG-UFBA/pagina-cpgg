// Mapeamento de fotos dos pesquisadores por nome
export const researcherPhotos: Record<string, string> = {
  // Programa Oil
  'Milton José Porsani': 'https://i.imgur.com/fS64E9O.png',
  'Alexsandro Guerra Cerqueira': 'https://i.imgur.com/s4PTXCJ.png',
  'Amin Bassrei': 'https://i.imgur.com/nhshrAU.png',
  'Ana Virgínia Alves de Santana': 'https://i.imgur.com/orkaX51.png',
  'Joelson da Conceição Batista': 'https://i.imgur.com/YAKT7F1.png',
  'Luiz Cesar Correa Gomes': 'https://i.imgur.com/CLdcY1m.png',
  'Reynam da Cruz Pestana': 'https://i.imgur.com/LYfyOXp.png',
  'Wilson Mouzer Figueiró': 'https://i.imgur.com/LLrO2My.png',

  // Programa Environment
  'Alanna Costa Dutra': 'https://i.imgur.com/LVDLXaR.png',
  'Alexandre Barreto Costa': 'https://i.imgur.com/DEkDiTY.png',
  'Eduardo Reis Viana Rocha Junior': 'https://i.imgur.com/cseQdEz.png',
  'Luiz Rogério Bastos Leal': 'https://i.imgur.com/BxKprWx.png',
  'Maria do Rosário Zucchi': 'https://i.imgur.com/QCRbLFw.png',
  'Susana Silva Cavalcanti': 'https://i.imgur.com/rmLYgS5.png',
  'Suzan Souza de Vasconcelos': 'https://i.imgur.com/oJT2Gxh.png',

  // Programa Mineral
  'Edson Emanuel Starteri Sampaio': 'https://i.imgur.com/YQM1hAL.jpg',
  'Alice Marques Pereira Lau': 'https://i.imgur.com/nnNDbMR.png',
  'Angela Beatriz de Menezes Leal': 'https://i.imgur.com/vQ4t3iQ.png',
  'Carlson de Matos Maia Leite': 'https://i.imgur.com/WEEbEz3.png',
  'Aroldo Misi': 'https://i.imgur.com/YQM1hAL.jpg',
  'Jailma Santos de Souza de Oliveira': 'https://i.imgur.com/YQM1hAL.jpg',
  'Johildo Salomão Figuerêdo Barbosa': 'https://i.imgur.com/48srgtB.png',
  'José Haroldo da Silva Sá': 'https://i.imgur.com/YQM1hAL.jpg',
  'Marcos Alberto Rodrigues Vasconcelos': 'https://i.imgur.com/ba3ItpJ.jpg',
  'Simone Cerqueira Pereira Cruz': 'https://i.imgur.com/MZCgEkm.png',

  // Programa Oceanography
  'Camila Brasil Louro da Silveira': 'https://i.imgur.com/JFFpY1J.png',
  'Arthur Antonio Machado': 'https://i.imgur.com/eF493yp.png',

  // Programa Coast
  'José Maria Dominguez Landim': 'https://i.imgur.com/uvpyYg7.png',
  'Marília de Dirceu Machado de Oliveira': 'https://i.imgur.com/uvpyYg7.png',
  'Ricardo Piazza Meireles': 'https://i.imgur.com/uvpyYg7.png',
  'Ruy Kenji Papa de Kikuchi': 'https://i.imgur.com/8tBcXOz.png',
}

// Função para obter a foto de um pesquisador pelo nome
export const getResearcherPhoto = (name: string): string | undefined => {
  return researcherPhotos[name]
}
