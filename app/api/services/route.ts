import { NextResponse } from "next/server"
import { z } from "zod"
import { createService, listServices } from "@/lib/server/services-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const stayCategorySchema = z.enum(["hotel", "apartment", "villa", "resort"])

const createServiceSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("stay"),
    data: z.object({
      title: z.string().min(1),
      type: z.string().min(1),
      category: stayCategorySchema,
      location: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
      distance: z.string().min(1),
      rating: z.number().finite().nonnegative(),
      reviews: z.number().int().nonnegative(),
      price: z.number().finite().nonnegative(),
      image: z.string().min(1),
      gallery: z.array(z.string().min(1)).min(1),
      summary: z.string().min(1),
      description: z.string().min(1),
      isFivestar: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      guests: z.number().int().positive(),
      bedrooms: z.number().int().positive(),
      baths: z.number().int().positive(),
      amenities: z.array(z.string().min(1)).min(1),
      highlights: z.array(z.string().min(1)).min(1),
      policyNotes: z.array(z.string().min(1)).min(1),
    }),
  }),
  z.object({
    kind: z.literal("attraction"),
    data: z.object({
      name: z.string().min(1),
      location: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
      image: z.string().min(1),
      gallery: z.array(z.string().min(1)).min(1),
      rating: z.number().finite().nonnegative(),
      reviews: z.number().int().nonnegative(),
      price: z.number().finite().nonnegative(),
      duration: z.string().min(1),
      summary: z.string().min(1),
      description: z.string().min(1),
      includes: z.array(z.string().min(1)).min(1),
      highlights: z.array(z.string().min(1)).min(1),
    }),
  }),
  z.object({
    kind: z.literal("car-rental"),
    data: z.object({
      name: z.string().min(1),
      category: z.string().min(1),
      image: z.string().min(1),
      seats: z.number().int().positive(),
      transmission: z.string().min(1),
      fuel: z.string().min(1),
      price: z.number().finite().nonnegative(),
      location: z.string().min(1),
      summary: z.string().min(1),
      features: z.array(z.string().min(1)).min(1),
    }),
  }),
  z.object({
    kind: z.literal("airport-taxi"),
    data: z.object({
      route: z.string().min(1),
      pickup: z.string().min(1),
      destination: z.string().min(1),
      vehicle: z.string().min(1),
      passengers: z.number().int().positive(),
      price: z.number().finite().nonnegative(),
      arrivalWindow: z.string().min(1),
      image: z.string().min(1),
    }),
  }),
])

const actorSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  role: z.enum(["guest", "user", "admin", "system"]),
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
  const catalog = await listServices()
  return jsonResponse(catalog)
}

export async function POST(request: Request) {
  try {
    const payload = z
      .object({
        actor: actorSchema.optional(),
      })
      .and(createServiceSchema)
      .parse(await request.json())

    const result = await createService(payload, payload.actor)
    return jsonResponse(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse(
        {
          error: "Invalid service payload.",
          issues: error.flatten(),
        },
        { status: 400 }
      )
    }

    return jsonResponse(
      {
        error: "Unable to create service card.",
      },
      { status: 500 }
    )
  }
}
