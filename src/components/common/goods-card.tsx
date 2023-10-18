"use client"

import { Goods } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import RatingStar from "../rating/rating-star"

interface GoodsCardProps {
  goods: Goods
}

export default function GoodsCard({ goods }: GoodsCardProps) {
  return (
    <div className="w-[230px] h-[350px] hover:shadow-md">
      <div className="m-2">
        <div className="overflow-hidden relative w-[210px] h-[210px]">
          <Image
            className="object-cover absolute"
            src={goods.thumbnail}
            fill
            alt=""
          />
        </div>
        <p
          className="w-[230px] overflow-hidden whitespace-no-wrap text-ellipsis line-clamp-2"
          style={{ WebkitBoxOrient: "vertical", wordBreak: "break-word" }}
        >
          {goods.name}
        </p>
        <div className="text-rose-500 font-semibold">
          {new Intl.NumberFormat().format(goods.price)}원
        </div>
        <RatingStar rating={1.5} reviewCount={2} />
      </div>
    </div>
  )
}
