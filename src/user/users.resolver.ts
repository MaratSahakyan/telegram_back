import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResponseDTO } from 'src/common/dto';
import { UserDTO } from './dto/user.DTO';
import { DeleteUserInput } from './inputs/delete.user.input';
import { LoginUserInput } from './inputs/login.user.input';
import { RegisterUserInput } from './inputs/register.user.input';
import { UpdateUserInput } from './inputs/update.user.input';
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

  @Mutation(() => UserDTO)
  async userLogin(@Args('input') input: LoginUserInput): Promise<UserDTO> {
    return this.usersService.userLogin(input);
  }

  @Mutation(() => UserDTO)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserDTO> {
    return this.usersService.updateUser(input);
  }

  @Mutation(() => ResponseDTO)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
  ): Promise<ResponseDTO> {
    return this.usersService.deleteUser(input);
  }
}
