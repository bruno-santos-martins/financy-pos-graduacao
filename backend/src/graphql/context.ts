import { UnauthorizedError } from '../domain/errors/UnauthorizedError.js';
import { AppContainer } from '../container.js';

export type GraphQLContext = {
  container: AppContainer;
  userId: string | null;
};

type CreateContextInput = {
  authorization?: string;
  container: AppContainer;
};

export async function createContext(input: CreateContextInput): Promise<GraphQLContext> {
  const { authorization, container } = input;

  if (!authorization) {
    return { container, userId: null };
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new UnauthorizedError('Token ausente');
  }

  const payload = container.tokenService.verify(token);

  return {
    container,
    userId: payload.sub,
  };
}
