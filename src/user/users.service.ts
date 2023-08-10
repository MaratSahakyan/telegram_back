import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { ResponseDTO } from 'src/common/dto';
import { comparePassword, hashPassword } from 'src/common/helper';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteUserInput } from './inputs/delete.user.input';
import { LoginUserInput } from './inputs/login.user.input';
import { UpdateUserInput } from './inputs/update.user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUserID(userID: string) {
    const findUser = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!findUser) {
      throw new NotFoundException(constant.USER_DOES_NOT_EXIST);
    }
    return findUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async registerUser(registerUserData): Promise<UserEntity> {
    const { firstName, lastName, phone, password } = registerUserData;
    const phoneNumber = phone.replace(/[^0-9]/g, '');
    const findOneData = await this.userRepository.findOne({
      where: { phone: phoneNumber },
      select: ['phone'],
    });

    if (findOneData && findOneData.phone) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }

    const hashPasswordValue = await hashPassword(password);

    return this.userRepository.save({
      firstName,
      lastName,
      phone: phoneNumber,
      password: hashPasswordValue,
    });
  }

  async userLogin(loginUserData: LoginUserInput): Promise<UserEntity> {
    const { phone, password } = loginUserData;
    const phoneNumber = phone.replace(/[^0-9]/g, '');

    const findUserData = await this.userRepository.findOne({
      where: { phone: phoneNumber },
    });

    if (!findUserData) {
      throw new NotFoundException(constant.PHONE_DOES_NOT_EXIST);
    }

    const isValidPassword = await comparePassword(
      password,
      findUserData.password,
    );

    if (!isValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }

    delete findUserData.password;

    return findUserData;
  }

  async updateUser(updateUserData: UpdateUserInput): Promise<UserEntity> {
    const { id, ...rest } = updateUserData;
    const findOneData = this.userRepository.findOne({
      where: { id },
    });

    if (!findOneData) {
      throw new BadRequestException(constant.USER_DOES_NOT_EXIST);
    }

    if (rest.password) {
      rest.password = await hashPassword(rest.password);
    }

    if (rest.phone) {
      rest.phone = rest.phone.replace(/[^0-9]/g, '');
    }

    return this.userRepository
      .createQueryBuilder('user')
      .update(UserEntity)
      .set(rest)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((response) => {
        if (response?.raw[0]) {
          return response.raw[0];
        }
        throw response;
      })
      .catch((error) => {
        throw new NotFoundException({
          error,
        });
      });
  }

  async deleteUser(deleteUserInput: DeleteUserInput): Promise<ResponseDTO> {
    const { id } = deleteUserInput;
    console.log('first');
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id: id })
      .execute()
      .then(() => {
        return {
          status: HttpStatus.OK,
          message: constant.USER_DELETED,
        };
      })
      .catch(() => {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: constant.USER_DELETED_FAIL,
        };
      });
  }
}
