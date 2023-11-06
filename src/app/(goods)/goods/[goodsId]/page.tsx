import { db } from "@/lib/db"
import GoodsInteractionSection from "../../_components/goods-interaction-section"
import { getAuthSession } from "@/lib/auth"

interface GoodsDetailPageProps {
  params: { goodsId: string }
}

export default async function GoodsDetailPage({
  params: { goodsId },
}: GoodsDetailPageProps) {
  const session = await getAuthSession()

  const goods = await db.goods.findFirst({
    where: { id: goodsId },
    include: { image: true, seller: true, option: true },
  })

  const wishList = await db.wishlist.findFirst({
    where: {
      user: { id: session?.user.id },
      goods: { some: { id: goodsId } },
    },
  })

  return (
    <div className="max-w-[1024px] mx-auto">
      {/* Goods Interaction Section */}
      <GoodsInteractionSection goods={goods} wishList={wishList} />

      {/* Goods Content Section */}
      <div className="mt-10">Goods Content Section</div>

      {/* Similar Goods Section */}
      <div className="mt-10">Similar Goods Section</div>

      {/* Goods Review Section */}
      <div className="mt-10">Goods Review Section</div>
    </div>
  )
}
