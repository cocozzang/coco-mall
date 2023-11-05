import { db } from "@/lib/db"
import Image from "next/image"
import ImageViewer from "../../_components/image-viewer"

interface GoodsDetailPageProps {
  params: { goodsId: string }
}

export default async function GoodsDetailPage({
  params: { goodsId },
}: GoodsDetailPageProps) {
  const goods = await db.goods.findFirst({
    where: { id: goodsId },
    include: { image: true },
  })

  return (
    <div>
      <div>{goods?.name}</div>
      <div>{goods?.price}</div>
      <ImageViewer goods={goods} />
      <div className="border-t-2 border-zinc-700 my-12" />
    </div>
  )
}
