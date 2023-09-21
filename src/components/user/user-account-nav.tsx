"use client"

import { Button, buttonVariants } from "../ui/button"
import { signOut } from "next-auth/react"
import UserAvatar from "./user-avatar"
import { Session } from "next-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"
import { Icons } from "../common/icons"

interface UserAccountNavProps {
  session?: Session | null
}

export default function UserAccountNav({ session }: UserAccountNavProps) {
  return (
    <>
      {/* TODO: user account nav dropdown 으로 만들기 */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: session?.user.name, image: session?.user.image }}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <div className="flex gap-2">
                {session?.user.name && (
                  <p className="font-medium">{session?.user.name}</p>
                )}
                {session?.user.username && (
                  <p className="text-xs text-zinc-400">
                    {session?.user.username}
                  </p>
                )}
              </div>

              {session?.user.email && (
                <p className="w-[200px] truncate text-sm text-zinc-700">
                  {session?.user.email}
                </p>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {session?.user.role === 2 && (
              <>
                <DropdownMenuItem>
                  <Link href={"/seller"}>상품/판매 관리</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem>
              <Link href={"/order"}>주문목록</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={"/cancel-return-refund"}>취소/반품</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={"/wishlist"}>찜 리스트</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={"/settings"}>계정설정</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
                })
              }}
              className="cursor-pointer"
            >
              <div className="flex gap-2">
                <p>로그아웃</p>
                <Icons.logOut className="w-5 h-5" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
