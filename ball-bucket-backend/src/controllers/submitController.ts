import { Request, Response } from 'express';
import SubmitService from '../service/submitService';

export default class SubmitController {
  static async submitBallCounts(req: Request, res: Response) {
    const ballCounts = req.body;
    try {
      await SubmitService.updateBallCounts(ballCounts);
      res.status(200).json({ message: 'Balls count updated successfully' });
    } catch (error) {
      console.error('Error updating ball counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}