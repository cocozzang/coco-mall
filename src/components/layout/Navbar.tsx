import Link from "next/link"
import { Icons } from "../common/Icons"
import SearchBar from "./searchBar"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "../user/user-account-nav"
import { buttonVariants } from "../ui/button"

interface NavbarProps {}

export default async function Navbar({}: NavbarProps) {
  const session = await getAuthSession()

  console.log(session?.user.role)

  return (
    <div className="bg-zinc-100 border border-b-zinc-200">
      <div className="py-4 px-6 max-w-7xl flex gap-3 mx-auto justify-between items-center">
        <Link href={"/"}>
          <Icons.homeLogo className="w-32" />
        </Link>

        <SearchBar />

        {session?.user ? (
          <div className="flex gap-8">
            {/* TODO: cart에 숫자 표시하기 react-query사용하여 server state랑 연동 */}
            <Link href={"/cart"}>
              <Icons.cart className="w-10 h-10" />
            </Link>
            <UserAccountNav session={session} />
          </div>
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
