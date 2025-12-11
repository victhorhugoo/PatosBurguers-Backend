import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes/main.js';

const server = express();
server.use(cors());
server.use(express.static('public'));
server.use(express.json());  // Metodo de entrada e saída de dados

// Caminho das rotas
server.use(routes);

// Tratando possíveis erros
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu algum erro' });
})

// Porta do servidor
const port = process.env.PORT || 4000;

// Ligando servidor
server.listen(port, () => {
    console.log('Backend PatosBurguers is running on port: ' + port);
});