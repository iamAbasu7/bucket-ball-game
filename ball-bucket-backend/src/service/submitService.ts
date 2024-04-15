import Knex from 'knex';
import knexConfig from '../../knexfile';

const knex = Knex(knexConfig);

export default class SubmitService {
  static async updateBallCounts(ballCounts: { [ballName: string]: number }) {
    // Iterate through the received data and update the database accordingly
    for (const ballName in ballCounts) {
      const count = ballCounts[ballName];
      await knex('balls')
        .where({ ball_name: ballName })
        .update({ number_of_balls: knex.raw('COALESCE(number_of_balls, 0) + ?', [count]) });
    }
  }
}