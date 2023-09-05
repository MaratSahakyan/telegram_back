import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDTO {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
