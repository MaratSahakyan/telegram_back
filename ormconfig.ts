import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { extname } from 'path';

const isCompiled = extname(__filename).includes('js');

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
    host: configService.get<string>('TYPEORM_HOST'),
    port: configService.get<number>('TYPEORM_PORT') || 5432,
    username: configService.get<string>('TYPEORM_USERNAME'),
    password: configService.get<string>('TYPEORM_PASSWORD'),
    database: configService.get<string>('TYPEORM_DATABASE'),
    autoReconnect: true,
    entities: [`dist/**/**/*.entity.${isCompiled ? 'js' : 'ts'}`],
    synchronize: false,
    migrations: [`src/migrations/**/*.${isCompiled ? 'js' : 'ts'}`],
    cli: {
      migrationsDir: 'src/migrations',
    },
    extra: {
      charset: 'utf8mb4-unicode-ci',
    },
  }),
};
