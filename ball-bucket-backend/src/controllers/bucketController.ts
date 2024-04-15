import { Request, Response } from 'express';
import BucketService from '../service/bucketService';

export default class BucketController {
  static async createBucket(req: Request, res: Response) {
    try {
      // Validate request body
      const { bucket_name, volume } = req.body as { bucket_name: string; volume: number };
      if (typeof bucket_name !== 'string' || typeof volume !== 'number') {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      // Delegate to service for database interaction
      await BucketService.createBucket(bucket_name, volume);
      res.status(201).json({ message: 'Bucket data entered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  static async getBucketData(req: Request, res: Response) {
    try {
      const result = await BucketService.getDistributedBalls();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching bucket data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}