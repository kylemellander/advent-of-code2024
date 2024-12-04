import { useMemo } from "react"

export const useCurrentDay = () => {
  return useMemo(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const paramValue = params.get("day")
    return paramValue ? parseInt(paramValue) : undefined
  }, [])
}
