import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { hashPassword } from 'src/common/helper';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/registerUserDTO';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUserID(userID: string) {
    const findUser = await this.userRepository.findOne({
      where: { id: userID },
      select: ['id'],
    });
    if (!findUser) {
      throw new NotFoundException(constant.USER_DOES_NOT_EXIST);
    }
    return findUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registerUser(registerUserData: RegisterUserDTO) {
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

    const dataObject: RegisterUserDTO = {
      firstName,
      lastName,
      phone: phoneNumber,
      password: hashPasswordValue,
    };

    const createUserQuery = this.userRepository.create(dataObject);
    const saveUserData: User = await this.userRepository.save(createUserQuery);
    return saveUserData;
  }
}
