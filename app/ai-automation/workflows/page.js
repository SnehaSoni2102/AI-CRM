'use client'

import { Suspense, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, Workflow, Mail, Phone, MessageSquare, Clock3, Search, Filter, FolderOpen } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import GlobalLoader from '@/components/shared/GlobalLoader'

const workflowData = [
  {
    id: 'wf-1',
    name: 'New Lead Nurture',
    trigger: 'Lead Created',
    steps: 5,
    totalRuns: 28,
    successRate: 75,
    lastRun: 'Jan 27, 2025',
    status: 'active',
  },
  {
    id: 'wf-2',
    name: 'Follow-Up Call',
    trigger: '24 Hours After Lead Creation',
    steps: 3,
    totalRuns: 15,
    successRate: 60,
    lastRun: 'Feb 1, 2025',
    status: 'active',
  },
  {
    id: 'wf-3',
    name: 'Email Campaign',
    trigger: '5 Days After Lead Creation',
    steps: 4,
    totalRuns: 30,
    successRate: 80,
    lastRun: 'Jan 30, 2025',
    status: 'active',
  },
  {
    id: 'wf-4',
    name: 'Survey Follow-Up',
    trigger: 'After First Interaction',
    steps: 2,
    totalRuns: 20,
    successRate: 90,
    lastRun: 'Jan 29, 2025',
    status: 'active',
  },
  {
    id: 'wf-5',
    name: 'Product Demo',
    trigger: '1 Week After Initial Contact',
    steps: 4,
    totalRuns: 10,
    successRate: 60,
    lastRun: 'Jan 28, 2025',
    status: 'active',
  },
  {
    id: 'wf-6',
    name: 'Re-engagement Campaign',
    trigger: 'Paused workflow',
    steps: 0,
    totalRuns: 0,
    successRate: 0,
    lastRun: '-',
    status: 'paused',
  },
]

const stepTypes = [
  { id: 'call', name: 'Call', icon: Phone, color: 'bg-muted-foreground' },
  { id: 'email', name: 'Email', icon: Mail, color: 'bg-muted-foreground' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'bg-muted-foreground' },
]

const wizardSteps = [
  { id: 1, title: 'Sequence Details', subtitle: 'Provide basic information about your outreach sequence' },
  { id: 2, title: 'Select Contacts', subtitle: 'Choose the contacts you want to include in this sequence' },
  { id: 3, title: 'Create Sequence Steps', subtitle: 'Set up actions and timing for your outreach sequence' },
]

const sampleContacts = [
  { id: 'c1', name: 'Arya Sharma', email: 'arya.sharma@crmtest.com', group: 'US', subtitle: 'Kiran Patel' },
  { id: 'c2', name: 'Priya Verma', email: 'priya.verma@crmtest.com', group: 'US', subtitle: 'Arjun Reddy' },
  { id: 'c3', name: 'Divya Kapoor', email: 'divya.kapoor@crmtest.com', group: 'EMEA', subtitle: 'Rohan Singh' },
  { id: 'c4', name: 'Vikram Iyer', email: 'vikram.iyer@crmtest.com', group: 'APAC', subtitle: 'Sakshi Mehra' },
  { id: 'c5', name: 'Amit Verma', email: 'amit.verma@crmtest.com', group: 'US', subtitle: 'Neha Gupta' },
  { id: 'c6', name: 'Rohan Singh', email: 'rohan.singh@crmtest.com', group: 'EMEA', subtitle: 'Amit Verma' },
]

function Stepper({ currentStep }) {
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

function WorkflowCard({ workflow }) {
  const isPaused = workflow.status === 'paused'

  return (
    <article
      className="h-[286px] w-full rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="inline-flex h-6 items-center rounded-bl-md rounded-tr-md bg-primary/10 px-2.5 text-[10px] font-medium text-primary">
            {isPaused ? 'Paused' : 'Active'}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h3 className="text-[20px] font-semibold leading-7 text-foreground">{workflow.name}</h3>
          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Trigger: {workflow.trigger}
          {!isPaused && <> • {workflow.steps} steps</>}
        </p>

        {!isPaused && (
          <div className="mt-3 space-y-1 text-[12px] text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Total Runs:</span>
              <span className="font-medium text-foreground">{workflow.totalRuns}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Success Rate:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">{workflow.successRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Run:</span>
              <span className="font-medium text-foreground">{workflow.lastRun}</span>
            </div>
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-background text-[12px] font-medium text-muted-foreground hover:bg-muted/50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#EF4444] text-[12px] font-medium text-white hover:bg-[#DC2626]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {isPaused ? 'Resume' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  )
}

function WorkflowsPageInner() {
  const [isBuilding, setIsBuilding] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [sequenceName, setSequenceName] = useState('')
  const [description, setDescription] = useState('')
  const [contactSearch, setContactSearch] = useState('')
  const [selectedContacts, setSelectedContacts] = useState(['c1', 'c2'])
  const [selectedStepType, setSelectedStepType] = useState('call')
  const [workflowSteps, setWorkflowSteps] = useState([])
  const searchParams = useSearchParams()
  const activeTab = searchParams?.get('view') || 'active'
  const filteredWorkflows = workflowData.filter((w) => {
    if (activeTab === 'analytics') return false
    if (activeTab === 'drafts') return false
    return w.status === activeTab
  })

  const addStep = (type) => {
    const stepType = stepTypes.find((s) => s.id === type) || stepTypes[0]
    const newStep = {
      id: Date.now().toString(),
      type: stepType.id,
      action: stepType.name,
      schedule: 'MULTIDITY',
      condition: null,
    }
    setWorkflowSteps([...workflowSteps, newStep])
  }

  const removeStep = (id) => {
    setWorkflowSteps(workflowSteps.filter((s) => s.id !== id))
  }

  const updateStepType = (id, type) => {
    const stepType = stepTypes.find((s) => s.id === type)
    if (!stepType) return
    setWorkflowSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? {
              ...step,
              type,
              action: stepType.name,
            }
          : step
      )
    )
  }

  const filteredContacts = useMemo(() => {
    const q = contactSearch.trim().toLowerCase()
    if (!q) return sampleContacts
    return sampleContacts.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }, [contactSearch])

  const toggleContact = (id) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <MainLayout title="AI & Automation" subtitle="Automate your marketing and follow-ups">
      {!isBuilding ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-foreground">Automate your marketing and follow-ups</p>
            <button
              type="button"
              onClick={() => setIsBuilding(true)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--studio-primary)] px-4 text-[13px] font-medium text-white hover:brightness-95"
            >
              <Plus className="h-4 w-4" />
              Create Workflow
            </button>
          </div>

          {activeTab === 'drafts' && (
            <div className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              No draft workflows
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              Analytics view coming soon.
            </div>
          )}

          {activeTab === 'active' && (
            <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </section>
          )}

          {activeTab === 'paused' && (
            <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </section>
          )}
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Stepper currentStep={currentStep} />
            <div className="space-y-1 xl:text-right">
              <h2 className="text-[20px] font-bold text-foreground">{wizardSteps[currentStep - 1]?.title}</h2>
              <p className="text-[14px] font-medium text-muted-foreground">{wizardSteps[currentStep - 1]?.subtitle}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-[20px] font-bold text-foreground">Basic Information</h3>
                  <p className="text-[16px] text-muted-foreground">Enter the name and description for your sequence</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[16px] text-foreground">Sequence Name *</label>
                    <input
                      value={sequenceName}
                      onChange={(e) => setSequenceName(e.target.value)}
                      placeholder="Enter sequence name"
                      className="h-12 w-full rounded-lg border border-border bg-background px-3 text-[16px] text-foreground outline-none focus:border-[var(--studio-primary)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] text-foreground">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter sequence description"
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[16px] text-foreground outline-none focus:border-[var(--studio-primary)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-[20px] font-bold text-foreground">Contact Selection*</h3>
                  <p className="text-[16px] text-muted-foreground">Choose which contacts to include in this sequence</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      placeholder="Search contacts by name or email..."
                      className="h-10 w-full bg-transparent text-[16px] text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-[14px] font-medium text-muted-foreground">
                    Filters
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary/10 px-4 text-[14px] font-medium text-foreground">
                    <FolderOpen className="h-4 w-4" />
                    Select by Groups
                  </button>
                </div>

                <div className="space-y-3 rounded-lg border border-border bg-card p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedContacts(filteredContacts.map((c) => c.id))}
                        className="inline-flex h-8 items-center rounded-md border border-border px-3 text-[12px] font-medium text-foreground"
                      >
                        Select Page
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedContacts([])}
                        className="inline-flex h-8 items-center rounded-md border border-destructive px-3 text-[12px] font-medium text-destructive"
                      >
                        Clear All
                      </button>
                    </div>
                    <p className="text-[12px] text-muted-foreground">{selectedContacts.length} / 7000 contacts selected</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                    {filteredContacts.map((contact) => {
                      const checked = selectedContacts.includes(contact.id)
                      return (
                        <label
                          key={contact.id}
                          className={cn(
                            'flex cursor-pointer items-start gap-2 rounded-md border p-2 transition-colors',
                            checked ? 'border-[var(--studio-primary)] bg-primary/10' : 'border-border bg-card hover:bg-muted'
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleContact(contact.id)}
                            className="mt-1 h-3.5 w-3.5 rounded border-border"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12px] font-semibold text-foreground">{contact.name}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{contact.subtitle}</p>
                            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{contact.email}</p>
                            <div className="mt-1 inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] text-foreground">
                              {contact.group}
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="inline-flex h-8 items-center rounded-md border border-border px-2 text-[12px] text-foreground">
                      <span className="mr-1">Page</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground">Sequence Steps*</h3>
                    <p className="text-[12px] text-muted-foreground">Define the steps in your outreach sequence</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedStepType}
                      onChange={(e) => setSelectedStepType(e.target.value)}
                      className="h-8 rounded-md border border-border bg-background px-2 text-[12px] font-medium text-foreground"
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => addStep(selectedStepType)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-[12px] font-medium text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Step
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {workflowSteps.map((step, index) => {
                    const stepType = stepTypes.find((s) => s.id === step.type)
                    const Icon = stepType?.icon || Workflow
                    const stepName = step.type === 'call' ? 'Call' : step.type === 'sms' ? 'SMS' : 'Email'

                    return (
                      <div key={step.id} className="rounded-md border border-border bg-card p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-[12px] font-semibold text-foreground">Step {index + 1} - {stepName}</p>
                              <p className="text-[10px] text-muted-foreground">Set sequence details and contacts</p>
                            </div>
                          </div>
                          <button onClick={() => removeStep(step.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                          <div>
                            <p className="mb-1 text-[10px] text-muted-foreground">Communication Type</p>
                            <select
                              value={step.type}
                              onChange={(e) => updateStepType(step.id, e.target.value)}
                              className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground"
                            >
                              <option value="call">Call</option>
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                            </select>
                          </div>
                          <div>
                            <p className="mb-1 text-[10px] text-muted-foreground">Script Template*</p>
                            <select className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground">
                              <option>Select Script</option>
                            </select>
                          </div>
                          <div>
                            <p className="mb-1 text-[10px] text-muted-foreground">Schedule Date*</p>
                            <select className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground">
                              <option>MULTIDITY</option>
                            </select>
                          </div>
                          <div>
                            <p className="mb-1 text-[10px] text-muted-foreground">Target Stage*</p>
                            <select className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground">
                              <option>All Contacts</option>
                            </select>
                          </div>
                        </div>

                        {step.type === 'call' && (
                          <div className="mt-3 space-y-2 border-t border-border pt-2">
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                              <div>
                                <p className="mb-1 text-[10px] font-semibold text-foreground">Call Configuration</p>
                                <p className="text-[10px] text-muted-foreground">Make AI-powered phone calls</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="mb-1 text-[10px] text-muted-foreground">AI Persona*</p>
                                  <select className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground">
                                    <option>Cheeni</option>
                                  </select>
                                </div>
                                <div>
                                  <p className="mb-1 text-[10px] text-muted-foreground">Background Sound</p>
                                  <select className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground">
                                    <option>Cafe Environment</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                              <div>
                                <p className="mb-1 text-[10px] text-muted-foreground">First Message</p>
                                <input
                                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground"
                                  defaultValue="Hello!"
                                />
                              </div>
                              <div>
                                <p className="mb-1 text-[10px] text-muted-foreground">End Call Message</p>
                                <input
                                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground"
                                  defaultValue="Goodbye!"
                                />
                              </div>
                              <div>
                                <p className="mb-1 text-[10px] text-muted-foreground">Voicemail Message</p>
                                <input
                                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-[11px] text-foreground"
                                  defaultValue="Hey, I tried calling you."
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {workflowSteps.length === 0 && (
                    <div className="rounded-md border border-border bg-muted/40 py-8 text-center text-[14px] text-muted-foreground">
                      No steps added yet. Click "Add Step" to get started.
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <p className="text-[16px] text-muted-foreground">Step {currentStep} of 3</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => (currentStep === 1 ? setIsBuilding(false) : setCurrentStep((s) => s - 1))}
                  className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-[16px] font-medium text-foreground"
                >
                  {currentStep === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep < 3) setCurrentStep((s) => s + 1)
                    else setIsBuilding(false)
                  }}
                  className="inline-flex h-11 items-center rounded-lg bg-[var(--studio-primary)] px-5 text-[16px] font-medium text-white"
                >
                  {currentStep === 1 && 'Next: Select Contacts'}
                  {currentStep === 2 && 'Next: Create Steps'}
                  {currentStep === 3 && 'Create Sequence'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default function WorkflowsPage() {
  return (
    <Suspense
      fallback={
        <MainLayout title="AI & Automation" subtitle="Automate your marketing and follow-ups">
          <div className="flex items-center justify-center py-20">
            <GlobalLoader variant="inline" size="md" text="Loading workflows…" />
          </div>
        </MainLayout>
      }
    >
      <WorkflowsPageInner />
    </Suspense>
  )
}

