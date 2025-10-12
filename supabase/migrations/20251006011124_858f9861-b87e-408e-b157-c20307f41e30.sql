-- Atualizar todos os pesquisadores para terem researcher_route (identificando-os como 'pesquisador')
UPDATE user_profiles 
SET researcher_route = '/researchers/' || lower(first_name)
WHERE full_name IN (
  'Alanna Costa Dutra',
  'Alexandre Barreto Costa',
  'Alexsandro Guerra Cerqueira',
  'Alice Marques Pereira Lau',
  'Amin Bassrei',
  'Ana Virgínia Alves de Santana',
  'Angela Beatriz de Menezes Leal',
  'Aroldo Misi',
  'Arthur Antonio Machado',
  'Camila Brasil Louro da Silveira',
  'Carlson de Matos Maia Leite',
  'Edson Emanuel Starteri Sampaio',
  'Eduardo Reis Viana Rocha Junior',
  'Jailma Santos de Souza de Oliveira',
  'Joelson da Conceição Batista',
  'Johildo Salomão Figuerêdo Barbosa',
  'José Haroldo da Silva Sá',
  'José Maria Dominguez Landim',
  'Luiz Cesar Correa Gomes',
  'Luiz Rogério Bastos Leal',
  'Marcos Alberto Rodrigues Vasconcelos',
  'Maria do Rosário Zucchi',
  'Marília de Dirceu Machado de Oliveira',
  'Milton José Porsani',
  'Reynam da Cruz Pestana',
  'Ricardo Piazza Meireles',
  'Ruy Kenji Papa de Kikuchi',
  'Simone Cerqueira Pereira Cruz',
  'Susana Silva Cavalcanti',
  'Suzan Souza de Vasconcelos',
  'Wilson Mouzer Figueiró'
)
AND (researcher_route IS NULL OR researcher_route = '');

-- Garantir que Marcos Alberto Rodrigues Vasconcelos não está na tabela admin_users
DELETE FROM admin_users 
WHERE email = 'marcos@email.provisorio' 
   OR full_name = 'Marcos Alberto Rodrigues Vasconcelos';

-- Atualizar Admin User na tabela admin_users para ter role 'coordenacao' (se já existir)
UPDATE admin_users 
SET role = 'coordenacao', full_name = 'Admin User'
WHERE email LIKE '%admin%' OR full_name LIKE '%Admin%';