import { ToastAction } from "@/components/toaster/toast"
import { toast } from "./use-toast"
import { useRouter } from "next/navigation"

export const useCustomToast = () => {
  const router = useRouter()

  const loginToast = () => {
    const { dismiss } = toast({
      title: "로그인이 필요합니다.",
      variant: "destructive",
      action: (
        <ToastAction
          altText="판매자 페이지 이동"
          onClick={() => router.push("/seller")}
        >
          판매자 페이지 이동
        </ToastAction>
      ),
    })
  }

  return { loginToast }
}
