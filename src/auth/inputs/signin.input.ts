import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, IsString, Matches } from 'class-validator';
import { constant } from 'src/common/constant';

@InputType('SigninInput')
export class SigninInput {
  @Field({ description: 'input for phone number' })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @Field({ description: 'input for password' })
  @IsString()
  @Matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,16}$/,
    {
      message: constant.WEAK_PASSWORD_MESSAGE,
    },
  )
  password: string;
}
