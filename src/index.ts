import cors from 'cors';
import express from 'express';

import { routes } from './routes';

const port = process.env.PORT || 3030;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Api is running on port ${port}`);
});
