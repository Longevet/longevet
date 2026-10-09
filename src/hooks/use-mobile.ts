import * as React from "react"

const MOBILE_BREAKPOINT = 768
const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(query)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}
const snapshot = () => window.matchMedia(query).matches
const serverSnapshot = () => false

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, snapshot, serverSnapshot)
}
