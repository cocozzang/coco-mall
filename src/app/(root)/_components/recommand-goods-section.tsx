import GoodsCard from "@/components/goods/goods-card"
import GoodsSlider from "@/components/goods/goods-slider"
import { db } from "@/lib/db"

interface RecommandGoodsSectionProps {}

export default async function RecommandGoodsSection({}: RecommandGoodsSectionProps) {
  const recommandGoodsList = await db.goods.findMany({
    take: 15,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <div>추천상품영역 slider</div>

      <GoodsSlider goodsList={recommandGoodsList} />
    </div>
  )
}
