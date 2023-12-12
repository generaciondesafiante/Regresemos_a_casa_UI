import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Swal from "sweetalert2";

// export const runtime = "edge";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password", placeholder: "**** " },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (!user.ok) {
          return Swal.fire({
            icon: "error",
            title: user.message || "Error en autenticación",
            text: "Error en autenticación",
          });
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
