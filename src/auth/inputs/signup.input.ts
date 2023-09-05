import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { constant } from 'src/common/constant';

@InputType('SignupInput')
export class SignupInput {
  @Field({ description: 'input for first name' })
  @IsString()
  @Length(3, 50, { message: constant.INVALID_FIRST_NAME_RANGE_MESSAGE })
  firstName: string;

  @Field({ nullable: true, description: 'input for last name' })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: constant.INVALID_LAST_NAME_RANGE_MESSAGE })
  lastName: string;

  @Field({ nullable: true, description: 'input for user name' })
  @IsOptional()
  @IsString()
  @Length(3, 15, { message: constant.INVALID_USER_NAME_RANGE_MESSAGE })
  username?: string;

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
