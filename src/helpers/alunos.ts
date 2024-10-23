import path from 'node:path';

import { readCSV } from './csv';

export function alunosFromCSV(alunos: string[][]) {
  return alunos.map((aluno) => {
    const [numero, nome, ra, dig, uf, nascimento, situacao] = aluno;

    const [day, month, year] = nascimento.split('/').map(Number);

    return {
      numero: Number(numero),
      nome,
      ra: Number(ra),
      dig,
      uf,
      nascimento: new Date(year, month - 1, day),
      situacao,
    };
  });
}

export async function getAlunos(turma: string) {
  const filePath = path.resolve(__dirname, '..', '..', 'turmas', turma + '.csv');

  const { values: alunosCSV } = await readCSV(filePath, 2);

  return alunosFromCSV(alunosCSV);
}
