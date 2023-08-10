import { Field, InputType } from '@nestjs/graphql';

@InputType('DeleteUserInput')
export class DeleteUserInput {
  @Field({ nullable: false })
  id: string;
}
