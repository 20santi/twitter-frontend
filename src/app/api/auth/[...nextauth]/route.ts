import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from 'next/headers'
import { graphqlClient } from "../../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../../graphql/query/user";

async function customSignIn(idToken: string) {
  try {
    const googleToken = idToken;
    if (!googleToken) {
      throw new Error("Token is not present");
    } else {
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      if (!verifyGoogleToken) {
        throw new Error("JWT token is not generated");
      }
      cookies().set({
        name: 'OWN_TWITTER_TOKEN',
        value: verifyGoogleToken,
        maxAge: 30*24*60*60,
        httpOnly: false,
        path: '/',
      });
      return verifyGoogleToken;
    }
  } catch (error) {
    console.error("Error in customSignInCallback: ", error);
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.idToken = account.id_token!;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Adding the token to the session object so it's available in the client
      if (token) {
        session.idToken = token.idToken;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };