"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface RegistrationButtonClientProps {}

export default function RegistrationButtonClient({}: RegistrationButtonClientProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push("/seller/registration")}
      className={cn(buttonVariants(), "cursor-pointer")}
    >
      새 상품 등록하기
    </div>
  )
}
