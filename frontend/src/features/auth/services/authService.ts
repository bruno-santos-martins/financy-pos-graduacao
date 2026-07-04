import { graphqlClient } from '@/services/graphqlClient';
import { LOGIN_MUTATION } from '@/graphql/auth/mutations';
import type { LoginInput, LoginResponse } from '@/features/auth/types';
import type { LoginMutation, LoginMutationVariables } from '@/generated/graphql';

export const authService = {
  async login(input: LoginInput): Promise<LoginResponse> {
    const data = await graphqlClient.request<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, input);

    if (!data.login) {
      throw new Error('Login inválido');
    }

    return data.login;
  },
};
