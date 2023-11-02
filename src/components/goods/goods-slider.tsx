"use client"

import { cn } from "@/lib/utils"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import FreeDeloveryBadge from "../common/free-delivery-badge"
import RatingStar from "../rating/rating-star"
import { Goods } from "@prisma/client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface GoodsSliderProps {
  goodsList: Goods[]
  className?: string
}

export default function GoodsSlider({
  goodsList,
  className,
}: GoodsSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [disableSlide, setDisableSlide] = useState<
    "left" | "right" | "both" | null
  >("left")

  useEffect(() => {
    const sliderContainer = sliderRef.current

    const observer = new IntersectionObserver((entries) => {
      const observeObj: { left: boolean; right: boolean } = {
        left: false,
        right: false,
      }

      entries.map((entry) => {
        if (entry.target.id === "0") {
          entry.isIntersecting
            ? (observeObj.left = true)
            : (observeObj.left = false)
        } else {
          entry.isIntersecting
            ? (observeObj.right = true)
            : (observeObj.right = false)
        }
      })

      if (observeObj.left && !observeObj.right) setDisableSlide("left")
      if (!observeObj.left && observeObj.right) setDisableSlide("right")
      if (observeObj.left && observeObj.right) setDisableSlide("both")
      if (!observeObj.left && !observeObj.right) setDisableSlide(null)
    })

    const allDivInContainer = sliderContainer?.querySelectorAll("div")
    const lastCard =
      allDivInContainer && allDivInContainer[allDivInContainer?.length - 4]
    const firstCard = allDivInContainer && allDivInContainer[0]

    const elements = [firstCard, lastCard]

    elements.map((element) => element && observer.observe(element))

    return () => {
      elements.map((element) => element && observer.unobserve(element))
    }
  }, [])

  const slide = (direction: "left" | "right") => {
    if (sliderRef.current && direction === "left" && disableSlide !== "left") {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
    }
    if (
      sliderRef.current &&
      direction === "right" &&
      disableSlide !== "right"
    ) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
    }
  }

  return (
    <div
      className={cn(
        "max-w-5xl h-[310px] relative flex items-center mx-auto",
        className
      )}
    >
      <div
        ref={sliderRef}
        id="slider-container"
        className="max-w-5xl h-full flex gap-[1px] overflow-hidden overflow-x-scroll scroll-smooth scrollbar-hide"
      >
        {goodsList.map((goods, index) => (
          <SliderCard goods={goods} key={goods.id} index={index} />
        ))}
      </div>

      {disableSlide !== "left" && (
        <div
          className="bg-black opacity-40 hover:opacity-90 w-9 h-9 justify-center transition absolute left-0 flex items-center rounded-[2px]"
          onClick={() => slide("left")}
        >
          <div className="m-auto">
            <BsChevronLeft size={30} className="text-zinc-300" />
          </div>
        </div>
      )}

      {disableSlide !== "right" && (
        <div
          className="bg-black opacity-40 hover:opacity-90 w-9 h-9 justify-center transition absolute right-0 flex items-center rounded-[2px]"
          onClick={() => slide("right")}
        >
          <div className="m-auto">
            <BsChevronRight size={30} className="text-zinc-300" />
          </div>
        </div>
      )}
    </div>
  )
}

interface SliderCardProps {
  goods: Goods
  index: number
  className?: string
}

function SliderCard({ goods, index, className }: SliderCardProps) {
  return (
    <div
      className={cn("max-w-[250px] h-[300px] group", className)}
      id={`${index}`}
    >
      <div className="w-[204px] h-[200px] relative mx-auto">
        <Image
          className="object-contain"
          src={goods.thumbnail}
          sizes="(max-width: : 1024px) 100vw, 250px"
          priority
          fill
          alt={`${goods.name} thumbnail`}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMrwcAAUMA4McNmjsAAAAASUVORK5CYII="
        />
      </div>

      <div className="pt-1">
        {goods.deliveryFee === 0 && <FreeDeloveryBadge />}
        <p
          className="w-[204px] text-xs overflow-hidden whitespace-no-wrap text-ellipsis line-clamp-2 group-hover:underline"
          style={{ WebkitBoxOrient: "vertical", wordBreak: "break-word" }}
        >
          {goods.name}
        </p>
        <p className="text-rose-500 font-semibold">
          {new Intl.NumberFormat().format(goods.price)}원
        </p>
        {goods.reviewCount !== 0 && <RatingStar rating={1.5} reviewCount={2} />}
      </div>
    </div>
  )
}
