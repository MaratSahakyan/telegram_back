import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT') || 5432,
    username: configService.get<string>('TYPEORM_USERNAME'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    database: configService.get<string>('TYPEORM_DATABASE'),
    migrations: ['dist/migrations/*.js'],
    entities: ['dist/**/**/*.entity.js'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: false,
    logging: true,
  }),
};

config();

const configService = new ConfigService();

export const typeOrmConfig = new DataSource({
  type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
  host: configService.get<'string'>('TYPEORM_HOST'),
  port: parseInt(configService.get<'number'>('TYPEORM_PORT')) || 5432,
  username: configService.get<'string'>('TYPEORM_USERNAME'),
  password: configService.get<'string'>('TYPEORM_PASSWORD'),
  database: configService.get<'string'>('TYPEORM_DATABASE'),
  entities: ['dist/**/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
});
