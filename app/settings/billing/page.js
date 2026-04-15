'use client'

import { useMemo, useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { cn } from '@/lib/utils'
import OverviewTab from './components/OverviewTab'
import CustomersTab from './components/CustomersTab'
import InvoicesTab from './components/InvoicesTab'
import PlansTab from './components/PlansTab'
import { INITIAL_CUSTOMERS, INVOICES, PLAN_CATALOG } from './components/billingData'

const BILLING_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'customers', label: 'Customers' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'plans', label: 'Plans' },
]

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const mrr = useMemo(
    () => INITIAL_CUSTOMERS.filter((item) => item.status === 'Active').reduce((sum, item) => sum + item.monthlyAmount, 0),
    []
  )
  const activeCustomers = useMemo(
    () => INITIAL_CUSTOMERS.filter((item) => item.status === 'Active').length,
    []
  )
  const pastDueCustomers = useMemo(
    () => INITIAL_CUSTOMERS.filter((item) => item.status === 'Past Due').length,
    []
  )
  const aiUsageTotal = useMemo(
    () => INITIAL_CUSTOMERS.reduce((sum, item) => sum + item.aiCallsUsed, 0),
    []
  )
  const highUsageCustomers = useMemo(
    () =>
      INITIAL_CUSTOMERS.filter((item) => item.aiCallsUsed / item.aiCallsLimit >= 0.8)
        .sort((a, b) => b.aiCallsUsed / b.aiCallsLimit - a.aiCallsUsed / a.aiCallsLimit),
    []
  )
  const upcomingRenewals = useMemo(
    () =>
      [...INITIAL_CUSTOMERS]
        .filter((item) => item.status !== 'Past Due')
        .sort((a, b) => new Date(a.nextBillingDate) - new Date(b.nextBillingDate))
        .slice(0, 3),
    []
  )

  return (
    <MainLayout title="Billing" subtitle="Manage studio subscriptions, plans, invoices, and SaaS usage">
      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 rounded-full bg-muted p-1 w-fit">
            {BILLING_TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex h-9 items-center rounded-full px-4 text-sm transition-all',
                    isActive
                      ? 'bg-background text-[var(--studio-primary)] shadow-sm font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </section>

        {activeTab === 'overview' && (
          <>
            <OverviewTab
              mrr={mrr}
              activeCustomers={activeCustomers}
              pastDueCustomers={pastDueCustomers}
              aiUsageTotal={aiUsageTotal}
              highUsageCustomers={highUsageCustomers}
              upcomingRenewals={upcomingRenewals}
            />
            <InvoicesTab invoices={INVOICES} />
            <PlansTab plans={PLAN_CATALOG} />
          </>
        )}

        {activeTab === 'customers' && <CustomersTab customers={INITIAL_CUSTOMERS} />}
        {activeTab === 'invoices' && <InvoicesTab invoices={INVOICES} />}
        {activeTab === 'plans' && <PlansTab plans={PLAN_CATALOG} />}
      </div>
    </MainLayout>
  )
}
