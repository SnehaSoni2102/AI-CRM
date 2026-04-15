'use client'

import { useMemo, useState } from 'react'
import { ArrowRightLeft, CheckCircle2, Database, RefreshCw } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { cn } from '@/lib/utils'

const INITIAL_INTEGRATIONS = [
  {
    id: 'meta',
    name: 'Meta Lead Ads',
    category: 'Social',
    description: 'Sync lead forms from Facebook and Instagram directly into your CRM.',
    connected: false,
    recordsImported: 0,
    lastSyncAt: null,
    objects: ['Leads', 'Campaign', 'Ad Set', 'Ad'],
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRM',
    description: 'Import contacts and leads from HubSpot and keep lifecycle stages aligned.',
    connected: false,
    recordsImported: 0,
    lastSyncAt: null,
    objects: ['Leads', 'Contacts', 'Owners', 'Deal Source'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    description: 'Bring leads from Salesforce and map fields into your studio pipeline.',
    connected: false,
    recordsImported: 0,
    lastSyncAt: null,
    objects: ['Leads', 'Campaign Members', 'Owners'],
  },
]

function formatLastSync(value) {
  if (!value) return 'Never synced'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function IntegrationCard({ integration, onToggleConnection, onSyncNow }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
            <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {integration.category}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{integration.description}</p>
        </div>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
            integration.connected
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'
          )}
        >
          {integration.connected ? 'Connected' : 'Not Connected'}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-border bg-background px-2.5 py-2">
          <p className="text-muted-foreground">Objects</p>
          <p className="mt-0.5 text-foreground">{integration.objects.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-background px-2.5 py-2">
          <p className="text-muted-foreground">Imported</p>
          <p className="mt-0.5 text-foreground">{integration.recordsImported}</p>
        </div>
        <div className="col-span-2 rounded-lg border border-border bg-background px-2.5 py-2">
          <p className="text-muted-foreground">Last sync</p>
          <p className="mt-0.5 text-foreground">{formatLastSync(integration.lastSyncAt)}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleConnection(integration.id)}
          className={cn(
            'inline-flex h-9 items-center rounded-lg px-3 text-xs font-medium',
            integration.connected
              ? 'border border-border bg-background text-foreground hover:bg-muted/60'
              : 'bg-[var(--studio-primary)] text-white hover:brightness-95'
          )}
        >
          {integration.connected ? 'Disconnect' : 'Connect via API'}
        </button>
        <button
          type="button"
          onClick={() => onSyncNow(integration.id)}
          disabled={!integration.connected}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted/60 disabled:opacity-60"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Sync leads now
        </button>
      </div>
    </article>
  )
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS)
  const [autoImportEnabled, setAutoImportEnabled] = useState(true)
  const [assignRule, setAssignRule] = useState('round_robin')

  const connectedCount = useMemo(() => integrations.filter((item) => item.connected).length, [integrations])
  const importedCount = useMemo(
    () => integrations.reduce((total, item) => total + item.recordsImported, 0),
    [integrations]
  )

  const onToggleConnection = (id) => {
    setIntegrations((current) =>
      current.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          connected: !item.connected,
          lastSyncAt: item.connected ? item.lastSyncAt : new Date().toISOString(),
        }
      })
    )
  }

  const onSyncNow = (id) => {
    setIntegrations((current) =>
      current.map((item) => {
        if (item.id !== id || !item.connected) return item
        const importedNow = Math.floor(Math.random() * 25) + 8
        return {
          ...item,
          recordsImported: item.recordsImported + importedNow,
          lastSyncAt: new Date().toISOString(),
        }
      })
    )
  }

  return (
    <MainLayout title="Integrations" subtitle="Connect external platforms and import leads into your CRM">
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Connected Platforms</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{connectedCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Imported Leads</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{importedCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Auto Import</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{autoImportEnabled ? 'Enabled' : 'Disabled'}</p>
              <button
                type="button"
                onClick={() => setAutoImportEnabled((prev) => !prev)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  autoImportEnabled ? 'bg-[var(--studio-primary)]' : 'bg-muted-foreground/40'
                )}
                aria-label="Toggle auto import"
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                    autoImportEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Data Flow</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Connect APIs, pull lead records from external tools, map fields, and route them into your CRM pipeline.
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center text-xs">
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-center text-muted-foreground">
              Meta / HubSpot
            </div>
            <div className="text-center text-muted-foreground">→</div>
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-center text-muted-foreground">
              Field Mapping
            </div>
            <div className="text-center text-muted-foreground">→</div>
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-center text-muted-foreground">
              CRM Leads
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggleConnection={onToggleConnection}
              onSyncNow={onSyncNow}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Lead Import Rules</h2>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Assign imported leads to</p>
              <select
                value={assignRule}
                onChange={(e) => setAssignRule(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none"
              >
                <option value="round_robin">Round robin agents</option>
                <option value="source_owner">External source owner</option>
                <option value="unassigned">Keep unassigned</option>
              </select>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Deduplication Strategy</p>
              <p className="mt-2 text-sm text-foreground">Match by email, then phone number before creating a new lead.</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Once connected, lead imports can be scheduled every 15 minutes or run manually.
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
