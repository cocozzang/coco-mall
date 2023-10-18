import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import RegisterdGoods from "./_components/registerd-goods"

interface SellerMainPageProps {}

export default async function SellerMainPage({}: SellerMainPageProps) {
  const session = await getAuthSession()

  const goodsList = await db.goods.findMany({
    where: { seller: { id: session?.user.id } },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const goodsCount = await db.goods.count()

  return (
    <div>
      <div>내가 등록한 상품 / (전체보기)</div>
      <RegisterdGoods goodsList={goodsList} goodsCount={goodsCount} />

      <br />
      <div>결제된 상품 (전체보기)</div>
      <div>배송보내기</div>
      <div>배송완료하기</div>
      <br />
      <div>새 상품 등록하기</div>
    </div>
  )
}
