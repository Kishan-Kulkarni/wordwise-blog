import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      image?: string;
    };
  }

  interface User {
    username: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    uname: string;
    image?: string;
  }
}
