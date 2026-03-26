import { NextResponse } from "next/server"
import { z } from "zod"
import { appendActivity, listActivities } from "@/lib/server/activities-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const activitySchema = z.object({
  category: z.enum(["account", "admin", "booking", "favorite", "support"]),
  action: z.string().min(1),
  actorRole: z.enum(["guest", "user", "admin", "system"]),
  actorName: z.string().min(1),
  actorEmail: z.string().min(1),
  subjectType: z.string().min(1),
  subjectId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  subjectTitle: z.string().min(1).optional(),
  subjectSubtitle: z.string().min(1).optional(),
})

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set("Cache-Control", "no-store")

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

export async function GET() {
  const activities = await listActivities()
  return jsonResponse(activities)
}

export async function POST(request: Request) {
  try {
    const payload = activitySchema.parse(await request.json())
    const result = await appendActivity(payload)
    return jsonResponse(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse(
        {
          error: "Invalid activity payload.",
          issues: error.flatten(),
        },
        { status: 400 }
      )
    }

    return jsonResponse(
      {
        error: "Unable to record activity.",
      },
      { status: 500 }
    )
  }
}
