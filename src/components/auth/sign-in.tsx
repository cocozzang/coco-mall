import Link from "next/link"
import { Icons } from "../common/Icons"
import UserAuthForm from "./user-auth-form"

interface SignInProps {}

export default function SignIn({}: SignInProps) {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.homeLogo className="mx-auto h-7 w-7" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">로그인하셈</p>

        {/* sign in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <span className="mr-2">꼬레딧이 처음인가용?</span>
          <Link
            href={"/sign-up"}
            className="hover:text-black text-sm underline underline-offset-2"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
