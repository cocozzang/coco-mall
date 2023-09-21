"use client"

import { useRouter } from "next/navigation"

import axios, { AxiosError } from "axios"

import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "../toaster/toast"
import { useCustomToast } from "@/hooks/use-custom-toast"

interface SellerAccessProps {}

export default function SellerAccess({}: SellerAccessProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { loginToast } = useCustomToast()
  const { mutate: getSellerAccess, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch("/api/user/seller-access")

      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }

        if (err.response?.status === 400) {
          return toast({
            title: "일반 구매자 회원만 판매권한신청이 가능합니다.",
            variant: "destructive",
            action: <ToastAction altText="닫기">닫기</ToastAction>,
          })
        }
      }
    },
    onSuccess: () => {
      return toast({
        title: "판매권한을 얻었습니당.",
        description: "상품을 등록해보셔용.",
        action: (
          <ToastAction
            altText="판매자 페이지 이동"
            onClick={() => router.push("/seller")}
          >
            판매자 페이지 이동
          </ToastAction>
        ),
      })
    },
  })

  return (
    <Button onClick={() => getSellerAccess()} isLoading={isLoading}>
      판매권한 얻기
    </Button>
  )
}
