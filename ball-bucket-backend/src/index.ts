import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import knexConfig from '../knexfile';
import ballRoutes from './routes/ballsRoutes';
import bucketRoutes from './routes/bucketRoutes';
import submitRoutes from './routes/submitRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 9001;

app.use(cors());

// Initialize Knex instance
const knex = Knex(knexConfig);

// Middleware
app.use(bodyParser.json());

app.use(ballRoutes);
app.use(bucketRoutes);
app.use(submitRoutes);
  
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
