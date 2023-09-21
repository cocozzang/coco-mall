"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "../common/icons"
import { signIn } from "next-auth/react"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = () => {
    setIsLoading(true)

    try {
      signIn("google")
    } catch (error) {
      alert("login error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}
