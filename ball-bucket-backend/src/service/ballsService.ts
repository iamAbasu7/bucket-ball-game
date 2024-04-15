import Knex from 'knex';
import knexConfig from '../../knexfile';

const knex = Knex(knexConfig);

export default class BallService {
  static async createBall(ball_name: string, volume: number) {
    await knex('balls').insert({ ball_name, volume });
  };
  static async getBalls() {
    return await knex('balls').pluck('ball_name');
  }
}