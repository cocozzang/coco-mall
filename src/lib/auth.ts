import { NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "./db"
import GoogleProvider from "next-auth/providers/google"
import { nanoid } from "nanoid"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
        session.user.username = token.username
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      if (!dbUser.cartId) {
        // 새로운 카트 생성 및 cartId 업데이트
        const cart = await db.cart.create({
          data: {
            user: {
              connect: {
                id: dbUser.id,
              },
            },
          },
        })

        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            cartId: cart.id,
          },
        })
      }

      if (!dbUser.wishlistId) {
        // 새로운 위시리스트 생성 및 wishlistId 업데이트
        const wishlist = await db.wishlist.create({
          data: {
            user: {
              connect: {
                id: dbUser.id,
              },
            },
          },
        })

        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            wishlistId: wishlist.id,
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        role: dbUser.role,
      }
    },
    redirect() {
      return "/"
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
