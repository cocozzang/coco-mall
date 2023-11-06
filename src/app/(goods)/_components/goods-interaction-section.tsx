"use client"

import { Goods, GoodsImage, Option, User, Wishlist } from "@prisma/client"
import ImageViewer from "./image-viewer"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import "./goods-quantity-input.css"

interface GoodsInteractionSectionProps {
  goods:
    | (Goods & { option: Option[] } & { image: GoodsImage[] } & {
        seller: User
      })
    | null
  wishList: { id: string } | null
  className?: string
}

export default function GoodsInteractionSection({
  goods,
  className,
  wishList,
}: GoodsInteractionSectionProps) {
  const [goodsQuantity, setGoodsQuantity] = useState<number>(1)

  return (
    <div className={cn("flex gap-5 mt-5", className)}>
      <ImageViewer goods={goods} />

      <div>
        <div className="flex justify-between">
          {/* TODO: 상품 이름이 길어질떄 라인처리 */}
          <div>{goods?.name}</div>

          {/* TODO: wishlist 이벤트추가 */}
          <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] shrink-0">
            {wishList ? (
              <BsHeartFill size={24} className="text-red-500" />
            ) : (
              <BsHeart size={24} />
            )}
          </div>
        </div>

        <hr className="h-[1px] border-t-0 bg-neutral-300 my-2" />

        <div className="font-bold text-lg text-red-600">
          {goods &&
            new Intl.NumberFormat("ko-KR").format(goods?.price * goodsQuantity)}
          원
        </div>

        {goods?.option.length !== 0 && <div>옵션선택</div>}

        <div className="flex gap-2">
          <div className="flex">
            <Input
              className="w-[80px] rounded-r-none border-r-0"
              type="number"
              value={goodsQuantity}
              onChange={(e) => setGoodsQuantity(Number(e.target.value))}
            />
            <div className="flex flex-col">
              <Button
                size={"xsIcon"}
                className="rounded-t-sm rounded-l-none bg-white hover:bg-white text-black border border-input border-b-0"
                onClick={() => setGoodsQuantity((prev) => prev + 1)}
              >
                <RiArrowUpSLine size={20} />
              </Button>
              <Button
                size={"xsIcon"}
                className="rounded-b-sm rounded-l-none bg-white hover:bg-white text-black border border-input"
                onClick={() => setGoodsQuantity((prev) => prev - 1)}
              >
                <RiArrowDownSLine size={20} />
              </Button>
            </div>
          </div>
          <Button variant={"secondary"}>장바구니 담기</Button>
          <Button>바로구매</Button>
        </div>

        <div className="text-sm">
          <div>판매자명 : {goods?.seller.name}</div>
          <div>판매자 닉네임 : {goods?.seller.username}</div>
        </div>
      </div>

      <div className="border-t-2 border-zinc-700 my-12" />
    </div>
  )
}
