interface RatingStarProps {
  rating: number
  reviewCount: number
}

export default function RatingStar({ rating, reviewCount }: RatingStarProps) {
  const ratingToPercent = rating * 20
  return (
    <div className="flex gap-1 items-center">
      <div className="text-zinc-400 relative w-max">
        <div
          className="text-yellow-400 p-0 absolute z-10 flex top-0 left-0 overflow-hidden text-lg"
          style={{ width: ratingToPercent + "%" }}
        >
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="z-0 p-0 flex text-lg">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
      <div>({reviewCount})</div>
    </div>
  )
}
