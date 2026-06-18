"use client"

import * as React from "react"
import { getServices, subscribeToStore, syncServices } from "@/lib/site-store"

export function useServiceCatalog() {
  const [catalog, setCatalog] = React.useState(getServices())

  React.useEffect(() => {
    let isMounted = true

    const syncState = async (force = false) => {
      const nextCatalog = await syncServices({ force })

      if (!isMounted) {
        return
      }

      setCatalog(nextCatalog)
    }

    void syncState(true)

    const unsubscribe = subscribeToStore(() => {
      void syncState()
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  return catalog
}
