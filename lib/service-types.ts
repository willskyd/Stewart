import type {
  AttractionRecord,
  CarRentalRecord,
  PropertyRecord,
  TaxiOffer,
} from "@/lib/site-data"

export type ManagedServiceKind = "stay" | "attraction" | "car-rental" | "airport-taxi"

export interface ManagedPropertyRecord extends PropertyRecord {
  isFeatured?: boolean
}

export interface ManagedTaxiOffer extends TaxiOffer {
  image: string
}

export interface SiteCatalog {
  properties: ManagedPropertyRecord[]
  attractions: AttractionRecord[]
  carRentals: CarRentalRecord[]
  taxiOffers: ManagedTaxiOffer[]
}

export type ManagedServiceRecord =
  | ({ kind: "stay" } & ManagedPropertyRecord)
  | ({ kind: "attraction" } & AttractionRecord)
  | ({ kind: "car-rental" } & CarRentalRecord)
  | ({ kind: "airport-taxi" } & ManagedTaxiOffer)

export type CreateServiceInput =
  | {
      kind: "stay"
      data: Omit<ManagedPropertyRecord, "id">
    }
  | {
      kind: "attraction"
      data: Omit<AttractionRecord, "id" | "slug">
    }
  | {
      kind: "car-rental"
      data: Omit<CarRentalRecord, "id" | "slug">
    }
  | {
      kind: "airport-taxi"
      data: Omit<ManagedTaxiOffer, "id">
    }

export interface ServiceMutationResponse {
  catalog: SiteCatalog
}
