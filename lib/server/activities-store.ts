import "server-only"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type {
  ActivityMutationResponse,
  CreateSiteActivityInput,
  SiteActivityRecord,
} from "@/lib/activity-types"

const DATA_DIRECTORY = path.join(process.cwd(), "data")
const ACTIVITIES_FILE = path.join(DATA_DIRECTORY, "activities.json")
const MAX_ACTIVITY_RECORDS = 1000

let mutationQueue = Promise.resolve()

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

async function ensureActivitiesFile() {
  await mkdir(DATA_DIRECTORY, { recursive: true })

  try {
    return await readFile(ACTIVITIES_FILE, "utf8")
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException

    if (fileError.code !== "ENOENT") {
      throw error
    }

    const seededData = JSON.stringify([], null, 2)
    await writeFile(ACTIVITIES_FILE, seededData, "utf8")
    return seededData
  }
}

async function readActivitiesFile() {
  const raw = await ensureActivitiesFile()

  try {
    const parsed = JSON.parse(raw) as SiteActivityRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    await writeActivitiesFile([])
    return []
  }
}

async function writeActivitiesFile(activities: SiteActivityRecord[]) {
  await mkdir(DATA_DIRECTORY, { recursive: true })
  await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2), "utf8")
  return activities
}

function runSerialized<T>(operation: () => Promise<T>) {
  const nextOperation = mutationQueue.then(operation, operation)
  mutationQueue = nextOperation.then(
    () => undefined,
    () => undefined
  )

  return nextOperation
}

export async function listActivities() {
  return readActivitiesFile()
}

export async function appendActivity(
  input: CreateSiteActivityInput
): Promise<ActivityMutationResponse> {
  return runSerialized(async () => {
    const activities = await readActivitiesFile()
    const nextActivity: SiteActivityRecord = {
      ...input,
      id: createId("activity"),
      createdAt: new Date().toISOString(),
    }

    const nextActivities = [nextActivity, ...activities].slice(0, MAX_ACTIVITY_RECORDS)
    await writeActivitiesFile(nextActivities)

    return {
      activity: nextActivity,
      activities: nextActivities,
    }
  })
}
