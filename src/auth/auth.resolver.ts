import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResponseDTO } from 'src/common/dto';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.DTO';
import { TokenDTO } from './dto/token.DTO';
import { SigninInput, SignupInput } from './inputs';
import { RefreshTokensInput } from './inputs/refreshToken.input';

@Resolver(() => AuthDTO)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthDTO)
  async hello() {
    return await this.authService.hello();
  }

  @Mutation(() => AuthDTO)
  signup(@Args('input') input: SignupInput): Promise<AuthDTO> {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthDTO)
  signin(@Args('input') input: SigninInput): Promise<AuthDTO> {
    return this.authService.signin(input);
  }

  @Mutation(() => TokenDTO)
  refreshTokens(@Args('input') input: RefreshTokensInput): Promise<TokenDTO> {
    return this.authService.refreshTokens(input);
  }

  @Mutation(() => ResponseDTO)
  logout(@Args('id') id: string): Promise<ResponseDTO> {
    return this.authService.logout(id);
  }
}
