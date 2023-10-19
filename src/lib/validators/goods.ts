import { z } from "zod"

/**
 * goods validator inventory 설명
 *
 * 스키마 내부엔 3개의 inventory가 있습니다.
 *
 * 1) goods.inventory
 * 2) goods.option.inventory
 * 3) goods.option.optionValue.inventory
 *
 * 3가지의 inventory중 하나만 존재하게 하고 싶어 아래 로직을 추가했습니다.,
 * goods.option이 생기면 1) 를 제한하고
 * goods.option.optionValue가 생기면 1) 2) 둘을 제한합니다.
 */
export const GoodsValidator = z
  .object({
    name: z
      .string()
      .min(1, { message: "상품이름은 필수값입니다." })
      .max(50, { message: "상품이름은 50글자 이내여야합니다." }),
    price: z
      .number({ invalid_type_error: "숫자를 입력해주세요." })
      .int({ message: "가격에 소수점은 포함 될 수 없습니다." })
      .gte(100, { message: "상품가격은 100원 이상이어야합니다." })
      .lte(1_000_000_000, { message: "상품가격은 10억원 이하여야합니다." }),
    deliveryFee: z
      .number({ invalid_type_error: "숫자를 입력해주세요." })
      .int({ message: "가격에 소수점은 포함 될 수 없습니다." })
      .nonnegative({ message: "배송비 최소값은 0원입니다." }),
    content: z.any(),
    option: z
      .array(
        z
          .object({
            optionName: z.string(),
            inventory: z
              .number({ invalid_type_error: "숫자를 입력해주세요." })
              .int({ message: "가격에 소수점은 포함 될 수 없습니다." })
              .gte(1, { message: "상품 재고는 1개 이상이어야합니다." })
              .optional(),
            optionValue: z
              .array(
                z.object({
                  value: z.string().max(20, {
                    message: "서브옵션 이름은 20자 이내로 작성해주세요.",
                  }),
                  inventory: z.number(),
                })
              )
              .max(10, { message: "서브 옵션은 10개를 초과할 수 없습니다." })
              .optional(),
          })
          .optional()
          .refine(
            (data) => {
              if (data?.optionValue) return data.inventory === undefined
              else return data?.inventory !== undefined
            },
            {
              message: "서브옵션이나 메인옵션에 재고가 하나만 존재해야합니다.",
              path: ["option.inventory", "option.optionValue.inventory"],
            }
          )
      )
      .max(10, { message: "옵션은 10개를 초과할 수 없습니다." })
      .optional(),
    inventory: z
      .number({ invalid_type_error: "숫자를 입력해주세요." })
      .int({ message: "가격에 소수점은 포함 될 수 없습니다." })
      .gte(1, { message: "상품 재고는 1개 이상이어야합니다." })
      .optional(),
    // category: z.string().refine((value) => {
    //   return value === "의류" || value === "생활용품" || value === "식품"
    // }),
    category: z.union([
      z.literal("의류"),
      z.literal("생활용퓸"),
      z.literal("식품"),
    ]),
    thumbnail: z
      .string()
      .min(1, { message: "thumbnail 이미지는 필수값입니다." }),
    image: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.option) return data.inventory === undefined
      else return data.inventory !== undefined
    },
    {
      message:
        "옵션이 있는 상품엔 옵션에 해당하는 재고만 입력해주세요. 옵션이 없다면 재고입력은 필수입니다.",
      path: ["inventory", "option.inventory"],
    }
  )

export type GoodsPayload = z.infer<typeof GoodsValidator>

GoodsValidator.parse({
  name: "새상품1",
  price: 500,
  deliveryFee: 0,
  content: "개좋은 상품임 ㅇㅇ",
  option: [
    {
      optionName: "초코맛",
      optionValue: [
        {
          value: "s 사이즈",
          inventory: 5,
        },
      ],
    },
    {
      optionName: "딸기맛",
      optionValue: [
        { value: "s 사이즈", inventory: 10 },
        { value: "m 사이즈", inventory: 15 },
      ],
    },
  ],
  category: "코코",
  thumbnail: "path/newGoods.jpg",
})
