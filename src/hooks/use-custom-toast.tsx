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
          altText="로그인 페이지로 이동"
          onClick={() => router.push("/sign-in")}
        >
          로그인 페이지로 이동
        </ToastAction>
      ),
    })
  }

  return { loginToast }
}
