import { NextResponse } from "next/server"
import { z } from "zod"
import { deleteService } from "@/lib/server/services-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const deleteServiceSchema = z.object({
  kind: z.enum(["stay", "attraction", "car-rental", "airport-taxi"]),
  actor: z
    .object({
      email: z.string().min(1),
      name: z.string().min(1),
      role: z.enum(["guest", "user", "admin", "system"]),
    })
    .optional(),
})

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set("Cache-Control", "no-store")

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await context.params
    const payload = deleteServiceSchema.parse(await request.json())
    const result = await deleteService(payload.kind, serviceId, payload.actor)

    if (!result) {
      return jsonResponse(
        {
          error: "Service card not found.",
        },
        { status: 404 }
      )
    }

    return jsonResponse(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse(
        {
          error: "Invalid service deletion payload.",
          issues: error.flatten(),
        },
        { status: 400 }
      )
    }

    return jsonResponse(
      {
        error: "Unable to delete service card.",
      },
      { status: 500 }
    )
  }
}
