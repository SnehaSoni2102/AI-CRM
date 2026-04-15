import { CalendarClock } from 'lucide-react'
import { formatDate, formatMoney } from './billingData'

export default function OverviewTab({
  mrr,
  activeCustomers,
  pastDueCustomers,
  aiUsageTotal,
  highUsageCustomers,
  upcomingRenewals,
}) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{formatMoney(mrr)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Active Customers</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{activeCustomers}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Past Due Accounts</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{pastDueCustomers}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">AI Calls This Cycle</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{aiUsageTotal.toLocaleString()}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Usage Risk Watchlist</h2>
          <p className="text-xs text-muted-foreground mt-1">Studios close to AI call quota</p>
          <div className="mt-3 space-y-2">
            {highUsageCustomers.map((item) => {
              const usagePct = Math.round((item.aiCallsUsed / item.aiCallsLimit) * 100)
              return (
                <div key={item.id} className="rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{item.studioName}</p>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{usagePct}% used</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.aiCallsUsed.toLocaleString()} / {item.aiCallsLimit.toLocaleString()} calls
                  </p>
                </div>
              )
            })}
            {highUsageCustomers.length === 0 && (
              <div className="rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
                No accounts above 80% usage.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Upcoming Renewals</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Next studios to bill in this cycle</p>
          <div className="mt-3 space-y-2">
            {upcomingRenewals.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.studioName}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(item.nextBillingDate)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.plan} • {formatMoney(item.monthlyAmount)} • {item.paymentMethod}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
