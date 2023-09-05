import { compare, hash } from 'bcrypt';
import { constant } from './constant';

const hashData = async (string: string) =>
  hash(string, constant.HASH_SALT_COUNT);

const compareData = async (string: string, hashedString: string) =>
  compare(string, hashedString);

const removeNonDigits = (inputString) => inputString.replace(/\D/g, '');

export { hashData, compareData, removeNonDigits };
