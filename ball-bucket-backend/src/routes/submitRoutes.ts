import express from 'express';
import SubmitController from '../controllers/submitController';

const router = express.Router();

router.post('/api/v1/submit', SubmitController.submitBallCounts);

export default router;