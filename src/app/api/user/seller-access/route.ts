import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    if (session?.user.role !== 1) {
      return new Response("구매자 회원만 판매권한을 요청할 수 있습니다.", {
        status: 400,
      })
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        role: 2,
      },
    })

    return new Response("OK")
  } catch (error) {
    return new Response(
      "서버에러, 판매자 권한요청 실패. 잠시후 다시 시도해주세요",
      { status: 500 }
    )
  }
}
