import { ConfigModule, ConfigService } from '@nestjs/config';
import { extname } from 'path';

const isCompiled = extname(__filename).includes('js');

export const ORMConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: configService.get<'postgres'>('DATABASE_TYPE'),
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT') || 5432,
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    autoReconnect: true,
    entities: [`src/**/*.entity.${isCompiled ? 'js' : 'ts'}`],
    migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
    synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    cli: {
      migrationsDir: 'src/migration',
    },
  }),
};
