import path from 'node:path';

import { readCSV } from './csv';

export function turmasFromCSV(turmas: string[][]) {
  return turmas.map((turma) => {
    const [id, nome, apelido, slug, ...disciplinas] = turma;

    return {
      id: Number(id),
      nome,
      apelido,
      disciplinas: disciplinas.map((disciplina) => disciplina?.toLocaleUpperCase() || ''),
      slug,
    };
  });
}

export async function getTurmas() {
  const filePath = path.resolve(__dirname, '..', '..', 'arquivos', 'turmas.csv');

  const { values: turmasCSV } = await readCSV(filePath);

  return turmasFromCSV(turmasCSV);
}
