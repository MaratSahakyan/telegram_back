import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private usersService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.usersService.findByUserID(id);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('phone') phone: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.usersService.registerUser({
      firstName,
      lastName,
      phone,
      password,
    });
  }
}
