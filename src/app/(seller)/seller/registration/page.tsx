import { getAuthSession } from "@/lib/auth"
import RegistrationForm from "../_components/registration-form"

interface GoodsRegistrationPageProps {}

export default async function GoodsRegistrationPage({}: GoodsRegistrationPageProps) {
  const session = await getAuthSession()
  return (
    <div>
      <div>상품등록 페이지</div>
      <RegistrationForm session={session} />
    </div>
  )
}
