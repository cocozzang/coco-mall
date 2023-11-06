"use client"

import { cn } from "@/lib/utils"
import { Goods, GoodsImage } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"

interface ImageViewerProps {
  goods: ({ image: GoodsImage[] } & Goods) | null
  className?: string
}

export default function ImageViewer({ goods, className }: ImageViewerProps) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(goods?.thumbnail)

  return (
    <div
      className={cn(
        "md:mx-0 mx-auto md:max-w-[400px] max-w-[300px]",
        className
      )}
    >
      {/* main image */}
      <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] relative">
        {imageSrc && (
          <>
            <Image
              src={imageSrc}
              alt={`image`}
              fill
              quality={100}
              sizes="(max-width: 768px) 90vw, 40vw"
              priority
            />
          </>
        )}
      </div>

      {/* image list */}
      <div className="flex gap-[5px] my-1 w-[300px] md:w-[400px]">
        <div className="w-[55px] h-[55px] md:w-[75px] md:h-[75px] relative group hover:after:block">
          {goods?.thumbnail && (
            <>
              <Image
                fill
                src={goods.thumbnail}
                alt={`${goods.thumbnail}-image`}
                sizes="(max-width: 768px) 10vw,75px"
                onMouseEnter={() => setImageSrc(goods.thumbnail)}
              />
              <div
                className={`
                  absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 border-b-[2px] border-zinc-400 w-0 group-hover:w-11/12 transition-all duration-400 ease-in-out
                  ${imageSrc === goods.thumbnail ? "w-11/12" : ""}
                `}
              />
            </>
          )}
        </div>

        {goods?.image.map((image, index) => (
          <div
            className="w-[55px] h-[55px] md:w-[75px] md:h-[75px] relative group"
            key={image.id}
          >
            {image.imageUrl && (
              <>
                <Image
                  src={image.imageUrl}
                  alt="goods-image"
                  fill
                  sizes="(max-width: 768px) 10vw,75px"
                  onMouseEnter={() => setImageSrc(image.imageUrl)}
                />
                <div
                  className={`
                    absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 border-b-[2px] border-zinc-400 w-0 group-hover:w-11/12 transition-all duration-400 ease-in-out
                    ${imageSrc === image.imageUrl ? "w-11/12" : ""}
                  `}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
