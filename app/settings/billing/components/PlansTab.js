import { CheckCircle2, FileText } from 'lucide-react'

export default function PlansTab({ plans }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Service Plans</h2>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-border bg-background p-3">
            <p className="text-sm font-semibold text-foreground">{plan.name}</p>
            <p className="mt-1 text-lg font-semibold text-[var(--studio-primary)]">{plan.price}</p>
            <p className="text-xs text-muted-foreground mt-1">{plan.seats} • {plan.aiCalls}</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {plan.includes.map((feature) => (
                <li key={feature} className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
