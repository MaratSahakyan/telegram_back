import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { constant } from 'src/common/constant';

@InputType('RegisterUserInput')
export class RegisterUserInput {
  @Field({ nullable: false, description: 'user input value for first name' })
  @IsString()
  @Length(3, 50, { message: constant.INVALID_FIRST_NAME_RANGE_MESSAGE })
  firstName: string;

  @Field({ nullable: true, description: 'user input value for last name' })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: constant.INVALID_LAST_NAME_RANGE_MESSAGE })
  lastName: string;

  @Field({ nullable: false, description: 'user input value for phone number' })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @Field({ nullable: false, description: 'user input value for password' })
  @IsString()
  @Matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,16}$/,
    {
      message: constant.WEAK_PASSWORD_MESSAGE,
    },
  )
  password: string;
}
