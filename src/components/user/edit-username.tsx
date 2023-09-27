"use client"

import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { useForm } from "react-hook-form"
import { UsernamePayload, UsernameValidator } from "@/lib/validators/user"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "../toaster/toast"
import { z } from "zod"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { error } from "console"
interface EditUsernameProps {
  username?: string | null
  className?: string
}

export default function EditUsername({
  username,
  className,
}: EditUsernameProps) {
  const { loginToast } = useCustomToast()

  const { mutate: patchUsername, isLoading } = useMutation({
    mutationFn: async ({ username }: UsernamePayload) => {
      const payload: UsernamePayload = { username }
      const { data } = await axios.patch("/api/user/setting/username/", payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          return loginToast()
        }

        if (err.status === 422) {
          return toast({
            title: "유효하지 않은 유저네임입니다.",
            description: "다른 유저네임을 입력해주세요.",
            variant: "destructive",
            action: <ToastAction altText="닫기">닫기</ToastAction>,
          })
        }

        return toast({
          title: "닉네임 변경에 실패했습니다.",
          description: "잠시 후 다시 시도해주세요",
          variant: "destructive",
          action: <ToastAction altText="닫기">닫기</ToastAction>,
        })
      }
    },
    onSuccess: () => {
      return toast({
        title: "닉네임이 변경되었습니다.",
        action: <ToastAction altText="닫기">닫기</ToastAction>,
      })
    },
  })

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<UsernamePayload>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: username ? { username } : { username: "" },
  })

  const onSubmit = (data: UsernamePayload) => {
    patchUsername(data)
  }

  const btnDisalbe = !(Object.keys(errors).length === 0)

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div>
          <div className="flex gap-2 items-center p-1">
            <Label>닉네임</Label>
            {errors.username?.message && (
              <p className="text-sm text-red-400">
                *{errors.username?.message}
              </p>
            )}
          </div>
          <Input className="w-[500px]" {...register("username")} />
        </div>

        <div>
          <Input
            type="submit"
            value={"닉네임 변경"}
            className={cn(buttonVariants(), "w-auto")}
            disabled={btnDisalbe}
          />
        </div>
      </form>
    </div>
  )
}
