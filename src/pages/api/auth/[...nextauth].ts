import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

import { API_BASE_URL, EXPIRED_TIME_LIMIT } from '@/utils';
import { User } from '@/types';

async function refreshAccessToken(token: JWT) {
  try {
    const url = API_BASE_URL + '/auth/refresh-token';

    const response = await axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + EXPIRED_TIME_LIMIT,
    };
  } catch (error) {
    return {
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const url = API_BASE_URL + '/auth/login';
        const response = await axios.post(url, credentials);

        if (response) {
          return response.data;
        } else {
          throw new Error('error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token: JWT, user, account) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: user.access_token,
          accessTokenExpires: Date.now() + EXPIRED_TIME_LIMIT,
          user: user.user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      else {
        return refreshAccessToken(token);
      }
    },
    async session(session, token) {
      if (token) {
        session.user = token.user as User;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
