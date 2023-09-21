"use client"

import { User } from "next-auth"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "next/image"
import { Icons } from "../common/icons"

interface UserAvatarProps {
  user: Pick<User, "name" | "image">
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-10 w-10" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
