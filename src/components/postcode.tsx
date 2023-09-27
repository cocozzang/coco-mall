"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { SearchIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

import usePostcode from "@/hooks/use-postcode"

import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"

import { PostCodePayload, PostCodeValidator } from "@/lib/validators/postcode"
import { cn } from "@/lib/utils"

interface PostcodeProps {
  zipcode?: string | null
  address?: string | null
}

export default function Postcode({ address, zipcode }: PostcodeProps) {
  const { addresscode, openPostcode } = usePostcode()
  const [addresscodeValue, setAddresscodeValue] = useState<string>("")

  const { mutate: postAddress, isLoading } = useMutation({
    mutationFn: async ({ addresscode, detailAddress }: PostCodePayload) => {
      const payload: PostCodePayload = { addresscode, detailAddress }
      const { data } = await axios.post("/api/user/address", payload)
      return data
    },
    onError: (err) => {
      console.error(err)
    },
    onSuccess: () => {
      alert("배송지 수정 성공")
    },
  })

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<PostCodePayload>({
    resolver: zodResolver(PostCodeValidator),
    defaultValues: {
      addresscode: zipcode ?? "",
      detailAddress: address ?? "",
    },
  })

  const onSubmit = (data: PostCodePayload) => {
    postAddress(data)
    console.log("submit data : ", data)
  }

  const btnDisalbe = !(Object.keys(errors).length === 0)

  useEffect(() => {
    if (zipcode) {
      setAddresscodeValue(zipcode)
    }
  }, [zipcode])

  useEffect(() => {
    if (addresscode) {
      setValue("addresscode", addresscode)
      setAddresscodeValue(getValues("addresscode"))
      trigger("addresscode")
    }
  }, [addresscode, setValue, getValues, trigger])

  // test
  console.log()

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div>
          <div>
            {errors.addresscode?.message && (
              <p className="text-sm text-red-400">
                *{errors.addresscode?.message}
              </p>
            )}

            <div className="flex gap-2">
              <Input
                readOnly
                placeholder="우편번호찾기"
                className="w-[500px] focus-visible:ring-0"
                value={addresscodeValue}
                {...register("addresscode")}
              />

              <Button type="button" onClick={openPostcode}>
                <p>우편번호찾기</p> <SearchIcon size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div>
            {errors.detailAddress?.message && (
              <p className="text-sm text-red-400">
                *{errors.detailAddress?.message}
              </p>
            )}
            <Input
              className="w-[500px] focus-visible:ring-0"
              placeholder="상세주소"
              {...register("detailAddress")}
            />
          </div>
        </div>

        <Input
          type="submit"
          value={"배송지 변경"}
          className={cn(buttonVariants(), "w-[200px]")}
          onClick={handleSubmit(onSubmit)}
          disabled={btnDisalbe || isLoading}
        />
      </form>
    </div>
  )
}
