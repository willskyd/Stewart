"use client"

import Image from "next/image"
import Link from "next/link"
import { propertyTypes } from "@/lib/site-data"

export function PropertyTypes() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Browse by Property Type</h2>
          <p className="text-muted-foreground">Find the perfect accommodation for your travel style</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {propertyTypes.map((property) => (
            <Link key={property.type} href={property.href}>
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={property.image}
                    alt={property.type}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold text-white mb-1">{property.type}</h3>
                  <p className="text-sm text-white/80">{property.count} properties</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
