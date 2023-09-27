import SellerAccess from "@/components/common/seller-access"
import Postcode from "@/components/postcode"
import { Button } from "@/components/ui/button"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SearchIcon } from "lucide-react"

interface UserSettingsPageProps {}

export default async function UserSettingsPage({}: UserSettingsPageProps) {
  const session = await getAuthSession()

  const fullAddress = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      zipcode: true,
      address: true,
    },
  })

  return (
    // 배송지 설정

    // username 변경

    // if session.user.role === 1 판매자권한 얻기

    <div>
      <div>UserSettingsPage</div>

      <div>배송지 설정</div>

      <Postcode address={fullAddress?.address} zipcode={fullAddress?.zipcode} />

      <div>닉네임 변경</div>

      <SellerAccess />
    </div>
  )
}
