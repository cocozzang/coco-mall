import SellerAccess from "@/components/common/seller-access"
import Postcode from "@/components/postcode"
import { Button } from "@/components/ui/button"
import EditUsername from "@/components/user/edit-username"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SearchIcon } from "lucide-react"

interface UserSettingsPageProps {}

export default async function UserSettingsPage({}: UserSettingsPageProps) {
  const session = await getAuthSession()

  const userInfo = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      zipcode: true,
      address: true,
      username: true,
    },
  })

  return (
    // 배송지 설정

    // username 변경

    // if session.user.role === 1 판매자권한 얻기

    <div>
      <div>UserSettingsPage</div>

      <div className="flex flex-col gap-3">
        <div>
          <div>배송지 설정</div>
          <Postcode address={userInfo?.address} zipcode={userInfo?.zipcode} />
        </div>
        <EditUsername username={userInfo?.username} />
      </div>

      {session?.user.role === 1 && <SellerAccess className="my-2" />}
    </div>
  )
}
