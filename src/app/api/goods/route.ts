import { getAuthSession } from "@/lib/auth"

// 상품 등록 POST API
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
  } catch (error) {}
}

// 상품 수정 PATCH API

// 상품 삭제 DELETE API
