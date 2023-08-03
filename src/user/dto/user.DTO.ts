import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}
