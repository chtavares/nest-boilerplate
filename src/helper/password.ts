const bcrypt = require('bcryptjs');

export class PasswordService {
  encryptPassword(password: string, length: Number): Promise<string> {
    return bcrypt.hash(password, length);
  }
}
