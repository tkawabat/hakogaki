import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserWithId extends DefaultSession["user"] {
  id?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      user: UserWithId;
      error?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      accessToken?: string;
      accessTokenExpires?: number;
      refreshToken?: string;
      user: UserWithId;
      error?: string;
    }
  }