// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Añadimos ": NextAuthOptions" para que TS valide correctamente el objeto
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Ahora TS reconocerá esto como un valor válido
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    // async createUser({ user }: { user: any }) {
    //   await prisma?.wallet?.create({
    //     data: {
    //       userId: user.id,
    //       balance: 10,
    //     },
    //   })
    // },
  },
};

const handler = NextAuth({
  ...authOptions,
  session: { ...authOptions.session, strategy: "jwt" as const },
});

export { handler as GET, handler as POST };