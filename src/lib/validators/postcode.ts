import { z } from "zod"
export const PostCodeValidator = z.object({
  addresscode: z.string().min(1, { message: "우편번호를 입력해주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 입력해주세요." }),
})

export type PostCodePayload = z.infer<typeof PostCodeValidator>
