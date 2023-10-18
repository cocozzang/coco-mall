import { db } from "@/lib/db"
import Image from "next/image"

interface GoodsDetailPageProps {
  params: { goodsId: string }
}

export default async function GoodsDetailPage({
  params: { goodsId },
}: GoodsDetailPageProps) {
  const goods = await db.goods.findFirst({
    where: { id: goodsId },
  })
  return (
    <div>
      <div>{goods?.name}</div>
      <div>{goods?.price}</div>
      {goods?.thumbnail && (
        <Image
          src={goods?.thumbnail}
          alt="goods thumnail"
          width={300}
          height={300}
        />
      )}
    </div>
  )
}
