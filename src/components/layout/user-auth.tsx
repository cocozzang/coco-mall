"use client"

import { Session } from "next-auth"
import { Button, buttonVariants } from "../ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserAuthProps {
  session?: Session | null
}

export default function UserAuth({ session }: UserAuthProps) {
  return (
    <>
      {session?.user ? (
        <Button
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }
        >
          로그아웃
        </Button>
      ) : (
        <Link href={"/sign-in"} className={buttonVariants()}>
          로그인
        </Link>
      )}
    </>
  )
}
