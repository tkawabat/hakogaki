import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserWithId extends DefaultSession["user"] {
  id?: string;
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"];
    accessToken?: string;
    error?: string;
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