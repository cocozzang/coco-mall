import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { ResidenceValidator } from "@/lib/validators/residence"
import { z } from "zod"

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        address: true,
        zipcode: true,
      },
    })

    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response("서버에러, 잠시후 재시도 해주세용.", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { address, zipcode } = ResidenceValidator.parse(body)

    const user = await db.user.upsert({
      where: {
        id: session.user.id,
      },
      update: {
        zipcode,
        address,
      },
      create: {
        zipcode,
        address,
      },
      select: {
        zipcode: true,
        address: true,
      },
    })

    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return new Response(
        "유효하지 않은 payload입니다. 양식에 맞는 데이터를 전달해주세요.",
        { status: 422 }
      )
    }

    return new Response("서버에러, 잠시후 재시도 해주세용.", { status: 500 })
  }
}
