import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { UsernameValidator } from "@/lib/validators/user"
import { z } from "zod"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username")

    const is_exist_username = await db.user.findFirst({
      where: {
        username,
      },
    })

    if (is_exist_username) {
      return new Response("해당 username은 이미 존재합니다.", { status: 400 })
    }

    return new Response("해당 username은 사용가능합니다. " + username, {
      status: 200,
    })
  } catch (error) {
    return new Response(
      "username 중복을 확인 할 수 없습니다. 잠시후 다시 시도해주세요.",
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    const body = await req.json()

    const { username } = UsernameValidator.parse(body)

    const is_exist_username = await db.user.findFirst({
      where: {
        username,
      },
    })

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    if (is_exist_username) {
      return new Response("해당 username은 이미 존재합니다.", { status: 400 })
    }

    const username_response = await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        username,
      },
      select: {
        username: true,
      },
    })

    return new Response(JSON.stringify(username_response), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("유효하지않은 payload입니다.", { status: 422 })
    }

    return new Response(
      "닉네임 변경에 실패하였습니다. 잠시 후 다시 시도해주세요",
      { status: 500 }
    )
  }
}
