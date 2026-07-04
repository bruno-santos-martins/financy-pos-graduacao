import { IHashService } from '../../../application/ports/services/IHashService.js';

export class FakeHashService implements IHashService {
  async hash(value: string) {
    return `hashed:${value}`;
  }

  async compare(value: string, hash: string) {
    return hash === `hashed:${value}`;
  }
}
