import NextAuth, { AuthOptions  } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions  = {
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