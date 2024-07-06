import client from "@/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions, Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client) as Adapter,
  pages: {
    signIn: "/api/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const user = await client.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user) {
          return null;
        }
        const check = await bcrypt.compare(credentials.password, user.password);
        if (!check) {
          return null;
        }
        return { ...user, id: `${user.id}` };
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.uname = user.username;
        if (user.image) {
          token.image = user.image;
        }
      }
      return token;
    },
    session: ({ session, token, user }) => {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.name = token.uname;
        if (token.image) {
          session.user.image = token.image;
        }
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
