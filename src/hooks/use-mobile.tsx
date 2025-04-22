
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initial check before hooks run
    return typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listeners for both matchMedia and resize for better compatibility
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize)
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize)
    }
    
    // Set initial value
    handleResize()
    
    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize)
      } else {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return isMobile
}

// Additional hooks for mobile functionality
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait")

  React.useEffect(() => {
    const handleOrientationChange = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches
      setOrientation(isPortrait ? "portrait" : "landscape")
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleOrientationChange)
    
    // Set initial value
    handleOrientationChange()
    
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleOrientationChange)
    }
  }, [])

  return orientation
}

// A hook to detect touch capability
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState(false)
  
  React.useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 ||
                          (navigator as any).msMaxTouchPoints > 0
    setIsTouch(isTouchDevice)
  }, [])
  
  return isTouch
}
