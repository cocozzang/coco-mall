import GoodsCard from "@/components/common/goods-card"
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
    <div className="grid">
      {goodsList.map((goods, index) => (
        <GoodsCard goods={goods} key={goods.id} />
      ))}
    </div>
  )
}
