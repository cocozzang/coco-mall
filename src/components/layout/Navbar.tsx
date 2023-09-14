import Image from "next/image"
import Link from "next/link"
import { Icons } from "../common/Icons"
import SearchBar from "./SearchBar"

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
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
          <Link href={"/user/settings"}>
            <Icons.user className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  )
}
