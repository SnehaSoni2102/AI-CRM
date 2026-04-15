import { cn } from '@/lib/utils'
import { wizardSteps } from './workflowData'

export default function Stepper({ currentStep }) {
  return (
    <div className="flex items-center gap-3">
      {wizardSteps.map((step, i) => {
        const isActive = currentStep === step.id
        const isDone = currentStep > step.id
        return (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary/10">
              <span className={cn('text-[30px] font-bold leading-none', isActive || isDone ? 'text-[var(--studio-primary)]' : 'text-muted-foreground')}>
                {step.id}
              </span>
            </div>
            {i < wizardSteps.length - 1 && <div className="h-[2px] w-10 bg-border" />}
          </div>
        )
      })}
    </div>
  )
}
