import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

// Minimal auth config for Edge runtime (middleware).
// Must NOT import Prisma or any Node.js-only modules.
export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user.role as string) ?? 'USER';
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id ?? '');
      session.user.role = String(token.role ?? 'USER');
      return session;
    },
  },
};
