import { Receipt } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate, formatMoney, statusClass } from './billingData'

export default function InvoicesTab({ invoices }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Receipt className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Recent Invoices</h2>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 font-medium">Invoice</th>
              <th className="text-left py-2 font-medium">Customer</th>
              <th className="text-left py-2 font-medium">Amount</th>
              <th className="text-left py-2 font-medium">Due Date</th>
              <th className="text-left py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border/60">
                <td className="py-3 font-medium text-foreground">{invoice.id}</td>
                <td className="py-3 text-muted-foreground">{invoice.customer}</td>
                <td className="py-3 text-foreground">{formatMoney(invoice.amount)}</td>
                <td className="py-3 text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                <td className="py-3">
                  <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', statusClass(invoice.status))}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
