
import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: { title: string; description?: string }[]
  currentStep?: number
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, currentStep = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-2",
              index < currentStep - 1 ? "text-primary" : "text-muted-foreground",
              index === currentStep - 1 ? "text-primary" : ""
            )}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-center font-medium">
              {index + 1}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{step.title}</p>
              {step.description && (
                <p className="text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)
Steps.displayName = "Steps"

export { Steps }
