import { Router } from 'express';

import { getTurmas } from './helpers/turmas';
import { getAlunos } from './helpers/alunos';

export const routes = Router();

routes.get('/turmas', async (req, res) => {
  const turmas = await getTurmas();

  return res.json(turmas);
});

routes.get('/turmas/:slug/alunos', async (req, res) => {
  const { slug } = req.params;
  const { situacao } = req.query;

  try {
    const alunos = await getAlunos(slug);

    if (situacao) {
      const lista = alunos.filter((aluno) => aluno.situacao.toLowerCase() === situacao);

      if (lista.length === 0) return res.status(404).json({ error: 'Nenhum registro encontrado' });

      return res.json(lista);
    }

    return res.json(alunos);
  } catch (err) {
    return res.status(404).json({ error: `Arquivo ${slug}.csv não encontrado` });
  }
});
