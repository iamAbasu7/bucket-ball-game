import { Request, Response } from 'express';
import BallService from '../service/ballsService';

export default class BallController {
  static async createBall(req: Request, res: Response) {
    try {
      const { ball_name, volume } = req.body as { ball_name: string; volume: number };
      if (typeof ball_name !== 'string' || typeof volume !== 'number') {
        return res.status(400).json({ error: 'Invalid request body' });
      }
      // Delegate to service for database interaction
      await BallService.createBall(ball_name, volume);
      res.status(201).json({ message: 'Ball data entered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  static async getBalls(req: Request, res: Response) {
    try {
      const balls = await BallService.getBalls();
      res.status(200).json({ balls });
    } catch (error) {
      console.error('Error fetching balls:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}