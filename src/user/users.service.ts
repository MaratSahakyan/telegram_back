import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { hashPassword } from 'src/common/helper';
import { Repository } from 'typeorm';
import { UserModel } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
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

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async registerUser(registerUserData): Promise<UserModel> {
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
}
