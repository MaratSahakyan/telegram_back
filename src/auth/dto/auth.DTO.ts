import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthDTO {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  phone: string;

  @Field()
  role: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
