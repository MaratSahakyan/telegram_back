import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDTO } from './dto/user.DTO';
import { RegisterUserInput } from './inputs/register.user.input';
import { UserService } from './users.service';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(@Inject(UserService) private usersService: UserService) {}

  @Query(() => UserDTO)
  async user(@Args('id') id: string): Promise<UserDTO> {
    return await this.usersService.findByUserID(id);
  }

  @Query(() => [UserDTO])
  async users(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => UserDTO)
  async createUser(@Args('input') input: RegisterUserInput): Promise<UserDTO> {
    return this.usersService.registerUser(input);
  }
}
