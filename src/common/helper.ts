import { compare, hash } from 'bcrypt';
import { constant } from './constant';

const hashPassword = async (plainPassword: string) =>
  hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = async (plainPassword: string, hashPassword: string) =>
  compare(plainPassword, hashPassword);

export { hashPassword, comparePassword };
