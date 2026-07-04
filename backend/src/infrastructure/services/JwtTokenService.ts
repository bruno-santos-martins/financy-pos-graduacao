import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../application/ports/services/ITokenService.js';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError.js';

export class JwtTokenService implements ITokenService {
  constructor(private readonly secret: string) {}

  sign(payload: TokenPayload) {
    return jwt.sign(payload, this.secret, { expiresIn: '1d' });
  }

  verify(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret) as jwt.JwtPayload;

      if (!decoded.sub || !decoded.email) {
        throw new UnauthorizedError('Token inválido');
      }

      return {
        sub: String(decoded.sub),
        email: String(decoded.email),
      };
    } catch {
      throw new UnauthorizedError('Token inválido');
    }
  }
}
