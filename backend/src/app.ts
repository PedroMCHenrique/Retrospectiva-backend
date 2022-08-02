import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import Routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (req: Request, res: Response) => {
  res.send('<h1>PONG</h1>');
});

app.use('/', Routes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }
  return res.status(500).json({ error: err.message})
})

export default app;