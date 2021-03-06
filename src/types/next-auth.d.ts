// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
    };
    accessToken: string;
  }
}
