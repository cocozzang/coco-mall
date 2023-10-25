"use client"

import React, { useEffect, useState } from "react"
import { Session } from "next-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

import { GOODS_IMAGE_URL, GOODS_THUMBNAIL_URL, cn, supabase } from "@/lib/utils"
import { GoodsPayload, GoodsValidator } from "@/lib/validators/goods"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RegistrationFormProps {
  session?: Session | null
}

export default function RegistrationForm({ session }: RegistrationFormProps) {
  const [isOption, setIsOption] = useState<boolean>(false)

  const { mutate: registeGoods, isLoading } = useMutation({
    mutationFn: async ({
      name,
      price,
      deliveryFee,
      category,
      thumbnail,
      image,
      content,
      inventory,
      option,
    }: GoodsPayload) => {
      const payload: GoodsPayload = {
        name,
        price,
        deliveryFee,
        category,
        thumbnail,
        image,
        content,
        inventory,
        option,
      }
      const { data } = await axios.post("/api/goods", payload)
      return data
    },
    onError: (err) => {
      console.error(err)
    },
    onSuccess: () => {
      alert("상품 등록 성공")
    },
  })

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<GoodsPayload>({
    resolver: zodResolver(GoodsValidator),
    defaultValues: {},
  })

  const onSubmit = (data: GoodsPayload) => {
    registeGoods(data)
    console.log("submit data : ", data)
  }

  const btnDisalbe = !(Object.keys(errors).length === 0)

  const uploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError 한번 실행되면 안 없어져서, 아래함수로 기존의 setError context를 초기화 시켜줍니당.
    clearErrors("thumbnail")

    const thumbnailImage = (e.target.files as FileList)[0]

    if (!thumbnailImage.type.startsWith("image/"))
      return setError("thumbnail", { message: "image파일만 선택가능합니다." })

    const thumbnailName = uuidv4()

    const { data, error } = await supabase.storage
      .from("goods_thumbnail")
      .upload(`${session?.user.id}/${thumbnailName}`, thumbnailImage, {
        cacheControl: "3600",
        upsert: false,
      })
    if (data) {
      const storageUrl = GOODS_THUMBNAIL_URL + data.path
      setValue("thumbnail", storageUrl)
    } else {
      setError("thumbnail", {
        message: "썸네일이미지 업로드에 실패했습니다. 잠시후 다시 시도해주세요",
      })
      console.error("thumbnail uploading error : ", error)
    }
  }

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError 한번 실행되면 안 없어져서, 아래함수로 기존의 setError context를 초기화 시켜줍니당.
    clearErrors("image")

    const fileInput = e.target.files as FileList

    if (fileInput.length > 5)
      return setError("image", {
        type: "maxLength",
        message: "이미지파일의 수는 5개를 넘을 수 없습니다.",
      })

    let imageList: string[] = []

    for (let i = 0; i < fileInput.length; i++) {
      if (!fileInput[i].type.startsWith("image/"))
        return setError("image", { message: "image파일만 선택가능합니다." })

      const imageName = uuidv4()

      const { data, error } = await supabase.storage
        .from("goods_image")
        .upload(`${session?.user.id}/${imageName}`, fileInput[i], {
          cacheControl: "3600",
          upsert: false,
        })
      if (data) {
        imageList.push(GOODS_IMAGE_URL + data.path)
      } else {
        setError("image", {
          message:
            "상품 이미지 업로드에 실패했습니다. 잠시후 다시 시도해주세요",
        })
        console.error("goods image uploading error : ", error)
      }
    }
    setValue("image", imageList)
  }

  const EmptyImageBucket = async () => {
    const { data, error } = await supabase.storage.emptyBucket("goods_image")
    if (data) return console.log(data)
    else return console.log(error)
  }

  useEffect(() => {
    watch((value) => console.log(value))
  }, [watch])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="name">상품명</Label>
            {errors.name?.message && (
              <p className="text-sm text-red-400">*{errors.name?.message}</p>
            )}
          </div>
          <Input
            className="w-[500px] focus-visible:ring-0"
            placeholder="ex) 가나파이 12개입 4개"
            {...register("name")}
          />
        </div>

        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="price">상품 가격</Label>
            {errors.price?.message && (
              <p className="text-sm text-red-400">*{errors.price?.message}</p>
            )}
          </div>
          <Input
            className="w-[500px] focus-visible:ring-0"
            placeholder="ex) 15000"
            {...register("price")}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="delivery-fee">배송비</Label>
            {errors.deliveryFee?.message && (
              <p className="text-sm text-red-400">
                *{errors.deliveryFee?.message}
              </p>
            )}
          </div>
          <Input
            className="w-[500px] focus-visible:ring-0"
            placeholder="ex) 0 혹은 3000"
            {...register("deliveryFee")}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="category">카테고리</Label>
            {errors.category?.message && (
              <p className="text-sm text-red-400">
                *{errors.category?.message}
              </p>
            )}
          </div>
          <Select
            onValueChange={(value: "의류" | "식품" | "생활용품") =>
              setValue("category", value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="식품">식품</SelectItem>
                <SelectItem value="의류">의류</SelectItem>
                <SelectItem value="생활용품">생활용품</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="thumbnail">썸네일</Label>
            {errors.thumbnail?.message && (
              <p className="text-sm text-red-400">
                *{errors.thumbnail?.message}
              </p>
            )}
          </div>
          <Input
            className="w-[300px] focus-visible:ring-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded-lg file:px-1"
            type="file"
            accept="image/png, image/webp, image/jpeg, image/jpg"
            onChange={(e) => uploadThumbnail(e)}
          />
        </div>

        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="image">이미지</Label>
            {errors.image?.message && (
              <p className="text-sm text-red-400">
                *{errors.image?.message?.toString()}
              </p>
            )}
          </div>
          <Input
            className="w-[300px] focus-visible:ring-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded-lg file:px-1"
            placeholder="최대 5장까지 선택"
            type="file"
            accept=".png, .webp, .jpeg, .jpg"
            multiple
            onChange={(e) => uploadImages(e)}
          />
        </div>

        <div>
          <Button
            onClick={(e) => {
              e.preventDefault()
              EmptyImageBucket()
            }}
            className="w-auto"
          >
            EmptyImageBucket
          </Button>
        </div>

        {/* TODO: content editor 만들기 */}
        <div>
          <div className="flex gap-2 items-center p-1">
            <Label htmlFor="content">상품 설명</Label>
            {errors.content?.message && (
              <p className="text-sm text-red-400">
                *{errors.content?.message?.toString()}
              </p>
            )}
          </div>
          <Input
            disabled
            className="w-[300px] focus-visible:ring-0"
            {...register("content")}
            onChange={(e) => console.log(e.target.files?.length)}
          />
        </div>

        {/* TODO: option 추가 */}

        <div>
          <Button
            onClick={(e) => {
              e.preventDefault()
              setIsOption((prev) => !prev)
            }}
          >
            옵션
          </Button>
        </div>

        {isOption ? (
          <div>옵션창</div>
        ) : (
          <div>
            <div className="flex gap-2 items-center p-1">
              <Label htmlFor="inventory">재고</Label>
              {errors.inventory?.message && (
                <p className="text-sm text-red-400">
                  *{errors.inventory?.message}
                </p>
              )}
            </div>
            <Input
              className="w-[300px] focus-visible:ring-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded-lg file:px-1"
              type="number"
              {...register("inventory")}
            />
          </div>
        )}

        <div>
          <Input
            type="submit"
            value={"상품 등록"}
            className={cn(buttonVariants(), "w-auto")}
            onClick={handleSubmit(onSubmit)}
            disabled={btnDisalbe || isLoading}
          />
        </div>
      </form>
    </div>
  )
}
