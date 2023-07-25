import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TodoResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
