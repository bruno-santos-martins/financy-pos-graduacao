import { graphqlClient } from '@/services/graphqlClient';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@/graphql/auth/mutations';
import type { LoginInput, LoginResponse, RegisterInput } from '@/features/auth/types';
import type { LoginMutation, LoginMutationVariables, RegisterMutation, RegisterMutationVariables } from '@/generated/graphql';

export const authService = {
  async login(input: LoginInput): Promise<LoginResponse> {
    const data = await graphqlClient.request<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, input);

    if (!data.login) {
      throw new Error('Login inválido');
    }

    return data.login;
  },

  async register(input: RegisterInput): Promise<RegisterMutation['register']> {
    const data = await graphqlClient.request<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION, input);

    if (!data.register) {
      throw new Error('Erro ao registrar usuário');
    }

    return data.register;
  },
};
