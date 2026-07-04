import { ITokenService, TokenPayload } from '../../../application/ports/services/ITokenService.js';

export class FakeTokenService implements ITokenService {
  sign(payload: TokenPayload) {
    return `token:${payload.sub}:${payload.email}`;
  }

  verify(token: string) {
    const parts = token.split(':');

    if (parts.length !== 3 || parts[0] !== 'token') {
      throw new Error('Invalid token');
    }

    return {
      sub: parts[1],
      email: parts[2],
    };
  }
}
