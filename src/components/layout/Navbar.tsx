import Link from "next/link"
import { Icons } from "../common/Icons"
import SearchBar from "./searchBar"
import { getAuthSession } from "@/lib/auth"
import { Button, buttonVariants } from "../ui/button"
import { signOut } from "next-auth/react"
import UserAuth from "./user-auth"

interface NavbarProps {}

export default async function Navbar({}: NavbarProps) {
  const session = await getAuthSession()

  console.log(session)

  return (
    <div className="bg-zinc-100 border border-b-zinc-200">
      <div className="py-4 px-6 max-w-7xl flex gap-3 mx-auto justify-between items-center">
        <Link href={"/"}>
          <Icons.homeLogo className="w-32" />
        </Link>

        <SearchBar />

        <div className="flex gap-8">
          <Link href={"/cart"}>
            <Icons.cart className="w-8 h-8" />
          </Link>

          <UserAuth session={session} />
        </div>
      </div>
    </div>
  )
}
