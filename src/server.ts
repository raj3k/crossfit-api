import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());

export default server;
