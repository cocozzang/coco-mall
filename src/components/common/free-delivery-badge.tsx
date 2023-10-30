import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

interface FreeDeloveryBadgeProps {
  className?: string
}

export default function FreeDeloveryBadge({
  className,
}: FreeDeloveryBadgeProps) {
  return (
    <Badge
      className={cn("px-1.5 py-0 text-zinc-500", className)}
      variant={"secondary"}
    >
      무료배송
    </Badge>
  )
}
