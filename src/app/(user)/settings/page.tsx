import SellerAccess from "@/components/common/seller-access"
import { getAuthSession } from "@/lib/auth"

interface UserSettingsPageProps {}

export default async function UserSettingsPage({}: UserSettingsPageProps) {
  const session = await getAuthSession()
  return (
    // 배송지 설정

    // username 변경

    // if session.user.role === 1 판매자권한 얻기

    <div>
      <div>UserSettingsPage</div>

      <div>배송지 설정</div>

      <div>닉네임 변경</div>

      <SellerAccess />
    </div>
  )
}
