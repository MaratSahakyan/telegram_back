import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDTO {
  @Field()
  status: number;

  @Field()
  message: string;
}
