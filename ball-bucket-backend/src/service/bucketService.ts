import Knex from 'knex';
import knexConfig from '../../knexfile';

const knex = Knex(knexConfig);

export default class BucketService {
  static async createBucket(bucket_name: string, volume: number) {
    await knex('buckets').insert({ bucket_name, volume });
  }
  static async getDistributedBalls() {
    const bucketsData = await knex('buckets').select('bucket_name', 'volume');
    const ballsData = await knex('balls').select('ball_name', 'volume', 'number_of_balls');

    const buckets = bucketsData.map(row => ({
      bucket_name: row.bucket_name,
      volume: row.volume
    }));

    const balls = ballsData.map(row => ({
      ball_name: row.ball_name,
      volume: row.volume,
      ball_count: row.number_of_balls
    }));

    function distributeBalls(buckets: Bucket[], balls: Ball[]): string[] {
        const output: string[] = [];
  
        // Sort buckets by volume in descending order
        buckets.sort((a, b) => b.volume - a.volume);
    
        // Sort balls by volume in descending order
        balls.sort((a, b) => b.volume - a.volume);
    
        // Initialize counts for each ball type in each bucket
        const ballCounts: { [bucketName: string]: { [ballName: string]: number } } = {};
        for (const bucket of buckets) {
            ballCounts[bucket.bucket_name] = {};
            for (const ball of balls) {
                ballCounts[bucket.bucket_name][ball.ball_name] = 0;
            }
        }
    
        // Distribute balls into buckets
        for (const ball of balls) {
            for (const bucket of buckets) {
                const availableVolume = bucket.volume - totalVolumeInBucket(ballCounts[bucket.bucket_name], balls);
                if (availableVolume >= ball.volume) {
                    const ballsToAdd = Math.min(Math.floor(availableVolume / ball.volume), ball.ball_count);
                    ballCounts[bucket.bucket_name][ball.ball_name] += ballsToAdd;
                    ball.ball_count -= ballsToAdd;
                }
            }
        }
    
        // Format the output
        for (const bucket of buckets) {
            let bucketOutput = `Bucket ${bucket.bucket_name}:`;
            for (const ball of balls) {
                const ballNameCapitalized = ball.ball_name.charAt(0).toUpperCase() + ball.ball_name.slice(1);
                bucketOutput += ` ${ballCounts[bucket.bucket_name][ball.ball_name]} ${ballNameCapitalized} ball`;
            }
            output.push(bucketOutput);
        }
    
        return output;
    }
    function totalVolumeInBucket(bucket: { [ballName: string]: number }, balls: Ball[]): number {
        let totalVolume = 0;
        for (const ball of balls) {
            totalVolume += bucket[ball.ball_name] * ball.volume;
        }
        return totalVolume;
    }

    return distributeBalls(buckets, balls);
  }
}