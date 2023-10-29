import GoodsCard from "@/components/common/goods-card"
import { db } from "@/lib/db"
import { Goods } from "@prisma/client"

interface RecommandGoodsSectionProps {}

export default async function RecommandGoodsSection({}: RecommandGoodsSectionProps) {
  const recommandGoodsList = await db.goods.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <div>추천상품영역</div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {recommandGoodsList.map((goods) => (
          <GoodsCard goods={goods} key={goods.id} />
        ))}
      </div>
    </div>
  )
}
