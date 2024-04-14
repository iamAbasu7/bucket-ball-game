interface Bucket {
    bucket_name: string;
    volume: number;
}

interface Ball {
    ball_name: string;
    volume: number;
    ball_count: number;
}

interface BucketWithBalls extends Bucket {
    balls: Ball[];
}