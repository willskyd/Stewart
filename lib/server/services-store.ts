import "server-only"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { appendActivity } from "@/lib/server/activities-store"
import {
  buildAttractionSlug,
  buildCarRentalSlug,
  cloneServiceCatalog,
  getSeedServiceCatalog,
  normalizeServiceCatalog,
} from "@/lib/service-catalog"
import type {
  CreateServiceInput,
  ManagedServiceKind,
  ServiceMutationResponse,
  SiteCatalog,
} from "@/lib/service-types"

interface ServiceActivityActor {
  email: string
  name: string
  role: "guest" | "user" | "admin" | "system"
}

const DATA_DIRECTORY = path.join(process.cwd(), "data")
const SERVICES_FILE = path.join(DATA_DIRECTORY, "services.json")

let mutationQueue = Promise.resolve()

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

async function ensureServicesFile() {
  await mkdir(DATA_DIRECTORY, { recursive: true })

  try {
    return await readFile(SERVICES_FILE, "utf8")
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException

    if (fileError.code !== "ENOENT") {
      throw error
    }

    const seededData = JSON.stringify(getSeedServiceCatalog(), null, 2)
    await writeFile(SERVICES_FILE, seededData, "utf8")
    return seededData
  }
}

async function readServicesFile() {
  const raw = await ensureServicesFile()

  try {
    return normalizeServiceCatalog(JSON.parse(raw))
  } catch {
    const seed = getSeedServiceCatalog()
    await writeServicesFile(seed)
    return seed
  }
}

async function writeServicesFile(catalog: SiteCatalog) {
  await mkdir(DATA_DIRECTORY, { recursive: true })
  const nextCatalog = cloneServiceCatalog(catalog)
  await writeFile(SERVICES_FILE, JSON.stringify(nextCatalog, null, 2), "utf8")
  return nextCatalog
}

function runSerialized<T>(operation: () => Promise<T>) {
  const nextOperation = mutationQueue.then(operation, operation)
  mutationQueue = nextOperation.then(
    () => undefined,
    () => undefined
  )

  return nextOperation
}

export async function listServices() {
  return readServicesFile()
}

export async function createService(
  input: CreateServiceInput,
  actor: ServiceActivityActor = {
    email: "system@stewart.com",
    name: "Stewart system",
    role: "system",
  }
): Promise<ServiceMutationResponse> {
  return runSerialized(async () => {
    const catalog = await readServicesFile()

    const nextCatalog =
      input.kind === "stay"
        ? {
            ...catalog,
            properties: [
              {
                ...input.data,
                id: createId("stay"),
              },
              ...catalog.properties,
            ],
          }
        : input.kind === "attraction"
          ? {
              ...catalog,
              attractions: [
                {
                  ...input.data,
                  id: createId("attraction"),
                  slug: buildAttractionSlug(input.data.name),
                },
                ...catalog.attractions,
              ],
            }
          : input.kind === "car-rental"
            ? {
                ...catalog,
                carRentals: [
                  {
                    ...input.data,
                    id: createId("car"),
                    slug: buildCarRentalSlug(input.data.name),
                  },
                  ...catalog.carRentals,
                ],
              }
            : {
                ...catalog,
                taxiOffers: [
                  {
                    ...input.data,
                    id: createId("taxi"),
                  },
                  ...catalog.taxiOffers,
                ],
              }

    const savedCatalog = await writeServicesFile(nextCatalog)
    const createdService =
      input.kind === "stay"
        ? savedCatalog.properties[0].title
        : input.kind === "attraction"
          ? savedCatalog.attractions[0].name
          : input.kind === "car-rental"
            ? savedCatalog.carRentals[0].name
            : savedCatalog.taxiOffers[0].route

    await appendActivity({
      category: "admin",
      action: "service-created",
      actorRole: actor.role,
      actorName: actor.name,
      actorEmail: actor.email,
      subjectType: "service",
      subjectId: `${input.kind}:${createdService}`,
      title: "Service card added",
      description: `${actor.name} added a new ${input.kind} service card for ${createdService}.`,
      subjectTitle: createdService,
      subjectSubtitle: input.kind,
    }).catch((error) => {
      console.error("Failed to append service creation activity.", error)
    })

    return {
      catalog: savedCatalog,
    }
  })
}

export async function deleteService(
  kind: ManagedServiceKind,
  serviceId: string,
  actor: ServiceActivityActor = {
    email: "system@stewart.com",
    name: "Stewart system",
    role: "system",
  }
): Promise<ServiceMutationResponse | null> {
  return runSerialized(async () => {
    const catalog = await readServicesFile()

    const existingService =
      kind === "stay"
        ? catalog.properties.find((property) => property.id === serviceId)
        : kind === "attraction"
          ? catalog.attractions.find((attraction) => attraction.id === serviceId)
          : kind === "car-rental"
            ? catalog.carRentals.find((car) => car.id === serviceId)
            : catalog.taxiOffers.find((offer) => offer.id === serviceId)

    if (!existingService) {
      return null
    }

    const nextCatalog =
      kind === "stay"
        ? {
            ...catalog,
            properties: catalog.properties.filter((property) => property.id !== serviceId),
          }
        : kind === "attraction"
          ? {
              ...catalog,
              attractions: catalog.attractions.filter((attraction) => attraction.id !== serviceId),
            }
          : kind === "car-rental"
            ? {
                ...catalog,
                carRentals: catalog.carRentals.filter((car) => car.id !== serviceId),
              }
            : {
                ...catalog,
                taxiOffers: catalog.taxiOffers.filter((offer) => offer.id !== serviceId),
              }

    const savedCatalog = await writeServicesFile(nextCatalog)
    const serviceTitle =
      kind === "stay"
        ? (existingService as SiteCatalog["properties"][number]).title
        : kind === "attraction"
          ? (existingService as SiteCatalog["attractions"][number]).name
          : kind === "car-rental"
            ? (existingService as SiteCatalog["carRentals"][number]).name
            : (existingService as SiteCatalog["taxiOffers"][number]).route

    await appendActivity({
      category: "admin",
      action: "service-deleted",
      actorRole: actor.role,
      actorName: actor.name,
      actorEmail: actor.email,
      subjectType: "service",
      subjectId: `${kind}:${serviceId}`,
      title: "Service card deleted",
      description: `${actor.name} deleted the ${kind} service card for ${serviceTitle}.`,
      subjectTitle: serviceTitle,
      subjectSubtitle: kind,
    }).catch((error) => {
      console.error("Failed to append service deletion activity.", error)
    })

    return {
      catalog: savedCatalog,
    }
  })
}
