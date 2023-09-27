import { z } from "zod"
export const PostCodeValidator = z.object({
  addresscode: z.string().min(1, { message: "우편번호를 입력해주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 입력해주세요." }),
})

export type PostCodePayload = z.infer<typeof PostCodeValidator>

export const UsernameValidator = z.object({
  username: z
    .string()
    .min(3, { message: "닉네임은 3글자 이상이어야합니다." })
    .max(30, { message: "닉네임은 30글자 이내여야합니다." }),
})

export type UsernamePayload = z.infer<typeof UsernameValidator>
