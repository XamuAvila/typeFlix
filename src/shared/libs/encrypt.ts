import * as bcrypt from 'bcrypt';

export class Encrypt {
  static encryptPassword = async (password: string) => {
    const saltOrRounds = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltOrRounds);
  };

  static validatePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };
}
