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

    const body = await req.json()

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
    } = GoodsValidator.parse(body)

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

    const createImageObj = (
      images: string[] | undefined | null,
      goodsId: string
    ): ImageObj => {
      if (images && images.length > 0) {
        return images.map((image, _) => ({
          imageUrl: image,
          goodsId,
        }))
      } else return []
    }

    // TODO: option 로직 추가하기
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
      },
    })

    // const goodsImage = await db.goodsImage.create({
    //   data: {
    //     goodsId: goods.id,
    //     imageUrl: {
    //       createMany: { data: createImageObj(image) },
    //     },
    //   },
    // })

    const goodsImage = await db.goodsImage.createMany({
      data: createImageObj(image, goods.id),
    })

    const res = { ...goods, ...goodsImage }

    const serializedRes = JSON.stringify({
      ...res,
      rating: res.rating.toString(),
    })

    return new Response(serializedRes, {
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
  } catch (error) {
    console.log(error)
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
