import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities';
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [AuthResolver],
})
export class AuthModule {}
