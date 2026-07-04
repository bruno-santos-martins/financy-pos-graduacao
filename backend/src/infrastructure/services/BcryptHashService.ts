import bcrypt from 'bcryptjs';
import { IHashService } from '../../application/ports/services/IHashService.js';

export class BcryptHashService implements IHashService {
  async hash(value: string) {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
