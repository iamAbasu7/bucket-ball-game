import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'bucket_ball_game',
},
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations', // Path to your migrations directory
  },
};

export default config;
