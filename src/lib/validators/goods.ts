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
      .min(3, { message: "상품명은 3글자 이상이어야합니다" })
      .max(50, { message: "상품이름은 50글자 이내여야합니다." }),

    price: z.union([
      z
        .string({ required_error: "가격은 필수값입니다." })
        .transform((val, ctx) => {
          const parsed = parseFloat(val)

          if (parsed !== parseInt(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "가격에 소수점은 포함 될 수 없습니다.",
            })
            return z.NEVER
          }

          if (Number.isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "숫자를입력해주세요",
            })
            return z.NEVER
          }

          if (parsed < 100) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "상품가격은 100원 이상이어야합니다.",
            })
            return z.NEVER
          }

          if (parsed > 1_000_000_000) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "상품가격은 10억원 이하여야합니다.",
            })
            return z.NEVER
          }

          return parsed
        }),
      z
        .number({ required_error: "가격은 필수값입니다." })
        .int({ message: "가격에 소수점은 포함 될 수 없습니다." })
        .gte(100, { message: "상품가격은 100원 이상이어야합니다." })
        .lte(1_000_000_000, { message: "상품가격은 10억원 이하여햐합니다." }),
    ]),

    deliveryFee: z.union([
      z.string().transform((val, ctx) => {
        const parsed = parseFloat(val)

        if (parsed !== parseInt(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "배송비에 소수점은 포함 될 수 없습니다.",
          })
          return z.NEVER
        }

        if (Number.isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "숫자를입력해주세요",
          })
          return z.NEVER
        }

        if (parsed < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "배송비 최소값은 0원입니다.",
          })
          return z.NEVER
        }

        if (parsed > 1_000_000_000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "상품 배송비느 10억원 이하여야합니다.",
          })
          return z.NEVER
        }

        return parsed
      }),
      z
        .number({ required_error: "배송비는 필수값입니다." })
        .int({ message: "배송비에 소수점은 포함 될 수 없습니다." })
        .gte(0, { message: "배송비는 0원 이상이어야합니다." })
        .lte(1_000_000_000, { message: "배송비는 10억원 이하여햐합니다." }),
    ]),

    content: z.any(),

    option: z
      .array(
        z
          .object({
            optionName: z.string(),
            inventory: z.union([
              z
                .string()
                .transform((val, ctx) => {
                  const parsed = parseFloat(val)

                  if (parsed !== parseInt(val)) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "재고값에 소수점은 포함 될 수 없습니다.",
                    })
                    return z.NEVER
                  }

                  if (Number.isNaN(parsed)) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "숫자를입력해주세요",
                    })
                    return z.NEVER
                  }

                  if (parsed < 0) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "재고의 최소값은 0입니다.",
                    })
                    return z.NEVER
                  }

                  return parsed
                })
                .optional(),
              z
                .number({ invalid_type_error: "숫자를 입력해주세요." })
                .int({ message: "재고값에 소수점은 포함 될 수 없습니다." })
                .gte(1, { message: "상품 재고는 1개 이상이어야합니다." })
                .optional(),
            ]),
            optionValue: z
              .array(
                z.object({
                  value: z.string().max(20, {
                    message: "서브옵션 이름은 20자 이내로 작성해주세요.",
                  }),
                  inventory: z.union([
                    z.string().transform((val, ctx) => {
                      const parsed = parseFloat(val)

                      if (parsed !== parseInt(val)) {
                        ctx.addIssue({
                          code: z.ZodIssueCode.custom,
                          message: "재고에 소수점은 포함 될 수 없습니다.",
                        })
                        return z.NEVER
                      }

                      if (Number.isNaN(parsed)) {
                        ctx.addIssue({
                          code: z.ZodIssueCode.custom,
                          message: "숫자를입력해주세요",
                        })
                        return z.NEVER
                      }

                      if (parsed < 0) {
                        ctx.addIssue({
                          code: z.ZodIssueCode.custom,
                          message: "재고 최소값은 0입니다.",
                        })
                        return z.NEVER
                      }

                      return parsed
                    }),
                    z
                      .number({ invalid_type_error: "숫자를 입력해주세요." })
                      .int({
                        message: "재고값에 소수점은 포함 될 수 없습니다.",
                      })
                      .gte(1, { message: "상품 재고는 1개 이상이어야합니다." }),
                  ]),
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

    inventory: z.union([
      z
        .string()
        .transform((val, ctx) => {
          const parsed = parseFloat(val)

          if (parsed !== parseInt(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "재고에 소수점은 포함 될 수 없습니다.",
            })
            return z.NEVER
          }

          if (Number.isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "숫자를입력해주세요",
            })
            return z.NEVER
          }

          if (parsed < 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "재고 최소값은 0입니다.",
            })
            return z.NEVER
          }

          return parsed
        })
        .optional(),
      z
        .number({ invalid_type_error: "숫자를 입력해주세요." })
        .int({ message: "재고값에 소수점은 포함 될 수 없습니다." })
        .gte(1, { message: "상품 재고는 1개 이상이어야합니다." })
        .optional(),
    ]),

    category: z.union([
      z.literal("의류"),
      z.literal("생활용품"),
      z.literal("식품"),
    ]),

    thumbnail: z
      .string({ required_error: "thumbnail 이미지는 필수값입니다." })
      .min(1, { message: "thumbnail 이미지는 필수값입니다." }),

    image: z
      .array(z.string())
      .refine(
        (arr) => arr?.length <= 5,
        `이미지 파일 갯수는 5장까지 가능합니다.`
      )
      .optional(),
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

/* -------------------------------------------------------------------------------------------------
 * schema validation testing
 * -----------------------------------------------------------------------------------------------*/

// GoodsValidator.parse({
//   name: "새상품1",
//   price: "10000",
//   deliveryFee: 0,
//   content: "개좋은 상품임 ㅇㅇ",
//   inventory: 100.1,
//   category: "의류",
//   thumbnail: "path/newGoods.jpg",
//   image: ["asd", "asd", "123", "de", "asd"],
// })

// GoodsValidator.parse({
//   name: "새상품1",
//   price: "10000",
//   deliveryFee: 0,
//   content: "개좋은 상품임 ㅇㅇ",
//   option: [
//     {
//       optionName: "초코맛",
//       optionValue: [
//         {
//           value: "s 사이즈",
//           inventory: "5",
//         },
//       ],
//     },
//     {
//       optionName: "딸기맛",
//       optionValue: [
//         { value: "1 사이즈", inventory: "10" },
//         { value: "2 사이즈", inventory: "15" },
//         { value: "3 사이즈", inventory: "15" },
//         { value: "4 사이즈", inventory: "15" },
//         { value: "5 사이즈", inventory: "15" },
//         { value: "6 사이즈", inventory: "15" },
//         { value: "7 사이즈", inventory: "15" },
//         { value: "8 사이즈", inventory: "15" },
//         { value: "9 사이즈", inventory: "15" },
//         { value: "10 사이즈", inventory: "15" },
//       ],
//     },
//     { optionName: "민초맛", inventory: 10 },
//   ],
//   category: "의류",
//   thumbnail: "path/newGoods.jpg",
//   image: ["asd", "asd", "123", "de", "asd"],
// })
