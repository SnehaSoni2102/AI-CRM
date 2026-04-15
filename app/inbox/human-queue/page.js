'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRightLeft, CheckCircle2, Clock3, UserCheck, Users } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, formatDateTime, getInitials } from '@/lib/utils'
import GlobalLoader from '@/components/shared/GlobalLoader'

const HUMAN_QUEUE_TABS = [
  { id: 'escalations', label: 'Escalations' },
  { id: 'unassigned', label: 'Unassigned' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'transferred', label: 'Transferred' },
  { id: 'resolved', label: 'Resolved' },
]

const INITIAL_AGENTS = [
  { id: 'agent-1', name: 'Sarah Smith', activeChats: 1, maxConcurrent: 3, availability: 'available' },
  { id: 'agent-2', name: 'David Lee', activeChats: 2, maxConcurrent: 3, availability: 'available' },
  { id: 'agent-3', name: 'Maya Patel', activeChats: 3, maxConcurrent: 3, availability: 'busy' },
  { id: 'agent-4', name: 'Chris Morgan', activeChats: 0, maxConcurrent: 2, availability: 'available' },
]

const INITIAL_ESCALATIONS = [
  {
    id: 'esc-1001',
    leadName: 'Liam Jones',
    phone: '+1 (512) 123-4567',
    channel: 'Voice',
    intent: 'Requested to speak to a human',
    priority: 'High',
    waitMinutes: 12,
    status: 'waiting',
    assignedAgentId: null,
    transferCount: 0,
    escalatedBy: 'AI Voice Agent',
    createdAt: '2026-04-15T14:08:00.000Z',
    lastMessage: 'I need to talk to a real person now.',
  },
  {
    id: 'esc-1002',
    leadName: 'Ava Johnson',
    phone: '+1 (305) 555-0138',
    channel: 'SMS',
    intent: 'Billing confusion',
    priority: 'Medium',
    waitMinutes: 4,
    status: 'waiting',
    assignedAgentId: null,
    transferCount: 0,
    escalatedBy: 'AI Chat Agent',
    createdAt: '2026-04-15T14:16:00.000Z',
    lastMessage: 'Can a human explain this monthly charge?',
  },
  {
    id: 'esc-1003',
    leadName: 'Noah Brown',
    phone: '+1 (786) 555-0101',
    channel: 'WhatsApp',
    intent: 'Wants class schedule options',
    priority: 'Low',
    waitMinutes: 18,
    status: 'assigned',
    assignedAgentId: 'agent-2',
    transferCount: 1,
    escalatedBy: 'AI Chat Agent',
    createdAt: '2026-04-15T13:54:00.000Z',
    lastMessage: 'Can your team call me after 6 PM?',
  },
  {
    id: 'esc-1004',
    leadName: 'Emma Garcia',
    phone: '+1 (214) 555-0194',
    channel: 'Voice',
    intent: 'Needs urgent trial booking',
    priority: 'High',
    waitMinutes: 2,
    status: 'assigned',
    assignedAgentId: 'agent-1',
    transferCount: 0,
    escalatedBy: 'AI Voice Agent',
    createdAt: '2026-04-15T14:18:00.000Z',
    lastMessage: 'Please book me for tonight if possible.',
  },
  {
    id: 'esc-1005',
    leadName: 'Sophia Wilson',
    phone: '+1 (404) 555-0167',
    channel: 'SMS',
    intent: 'Complaint follow-up',
    priority: 'Medium',
    waitMinutes: 1,
    status: 'resolved',
    assignedAgentId: 'agent-4',
    transferCount: 0,
    escalatedBy: 'AI Chat Agent',
    createdAt: '2026-04-15T14:05:00.000Z',
    resolvedAt: '2026-04-15T14:17:00.000Z',
    lastMessage: 'Thanks, this is sorted now.',
  },
]

function availabilityFromLoad(activeChats, maxConcurrent) {
  return activeChats < maxConcurrent ? 'available' : 'busy'
}

function priorityClasses(priority) {
  if (priority === 'High') return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
  if (priority === 'Medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
}

function waitTimeClasses(minutes) {
  if (minutes >= 15) return 'text-red-600 dark:text-red-400'
  if (minutes >= 8) return 'text-amber-600 dark:text-amber-400'
  return 'text-emerald-600 dark:text-emerald-400'
}

function HumanQueuePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams?.get('tab') || 'escalations'
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS)
  const [selectedEscalationId, setSelectedEscalationId] = useState(INITIAL_ESCALATIONS[0]?.id || null)

  useEffect(() => {
    setEscalations((currentEscalations) => {
      const hasUnassigned = currentEscalations.some((item) => item.status !== 'resolved' && !item.assignedAgentId)
      if (!hasUnassigned) return currentEscalations

      const nextAgents = agents.map((agent) => ({ ...agent }))
      let hasAssignments = false

      const nextEscalations = currentEscalations.map((item) => {
        if (item.status === 'resolved' || item.assignedAgentId) return item

        const candidate = nextAgents
          .filter((agent) => agent.activeChats < agent.maxConcurrent)
          .sort((a, b) => a.activeChats - b.activeChats)[0]

        if (!candidate) return item

        hasAssignments = true
        candidate.activeChats += 1
        candidate.availability = availabilityFromLoad(candidate.activeChats, candidate.maxConcurrent)

        return {
          ...item,
          assignedAgentId: candidate.id,
          status: 'assigned',
          assignedAt: new Date().toISOString(),
        }
      })

      if (hasAssignments) setAgents(nextAgents)
      return hasAssignments ? nextEscalations : currentEscalations
    })
  }, [agents])

  const tabCounts = useMemo(() => ({
    escalations: escalations.length,
    unassigned: escalations.filter((item) => item.status !== 'resolved' && !item.assignedAgentId).length,
    assigned: escalations.filter((item) => item.status !== 'resolved' && item.assignedAgentId && item.transferCount === 0).length,
    transferred: escalations.filter((item) => item.status !== 'resolved' && item.transferCount > 0).length,
    resolved: escalations.filter((item) => item.status === 'resolved').length,
  }), [escalations])

  const filteredEscalations = useMemo(() => {
    if (activeTab === 'unassigned') return escalations.filter((item) => item.status !== 'resolved' && !item.assignedAgentId)
    if (activeTab === 'assigned') return escalations.filter((item) => item.status !== 'resolved' && item.assignedAgentId && item.transferCount === 0)
    if (activeTab === 'transferred') return escalations.filter((item) => item.status !== 'resolved' && item.transferCount > 0)
    if (activeTab === 'resolved') return escalations.filter((item) => item.status === 'resolved')
    return escalations
  }, [activeTab, escalations])

  const selectedEscalation = useMemo(() => {
    const fromVisibleList = filteredEscalations.find((item) => item.id === selectedEscalationId)
    if (fromVisibleList) return fromVisibleList
    return filteredEscalations[0] || null
  }, [filteredEscalations, selectedEscalationId])

  const agentById = useMemo(() => new Map(agents.map((agent) => [agent.id, agent])), [agents])

  const transferCandidates = useMemo(() => {
    if (!selectedEscalation?.assignedAgentId) return []
    return agents.filter((agent) => agent.id !== selectedEscalation.assignedAgentId && agent.activeChats < agent.maxConcurrent)
  }, [agents, selectedEscalation])

  const updateAgentLoads = (fromAgentId, toAgentId) => {
    setAgents((currentAgents) =>
      currentAgents.map((agent) => {
        let nextActiveChats = agent.activeChats
        if (fromAgentId && agent.id === fromAgentId) nextActiveChats = Math.max(0, nextActiveChats - 1)
        if (toAgentId && agent.id === toAgentId) nextActiveChats += 1
        return {
          ...agent,
          activeChats: nextActiveChats,
          availability: availabilityFromLoad(nextActiveChats, agent.maxConcurrent),
        }
      })
    )
  }

  const handleTransfer = (escalationId, toAgentId) => {
    const escalation = escalations.find((item) => item.id === escalationId)
    if (!escalation || !escalation.assignedAgentId || !toAgentId || escalation.assignedAgentId === toAgentId) return

    updateAgentLoads(escalation.assignedAgentId, toAgentId)
    setEscalations((currentEscalations) =>
      currentEscalations.map((item) =>
        item.id === escalationId
          ? {
              ...item,
              assignedAgentId: toAgentId,
              transferCount: (item.transferCount || 0) + 1,
              transferredAt: new Date().toISOString(),
            }
          : item
      )
    )
  }

  const handleResolve = (escalationId) => {
    const escalation = escalations.find((item) => item.id === escalationId)
    if (!escalation || escalation.status === 'resolved') return
    if (escalation.assignedAgentId) updateAgentLoads(escalation.assignedAgentId, null)

    setEscalations((currentEscalations) =>
      currentEscalations.map((item) =>
        item.id === escalationId
          ? { ...item, status: 'resolved', resolvedAt: new Date().toISOString() }
          : item
      )
    )
  }

  const availableAgents = agents.filter((agent) => agent.availability === 'available').length

  return (
    <MainLayout title="Human Queue" subtitle="Escalations from AI agents for human handling">
      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 rounded-full bg-muted p-1 w-fit">
            {HUMAN_QUEUE_TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const tabCount = tabCounts[tab.id] || 0
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams?.toString() || '')
                    params.set('tab', tab.id)
                    router.push(`/inbox/human-queue?${params.toString()}`)
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 h-9 text-sm transition-all',
                    isActive
                      ? 'bg-background text-[var(--studio-primary)] shadow-sm font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span>{tab.label}</span>
                  <span className={cn('inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs', isActive ? 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)]' : 'bg-background text-muted-foreground')}>
                    {tabCount}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Escalation Queue</h2>
                <p className="text-xs text-muted-foreground">Automatically assigned to free human agents</p>
              </div>
              <div className="text-xs text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredEscalations.length}</span> requests
              </div>
            </div>

            <div className="space-y-2">
              {filteredEscalations.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-background py-10 text-center text-sm text-muted-foreground">
                  No queue items in this tab.
                </div>
              ) : (
                filteredEscalations.map((item) => {
                  const assignedAgent = item.assignedAgentId ? agentById.get(item.assignedAgentId) : null
                  const isSelected = selectedEscalation?.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedEscalationId(item.id)}
                      className={cn(
                        'w-full rounded-xl border p-3 text-left transition-colors',
                        isSelected
                          ? 'border-[var(--studio-primary)] bg-[var(--studio-primary-light)]/50'
                          : 'border-border bg-background hover:bg-muted/40'
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[color:var(--studio-primary)] text-white font-semibold">
                              {getInitials(item.leadName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.leadName}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.intent}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn('text-sm font-semibold', waitTimeClasses(item.waitMinutes))}>{item.waitMinutes}m</p>
                          <p className="text-xs text-muted-foreground">waiting</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{item.channel}</span>
                        <span className={cn('inline-flex items-center rounded-full px-2.5 py-1', priorityClasses(item.priority))}>{item.priority}</span>
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                          {assignedAgent ? `Assigned: ${assignedAgent.name}` : 'Unassigned'}
                        </span>
                        {item.transferCount > 0 && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                            Transfers: {item.transferCount}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">Human Agents</h3>
                <span className="text-xs text-muted-foreground">{availableAgents}/{agents.length} available</span>
              </div>
              <div className="mt-3 space-y-2">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-2.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.activeChats}/{agent.maxConcurrent} active chats</p>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                        agent.availability === 'available'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'
                      )}
                    >
                      {agent.availability}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Selected Escalation</h3>
                  <p className="text-xs text-muted-foreground">Transfer between humans or close this request</p>
                </div>
                {selectedEscalation?.status === 'resolved' && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    Resolved
                  </span>
                )}
              </div>

              {!selectedEscalation ? (
                <div className="mt-4 rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
                  Pick a queue item to manage it.
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-border bg-background p-3">
                    <p className="text-sm font-medium text-foreground">{selectedEscalation.leadName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedEscalation.phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Escalated by {selectedEscalation.escalatedBy} at {formatDateTime(selectedEscalation.createdAt)}
                    </p>
                    <p className="text-sm text-foreground mt-2">&quot;{selectedEscalation.lastMessage}&quot;</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                      <Clock3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Wait time:{' '}
                        <span className={cn('font-semibold', waitTimeClasses(selectedEscalation.waitMinutes))}>
                          {selectedEscalation.waitMinutes} minutes
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Current owner:{' '}
                        <span className="font-semibold text-foreground">
                          {selectedEscalation.assignedAgentId
                            ? (agentById.get(selectedEscalation.assignedAgentId)?.name || 'Unknown')
                            : 'Unassigned'}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                      Transfer to another available human
                    </label>
                    <select
                      defaultValue=""
                      disabled={!selectedEscalation.assignedAgentId || selectedEscalation.status === 'resolved'}
                      onChange={(event) => {
                        const targetAgent = event.target.value
                        if (targetAgent) {
                          handleTransfer(selectedEscalation.id, targetAgent)
                          event.target.value = ''
                        }
                      }}
                      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none disabled:opacity-60"
                    >
                      <option value="">Select agent</option>
                      {transferCandidates.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name} ({agent.activeChats}/{agent.maxConcurrent})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    disabled={selectedEscalation.status === 'resolved'}
                    onClick={() => handleResolve(selectedEscalation.id)}
                    className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-lg bg-[var(--studio-primary)] text-white text-sm font-medium hover:brightness-95 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-muted-foreground" />
                Queue Rules
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li>- New escalations are auto-assigned to the least-loaded free agent.</li>
                <li>- Transfers are only offered to agents with free capacity.</li>
                <li>- Resolving a queue item instantly frees agent capacity.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default function HumanQueuePage() {
  return (
    <Suspense
      fallback={
        <MainLayout title="Human Queue" subtitle="Escalations from AI agents for human handling">
          <div className="flex items-center justify-center py-20">
            <GlobalLoader variant="inline" size="md" text="Loading human queue…" />
          </div>
        </MainLayout>
      }
    >
      <HumanQueuePageContent />
    </Suspense>
  )
}
