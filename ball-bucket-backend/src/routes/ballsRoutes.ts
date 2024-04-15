import express from 'express';
import BallController from '../controllers/ballsController';

const router = express.Router();

router.post('/api/v1/balls', BallController.createBall);
router.get('/api/v1/balls', BallController.getBalls);

export default router;