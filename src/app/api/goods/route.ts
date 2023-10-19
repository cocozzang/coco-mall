import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { GoodsValidator } from "@/lib/validators/goods"
import { z } from "zod"

// 상품 등록 POST API
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const {
      category: categoryName,
      deliveryFee,
      name,
      price,
      thumbnail,
      content,
      image,
      inventory,
      option,
    } = GoodsValidator.parse(req.body)

    const category = await db.category.findFirst({
      where: { name: categoryName },
    })

    if (!category) {
      return new Response("category not found", { status: 400 })
    }

    type ImageObj =
      | {
          imageUrl: string
          goodsId: string
        }[]
      | []

    const createImageObj = (images: string[] | undefined | null): ImageObj => {
      if (images && images.length > 0) {
        return images.map((image, _) => ({
          imageUrl: image,
          goodsId: goods.id,
        }))
      } else return []
    }

    // type OptionType = typeof option

    // const createOptionObj = (option: OptionType) => {
    //   if (!option) return []

    //   if (option && option[0]?.optionValue) {
    //   }
    // }

    const goods = await db.goods.create({
      data: {
        name,
        price,
        thumbnail,
        sellerId: session.user.id,
        categoryId: category.id,
        deliveryFee,
        content,
        inventory: inventory ?? null,
        image: {
          createMany: { data: createImageObj(image) },
        },
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        "유효하지 않은 payload입니다. 양식에 맞는 데이터를 전달해주세요.",
        { status: 422 }
      )
    }

    return new Response("서버에러, 잠시후 재시도 해주세용.", { status: 500 })
  }
}

// 상품 수정 PATCH API

// 상품 삭제 DELETE API
