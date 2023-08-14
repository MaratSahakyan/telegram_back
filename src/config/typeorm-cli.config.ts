import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { extname } from 'path';

const isCompiled = extname(__filename).includes('js');

config();

const configService = new ConfigService();

export default new DataSource({
  type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
  host: configService.get<'string'>('TYPEORM_HOST'),
  port: parseInt(configService.get<'number'>('TYPEORM_PORT')) || 5432,
  username: configService.get<'string'>('TYPEORM_USERNAME'),
  password: configService.get<'string'>('TYPEORM_PASSWORD'),
  database: configService.get<'string'>('TYPEORM_DATABASE'),
  entities: [`dist/**/**/*.entity.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
});
