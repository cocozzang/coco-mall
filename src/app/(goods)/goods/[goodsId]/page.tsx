import { db } from "@/lib/db"
import Image from "next/image"

interface GoodsDetailPageProps {
  params: { goodsId: string }
}

export default async function GoodsDetailPage({
  params: { goodsId },
}: GoodsDetailPageProps) {
  const post = await db.goods.findFirst({
    where: { id: goodsId },
  })
  return (
    <div>
      <div>{post?.name}</div>
      <div>{post?.price}</div>
      {post?.thumbnail && (
        <Image
          src={post?.thumbnail}
          alt="goods thumnail"
          width={300}
          height={300}
        />
      )}
    </div>
  )
}
