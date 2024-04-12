import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import knexConfig from '../knexfile';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 9001;

app.use(cors());

// Initialize Knex instance
const knex = Knex(knexConfig);

// Middleware
app.use(bodyParser.json());

app.post('/api/v1/balls', async (req: Request, res: Response) => {
  try {
    const { ball_name, volume } = req.body as { ball_name : string, volume: number };
    if (typeof ball_name !== 'string' || typeof volume !== 'number') {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    // Insert data into database
    await knex('balls').insert({ ball_name, volume });
    res.status(201).json({ message: 'Ball data entered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/buckets', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const { bucket_name, volume } = req.body as { bucket_name: string, volume: number };
      if (typeof bucket_name !== 'string' || typeof volume !== 'number') {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      // Insert data into database
      await knex('buckets').insert({ bucket_name, volume });
      res.status(201).json({ message: 'Bucket data entered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/v1/balls', async (req: Request, res: Response) => {
    try {
      const balls = await knex('balls').pluck('ball_name');
      res.status(201).json({ball_name: balls});
    } catch (error) {
      console.error('Error fetching balls:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.post('/api/v1/submit', async (req, res) => {
    const ballCounts = req.body;
    try {
      // Iterate through the received data and update the database accordingly
      for (const ballName in ballCounts) {
        const count = ballCounts[ballName];
        await knex('balls')
          .where({ ball_name: ballName })
          .update({ number_of_balls: knex.raw('COALESCE(number_of_balls, 0) + ?', [count]) });
      }
      res.status(200).json({ message: 'Balls count updated successfully' });
    } catch (error) {
      console.error('Error updating ball counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/v1/buckets', async (req, res) => {
    try {
      const buckets = await knex('buckets').pluck('bucket_name');
      res.status(200).json({bucket_names:buckets});
    } catch (error) {
      console.error('Error fetching bucket names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
