import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { ResponseDTO } from 'src/common/dto';
import { compareData, hashData, removeNonDigits } from 'src/common/helper';
import { Repository } from 'typeorm';
import { AuthDTO, TokenDTO } from './dto';
import { AuthEntity } from './entities';
import { RefreshTokensInput, SigninInput, SignupInput } from './inputs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async hello() {
    return { message: 'hello' };
  }

  async signup(input: SignupInput): Promise<AuthDTO> {
    const phoneNumber = removeNonDigits(input.phone);

    const findOneData = await this.authRepository.findOne({
      where: { phone: phoneNumber },
      select: ['phone'],
    });

    if (findOneData && findOneData.phone) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }

    const hashedPassword = await hashData(input.password);

    const newUser = await this.authRepository.save({
      ...input,
      phone: phoneNumber,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(this.tokenPropertiesGenerator(newUser));
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return { ...newUser, ...tokens };
  }

  async signin(input: SigninInput): Promise<AuthDTO> {
    const phoneNumber = removeNonDigits(input.phone);
    const user = await this.authRepository.findOneBy({
      phone: phoneNumber,
    });

    if (!user) {
      throw new NotFoundException(constant.PHONE_DOES_NOT_EXIST);
    }

    const passwordMatches = await compareData(input.password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException(constant.PROVIDED_WRONG_PASSWORD);
    }

    const tokens = await this.getTokens(this.tokenPropertiesGenerator(user));
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { ...user, ...tokens };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokens(input: RefreshTokensInput): Promise<TokenDTO> {
    const { id, refreshToken } = input;
    const user = await this.authRepository.findOneBy({ id });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(constant.USER_ACCESS_DENIED);
    }
    const areTokensEqual = compareData(refreshToken, user.refreshToken);

    if (!areTokensEqual) {
      throw new ForbiddenException(constant.USER_ACCESS_DENIED);
    }

    const tokens = await this.getTokens(this.tokenPropertiesGenerator(user));
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  @UseGuards(AuthGuard('jwt'))
  async logout(id): Promise<ResponseDTO> {
    await this.authRepository.update(id, {
      refreshToken: null,
    });

    return {
      status: HttpStatus.OK,
      message: constant.LOGOUT,
    };
  }

  async getTokens(tokenProperties): Promise<TokenDTO> {
    const promises = [
      this.jwtService.signAsync(tokenProperties, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      }),
      this.jwtService.signAsync(tokenProperties, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      }),
    ];

    const [accessToken, refreshToken] = await Promise.all(promises);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.authRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  tokenPropertiesGenerator(user) {
    return {
      sub: user.id,
      name: user.firstName,
      role: user.role,
    };
  }
}
