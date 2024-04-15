import express from 'express';
import BucketController from '../controllers/bucketController';


const router = express.Router();

router.post('/api/v1/buckets', BucketController.createBucket);
router.get('/api/v1/buckets', BucketController.getBucketData);

export default router;