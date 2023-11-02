import GoodsCard from "@/components/goods/goods-card"
import { Goods } from "@prisma/client"

interface RegisterdGoodsProps {
  goodsList: Goods[]
  goodsCount: number
}

export default function RegisterdGoods({
  goodsList,
  goodsCount,
}: RegisterdGoodsProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {goodsList.map((goods) => (
          <GoodsCard goods={goods} key={goods.id} />
        ))}
      </div>
    </div>
  )
}
