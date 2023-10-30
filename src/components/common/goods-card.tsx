"use client"

import { Goods } from "@prisma/client"
import Image from "next/image"
import RatingStar from "../rating/rating-star"
import { cn } from "@/lib/utils"
import FreeDeloveryBadge from "./free-delivery-badge"

interface GoodsCardProps {
  goods: Goods
  className?: string
}

export default function GoodsCard({ goods, className }: GoodsCardProps) {
  return (
    <div
      className={cn("max-w-[230px] h-[350px] hover:shadow-xl p-1", className)}
    >
      <div className="w-full max-w-[220px] h-[200px] relative mx-auto">
        <Image
          className="object-contain"
          src={goods.thumbnail}
          sizes="(max-width: : 1024px) 100vw, 210px"
          priority
          fill
          alt={`${goods.name} thumbnail`}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMrwcAAUMA4McNmjsAAAAASUVORK5CYII="
        />
      </div>

      <div className="pt-1">
        {goods.deliveryFee === 0 && (
          // TODO: 무료배송 shadcn ui badge써서 ui만들기
          <FreeDeloveryBadge />
          // <p className="text-zinc-400 text-sm p-[1px]">무료배송</p>
        )}
        <p
          className="w-[230px] overflow-hidden whitespace-no-wrap text-ellipsis line-clamp-2"
          style={{ WebkitBoxOrient: "vertical", wordBreak: "break-word" }}
        >
          {goods.name}
        </p>
        <div className="text-rose-500 font-semibold">
          {new Intl.NumberFormat().format(goods.price)}원
        </div>
        {goods.reviewCount !== 0 && <RatingStar rating={1.5} reviewCount={2} />}
      </div>
    </div>
  )
}
