export type ActivityCategory = "account" | "admin" | "booking" | "favorite" | "support"
export type ActivityActorRole = "guest" | "user" | "admin" | "system"

export interface SiteActivityRecord {
  id: string
  category: ActivityCategory
  action: string
  actorRole: ActivityActorRole
  actorName: string
  actorEmail: string
  subjectType: string
  subjectId: string
  title: string
  description: string
  subjectTitle?: string
  subjectSubtitle?: string
  createdAt: string
}

export type CreateSiteActivityInput = Omit<SiteActivityRecord, "id" | "createdAt">

export interface ActivityMutationResponse {
  activity: SiteActivityRecord
  activities: SiteActivityRecord[]
}
