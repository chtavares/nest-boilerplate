import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class PasswordService {
  async generateJWTToken(id: string, roleId: string): Promise<string> {
    return jwt.sign({ id, roleId }, process.env.SECRET_KEY);
  }
  encryptPassword(password: string, length: Number): Promise<string> {
    return bcrypt.hash(password, length);
  }
  async validatePassword(
    password: string,
    encryptPassword: string,
  ): Promise<Boolean> {
    return bcrypt.compare(password, encryptPassword);
  }
}
