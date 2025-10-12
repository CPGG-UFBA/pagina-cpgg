-- Inserir todos os pesquisadores na tabela user_profiles em ordem alfabética
-- Remove registros duplicados antes de inserir

INSERT INTO user_profiles (full_name, email, phone, institution, first_name) 
SELECT full_name, email, phone, institution, first_name 
FROM (VALUES 
  ('Alanna Costa Dutra', 'alanna@email.provisorio', '(00) 00000-0000', 'UFBA', 'Alanna'),
  ('Alexandre Barreto Costa', 'alexandre@email.provisorio', '(00) 00000-0000', 'UFBA', 'Alexandre'),
  ('Alexsandro Guerra Cerqueira', 'alexsandro@email.provisorio', '(00) 00000-0000', 'UFBA', 'Alexsandro'),
  ('Alice Marques Pereira Lau', 'alice@email.provisorio', '(00) 00000-0000', 'UFBA', 'Alice'),
  ('Amin Bassrei', 'amin@email.provisorio', '(00) 00000-0000', 'UFBA', 'Amin'),
  ('Ana Virgínia Alves de Santana', 'ana@email.provisorio', '(00) 00000-0000', 'UFBA', 'Ana'),
  ('Angela Beatriz de Menezes Leal', 'angela@email.provisorio', '(00) 00000-0000', 'UFBA', 'Angela'),
  ('Aroldo Misi', 'aroldo@email.provisorio', '(00) 00000-0000', 'UFBA', 'Aroldo'),
  ('Arthur Antonio Machado', 'arthur@email.provisorio', '(00) 00000-0000', 'UFBA', 'Arthur'),
  ('Camila Brasil Louro da Silveira', 'camila@email.provisorio', '(00) 00000-0000', 'UFBA', 'Camila'),
  ('Carlson de Matos Maia Leite', 'carlson@email.provisorio', '(00) 00000-0000', 'UFBA', 'Carlson'),
  ('Edson Emanuel Starteri Sampaio', 'edson@email.provisorio', '(00) 00000-0000', 'UFBA', 'Edson'),
  ('Eduardo Reis Viana Rocha Junior', 'eduardo@email.provisorio', '(00) 00000-0000', 'UFBA', 'Eduardo'),
  ('Jailma Santos de Souza de Oliveira', 'jailma@email.provisorio', '(00) 00000-0000', 'UFBA', 'Jailma'),
  ('Joelson da Conceição Batista', 'joelson@email.provisorio', '(00) 00000-0000', 'UFBA', 'Joelson'),
  ('Johildo Salomão Figuerêdo Barbosa', 'johildo@email.provisorio', '(00) 00000-0000', 'UFBA', 'Johildo'),
  ('José Haroldo da Silva Sá', 'jose.haroldo@email.provisorio', '(00) 00000-0000', 'UFBA', 'José'),
  ('José Maria Dominguez Landim', 'jose.maria@email.provisorio', '(00) 00000-0000', 'UFBA', 'José'),
  ('Luiz Cesar Correa Gomes', 'luiz.cesar@email.provisorio', '(00) 00000-0000', 'UFBA', 'Luiz'),
  ('Luiz Rogério Bastos Leal', 'luiz.rogerio@email.provisorio', '(00) 00000-0000', 'UFBA', 'Luiz'),
  ('Marcos Alberto Rodrigues Vasconcelos', 'marcos@email.provisorio', '(00) 00000-0000', 'UFBA', 'Marcos'),
  ('Maria do Rosário Zucchi', 'maria@email.provisorio', '(00) 00000-0000', 'UFBA', 'Maria'),
  ('Marília de Dirceu Machado de Oliveira', 'marilia@email.provisorio', '(00) 00000-0000', 'UFBA', 'Marília'),
  ('Milton José Porsani', 'milton@email.provisorio', '(00) 00000-0000', 'UFBA', 'Milton'),
  ('Reynam da Cruz Pestana', 'reynam@email.provisorio', '(00) 00000-0000', 'UFBA', 'Reynam'),
  ('Ricardo Piazza Meireles', 'ricardo@email.provisorio', '(00) 00000-0000', 'UFBA', 'Ricardo'),
  ('Ruy Kenji Papa de Kikuchi', 'ruy@email.provisorio', '(00) 00000-0000', 'UFBA', 'Ruy'),
  ('Simone Cerqueira Pereira Cruz', 'simone@email.provisorio', '(00) 00000-0000', 'UFBA', 'Simone'),
  ('Susana Silva Cavalcanti', 'susana@email.provisorio', '(00) 00000-0000', 'UFBA', 'Susana'),
  ('Suzan Souza de Vasconcelos', 'suzan@email.provisorio', '(00) 00000-0000', 'UFBA', 'Suzan'),
  ('Wilson Mouzer Figueiró', 'wilson@email.provisorio', '(00) 00000-0000', 'UFBA', 'Wilson')
) AS new_researchers(full_name, email, phone, institution, first_name)
WHERE NOT EXISTS (
  SELECT 1 FROM user_profiles up 
  WHERE lower(up.full_name) = lower(new_researchers.full_name)
);