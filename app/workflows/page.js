'use client'

import { useState } from 'react'
import { Workflow, Plus, Play, Pause, Copy, Trash2, Mail, Phone, MessageSquare, Clock, BarChart3 } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { workflows } from '@/data/dummyData'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const stepTypes = [
  { id: 'email', name: 'Send Email', icon: Mail, color: 'bg-slate-600' },
  { id: 'sms', name: 'Send SMS', icon: MessageSquare, color: 'bg-slate-600' },
  { id: 'call', name: 'Make Call', icon: Phone, color: 'bg-slate-600' },
  { id: 'wait', name: 'Wait/Delay', icon: Clock, color: 'bg-slate-600' },
]

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [isBuilding, setIsBuilding] = useState(false)
  const [workflowSteps, setWorkflowSteps] = useState([
    { id: '1', type: 'email', action: 'Send Welcome Email', schedule: 'Immediately', condition: null },
    { id: '2', type: 'wait', action: 'Wait 2 days', schedule: '2 days', condition: null },
    { id: '3', type: 'sms', action: 'Send Follow-up SMS', schedule: 'After step 2', condition: 'If email not opened' },
  ])

  const addStep = (type) => {
    const stepType = stepTypes.find((s) => s.id === type)
    const newStep = {
      id: Date.now().toString(),
      type,
      action: stepType.name,
      schedule: 'After previous step',
      condition: null,
    }
    setWorkflowSteps([...workflowSteps, newStep])
  }

  const removeStep = (id) => {
    setWorkflowSteps(workflowSteps.filter((s) => s.id !== id))
  }

  const filteredWorkflows = workflows.filter((w) => {
    if (activeTab === 'active') return w.status === 'Active'
    if (activeTab === 'paused') return w.status === 'Paused'
    if (activeTab === 'drafts') return w.status === 'Draft'
    return true
  })

  return (
    <MainLayout title="Workflows" subtitle="Automate your marketing and follow-ups">
      {!isBuilding ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <TabsList className="w-full sm:w-auto overflow-x-auto">
              <TabsTrigger value="active" className="text-xs sm:text-sm whitespace-nowrap">Active ({workflows.filter((w) => w.status === 'Active').length})</TabsTrigger>
              <TabsTrigger value="paused" className="text-xs sm:text-sm whitespace-nowrap">Paused ({workflows.filter((w) => w.status === 'Paused').length})</TabsTrigger>
              <TabsTrigger value="drafts" className="text-xs sm:text-sm whitespace-nowrap">Drafts (0)</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm whitespace-nowrap">Analytics</TabsTrigger>
            </TabsList>
            <Button variant="gradient" onClick={() => setIsBuilding(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>

          <TabsContent value="active" className="space-y-4">
            {filteredWorkflows.map((workflow, index) => (
              <Card
                key={workflow.id}
                className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full min-w-0">
                      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Workflow className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-sm sm:text-base text-slate-900">{workflow.name}</h3>
                          <Badge variant={workflow.status === 'Active' ? 'success' : 'warning'} className="text-xs">
                            {workflow.status}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mb-3">
                          Trigger: {workflow.trigger} • {workflow.steps} steps
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                          <div>
                            <span className="text-slate-500">Total Runs:</span>
                            <span className="font-medium ml-2 text-slate-900">{workflow.totalRuns}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Success Rate:</span>
                            <span className="font-medium ml-2 text-green-600">{workflow.successRate}%</span>
                          </div>
                          <div className="hidden md:block">
                            <span className="text-muted-foreground">Last Run:</span>
                            <span className="font-medium ml-2">{formatDate(workflow.lastRun)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Button variant="outline" size="icon">
                        {workflow.status === 'Active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => setIsBuilding(true)}>
                        <Workflow className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="paused">
            {filteredWorkflows.length === 0 ? (
              <div className="text-center py-12">
                <Pause className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No paused workflows</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWorkflows.map((workflow, index) => (
                  <Card key={workflow.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      {/* Same structure as active tab */}
                      <div className="flex items-center gap-4">
                        <Workflow className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{workflow.name}</h3>
                          <p className="text-sm text-muted-foreground">Paused workflow</p>
                        </div>
                        <Button variant="gradient" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts">
            <div className="text-center py-12">
              <Workflow className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No draft workflows</p>
              <Button variant="gradient" className="mt-4" onClick={() => setIsBuilding(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Workflow
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Total Workflows</p>
                  <h3 className="text-3xl font-bold mt-2">{workflows.length}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Active Workflows</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {workflows.filter((w) => w.status === 'Active').length}
                  </h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Total Runs</p>
                  <h3 className="text-3xl font-bold mt-2">524</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                  <h3 className="text-3xl font-bold mt-2 text-green-600">72.3%</h3>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        /* Workflow Builder */
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Workflow Builder</h2>
              <p className="text-sm text-muted-foreground">Create an automated workflow</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setIsBuilding(false)} className="flex-1 sm:flex-none">
                Cancel
              </Button>
              <Button variant="gradient" className="flex-1 sm:flex-none">
                Save Workflow
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Step Types */}
            <div className="md:col-span-4 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Add Steps</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {stepTypes.map((step) => {
                      const Icon = step.icon
                      return (
                        <button
                          key={step.id}
                          onClick={() => addStep(step.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center text-white', step.color)}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{step.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workflow Canvas */}
            <div className="md:col-span-8 lg:col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Workflow Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Trigger */}
                  <div className="p-4 border-2 border-dashed rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-brand flex items-center justify-center text-white">
                        <Play className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Workflow Trigger</p>
                        <p className="text-sm text-muted-foreground">When: Lead Created</p>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  {workflowSteps.map((step, index) => {
                    const stepType = stepTypes.find((s) => s.id === step.type)
                    const Icon = stepType?.icon
                    return (
                      <div key={step.id}>
                        {/* Connector */}
                        <div className="flex justify-center py-2">
                          <div className="w-0.5 h-8 bg-border" />
                        </div>

                        {/* Step Card */}
                        <div className="p-4 border-2 rounded-lg hover:border-primary transition-colors group">
                          <div className="flex items-start gap-3">
                            <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center text-white', stepType?.color)}>
                              {Icon && <Icon className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium">Step {index + 1}: {step.action}</p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                  onClick={() => removeStep(step.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Schedule: {step.schedule}
                              </p>
                              {step.condition && (
                                <Badge variant="warning" className="mt-2">
                                  {step.condition}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {workflowSteps.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Workflow className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Add steps from the left to build your workflow</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Settings */}
            <div className="md:col-span-12 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Workflow Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Workflow Name</Label>
                    <Input placeholder="e.g., New Lead Nurture" />
                  </div>
                  <div className="space-y-2">
                    <Label>Trigger</Label>
                    <Select>
                      <option>Lead Created</option>
                      <option>Trial Completed</option>
                      <option>Payment Due</option>
                      <option>Inactive 30 Days</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Paused</option>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

