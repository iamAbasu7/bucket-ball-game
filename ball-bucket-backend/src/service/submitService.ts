// import knex from 'knex';
// import knexConfig from '../knexfile';

// const db = knex(knexConfig);

// const submitService = {
//   async submitData(ballCounts: Record<string, number>) {
//     for (const ballName in ballCounts) {
//       const count = ballCounts[ballName];
//       await db('balls')
//         .where({ ball_name: ballName })
//         .update({ number_of_balls: knex.raw('COALESCE(number_of_balls, 0) + ?', [count]) });
//     }
//   }
// };

// export default submitService;
