import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('RefreshTokensInput')
export class RefreshTokensInput {
  @Field({ description: 'input for ID' })
  @IsString()
  id: string;

  @Field({ description: 'input for refresh token' })
  @IsString()
  refreshToken: string;
}
