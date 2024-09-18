import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials) {
        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error error
      session = token.user as unknown;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    newUser: "/admin",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, nextAuthOptions, handler as POST };
