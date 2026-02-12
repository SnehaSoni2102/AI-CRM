'use client'

import { useState } from 'react'
import { Download, TrendingUp, DollarSign, Users, Target } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 35000, target: 30000 },
  { month: 'Feb', revenue: 38000, target: 32000 },
  { month: 'Mar', revenue: 42000, target: 35000 },
  { month: 'Apr', revenue: 39000, target: 37000 },
  { month: 'May', revenue: 45000, target: 40000 },
  { month: 'Jun', revenue: 48000, target: 42000 },
]

const pipelineData = [
  { name: 'New Leads', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Contacted', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Qualified', value: 20, color: 'hsl(var(--primary))' },
  { name: 'Proposal', value: 12, color: 'hsl(var(--primary))' },
  { name: 'Won', value: 8, color: 'hsl(var(--primary))' },
]

const leadSourcesData = [
  { name: 'Website', value: 450 },
  { name: 'Referral', value: 320 },
  { name: 'Social', value: 280 },
  { name: 'Walk-in', value: 150 },
  { name: 'Events', value: 110 },
]

const conversionFunnelData = [
  { stage: 'Leads', count: 1000, percentage: 100 },
  { stage: 'Contacted', count: 750, percentage: 75 },
  { stage: 'Qualified', count: 500, percentage: 50 },
  { stage: 'Proposal', count: 250, percentage: 25 },
  { stage: 'Won', count: 100, percentage: 10 },
]

const weeklyActivityData = [
  { day: 'Mon', calls: 45, emails: 120, sms: 80 },
  { day: 'Tue', calls: 52, emails: 135, sms: 90 },
  { day: 'Wed', calls: 48, emails: 115, sms: 75 },
  { day: 'Thu', calls: 61, emails: 140, sms: 95 },
  { day: 'Fri', calls: 55, emails: 125, sms: 85 },
  { day: 'Sat', calls: 30, emails: 70, sms: 50 },
  { day: 'Sun', calls: 20, emails: 45, sms: 30 },
]

export default function ReportsPage() {
  const [timePeriod, setTimePeriod] = useState('30')

  return (
    <MainLayout title="Reports & Analytics" subtitle="Track performance and gain insights">
      <div className="space-y-4 md:space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-full sm:w-40">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">This year</option>
            </Select>
          </div>
          <Button variant="gradient" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">$247,280</h3>
                  <p className="text-xs text-green-600 font-semibold">+15.3% from last period</p>
                </div>
                  <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Leads</p>
                  <h3 className="text-2xl font-bold mt-2">342</h3>
                  <p className="text-sm text-green-600 mt-2">+8.2% from last period</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-brand-light flex items-center justify-center">
                  <Users className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold mt-2">24.8%</h3>
                  <p className="text-sm text-green-600 mt-2">+3.1% from last period</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                  <h3 className="text-2xl font-bold mt-2">$2,475</h3>
                  <p className="text-sm text-green-600 mt-2">+12.7% from last period</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-900">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} className="sm:text-xs" />
                <YAxis stroke="#6b7280" fontSize={10} className="sm:text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline & Lead Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-2 sm:px-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Lead Sources</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-2 sm:px-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={leadSourcesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} className="sm:text-xs" />
                  <YAxis stroke="#6b7280" fontSize={10} className="sm:text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-muted-foreground">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-brand-dark flex items-center justify-center text-white font-medium text-sm transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Calls" />
                <Bar dataKey="emails" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Emails" />
                <Bar dataKey="sms" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="SMS" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}


