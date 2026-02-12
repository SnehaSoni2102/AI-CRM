'use client'

import { useState } from 'react'
import { Phone, Plus, Play, Copy, Trash2, User, FileText, Upload, Check } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { aiScripts, aiPersonas, knowledgeBaseDocuments } from '@/data/dummyData'
import { cn } from '@/lib/utils'

const fileTypeIcons = {
  pdf: '📄',
  docx: '📝',
  txt: '📃',
  mp3: '🎵',
}

export default function AICallingPage() {
  const [activeTab, setActiveTab] = useState('scripts')
  const [dragOver, setDragOver] = useState(false)

  return (
    <MainLayout title="AI Calling" subtitle="Manage AI-powered calling scripts and personas">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="scripts" className="flex-1 sm:flex-none text-xs sm:text-sm">Scripts</TabsTrigger>
          <TabsTrigger value="personas" className="flex-1 sm:flex-none text-xs sm:text-sm">AI Personas</TabsTrigger>
          <TabsTrigger value="knowledge" className="flex-1 sm:flex-none text-xs sm:text-sm">Knowledge Base</TabsTrigger>
        </TabsList>

        {/* Scripts Tab */}
        <TabsContent value="scripts" className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Manage AI calling scripts</p>
            <Button variant="gradient" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Script
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiScripts.map((script, index) => (
              <Card
                key={script.id}
                className="hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Phone className="h-8 w-8 text-primary" />
                    <Badge variant={script.status === 'Active' ? 'success' : 'warning'}>
                      {script.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{script.name}</CardTitle>
                  <Badge variant="outline" className="mt-2 w-fit">
                    {script.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Calls:</span>
                      <span className="font-medium">{script.calls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversions:</span>
                      <span className="font-medium text-green-600">{script.conversions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversion Rate:</span>
                      <span className="font-medium">
                        {((script.conversions / script.calls) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Used:</span>
                      <span className="font-medium">{script.lastUsed}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="gradient" size="sm" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Test Call
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Personas Tab */}
        <TabsContent value="personas" className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Configure AI personas for calls</p>
            <Button variant="gradient" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Persona
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiPersonas.map((persona, index) => (
              <Card
                key={persona.id}
                className={cn(
                  'hover:shadow-lg transition-all cursor-pointer animate-fade-in',
                  persona.isActive && 'border-2 border-primary'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    {persona.isActive && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{persona.name}</CardTitle>
                  <Badge variant="outline" className="mt-2 w-fit">
                    {persona.voice}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Personality:</p>
                    <p className="text-sm">{persona.personality}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">{persona.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="font-medium">{persona.speed}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {persona.isActive ? (
                      <Button variant="outline" size="sm" className="flex-1">
                        Deactivate
                      </Button>
                    ) : (
                      <Button variant="gradient" size="sm" className="flex-1">
                        Set as Active
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create New Persona Form */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Create New Persona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Persona Name</Label>
                    <Input placeholder="e.g., Emily - Friendly Receptionist" />
                  </div>
                  <div className="space-y-2">
                    <Label>Voice</Label>
                    <Select>
                      <option>Female</option>
                      <option>Male</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>English/Spanish (Bilingual)</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Personality</Label>
                    <Textarea
                      placeholder="Describe the personality..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Speaking Speed</Label>
                    <Select>
                      <option>Slow</option>
                      <option>Normal</option>
                      <option>Slightly Fast</option>
                      <option>Fast</option>
                    </Select>
                  </div>
                </div>
              </div>
              <Button variant="gradient" className="mt-6">
                Create Persona
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Upload documents for AI training</p>
          </div>

          {/* Upload Area */}
          <Card
            className={cn(
              'border-2 border-dashed transition-all',
              dragOver && 'border-primary bg-primary/5'
            )}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              // Handle file drop
            }}
          >
            <CardContent className="p-6 sm:p-12 text-center">
              <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Supported formats: PDF, DOCX, TXT, MP3 (Max 10MB)
              </p>
              <Button variant="gradient">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </CardContent>
          </Card>

          {/* Documents List */}
          <div className="grid grid-cols-1 gap-4">
            {knowledgeBaseDocuments.map((doc, index) => (
              <Card
                key={doc.id}
                className="hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                        {fileTypeIcons[doc.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={doc.status === 'Processed' ? 'success' : 'warning'}
                      >
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Documents</p>
                    <h3 className="text-3xl font-bold mt-2">{knowledgeBaseDocuments.length}</h3>
                  </div>
                  <FileText className="h-12 w-12 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Processed</p>
                    <h3 className="text-3xl font-bold mt-2">
                      {knowledgeBaseDocuments.filter((d) => d.status === 'Processed').length}
                    </h3>
                  </div>
                  <Check className="h-12 w-12 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Size</p>
                    <h3 className="text-3xl font-bold mt-2">6.6 MB</h3>
                  </div>
                  <Upload className="h-12 w-12 text-slate-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

