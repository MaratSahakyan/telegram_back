import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('LoginUserInput')
export class LoginUserInput {
  @Field({ nullable: false })
  @IsString()
  phone: string;

  @Field({ nullable: false })
  @IsString()
  password: string;
}
