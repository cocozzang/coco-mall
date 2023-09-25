"use client"

import { useState } from "react"
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode"
import { Button, buttonVariants } from "./ui/button"
import { SearchIcon } from "lucide-react"
import usePostcode from "@/hooks/use-postcode"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

const testValidator = z.object({
  name: z
    .string()
    .min(3, { message: "이름은 3글자 이상, 50글자 이내여야합니다." }),
  age: z.string().optional(),
})

type testRequest = z.infer<typeof testValidator>

interface PostcodeProps {}

export default function Postcode({}: PostcodeProps) {
  const { address, openPostcode } = usePostcode()

  const {} = useMutation({
    mutationFn: async () => {},
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<testRequest>({
    resolver: zodResolver(testValidator),
  })

  const onSubmit = (data: testRequest) => {
    alert("data" + data.name + ", age" + data.age)
  }

  const btnDisalbe = !(Object.keys(errors).length === 0)

  return (
    <div>
      <div className="">
        <div>
          <Label htmlFor="zipcode">우편번호</Label>
          <div className="flex gap-2">
            <Input
              readOnly
              className="w-[500px] focus-visible:ring-0"
              placeholder="우편번호찾기"
              value={address}
            />

            <Button type="button" onClick={openPostcode}>
              <p>우편번호찾기</p> <SearchIcon size={16} className="ml-1" />
            </Button>
          </div>
        </div>

        <div>
          <div>
            <Label htmlFor="address">상세주소</Label>
            <Input
              className="w-[500px] focus-visible:ring-0"
              placeholder="상세주소"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
