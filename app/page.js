'use client'

import { Users, UserPlus, DollarSign, TrendingUp, Mail, CheckCircle, Briefcase, Target } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import StatCard from '@/components/dashboard/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import PipelineChart from '@/components/dashboard/PipelineChart'
import LeadsChart from '@/components/dashboard/LeadsChart'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import UpcomingTasks from '@/components/dashboard/UpcomingTasks'
import { Card, CardContent } from '@/components/ui/card'
import {
  dashboardStats,
  revenueData,
  pipelineData,
  leadSourcesData,
  activityFeed,
  upcomingTasks,
} from '@/data/dummyData'
import { getEffectiveBranch, isSuperAdmin } from '@/lib/auth'
import { branches } from '@/data/dummyData'

export default function Dashboard() {
  const selectedBranchId = getEffectiveBranch()
  const selectedBranch = selectedBranchId
    ? branches.find((b) => b.id === selectedBranchId)
    : null

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
      <div className="space-y-6">
        {/* Branch Context */}
        {isSuperAdmin() && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Viewing data for</p>
              <p className="text-base font-semibold text-slate-900">
                {selectedBranch ? `${selectedBranch.name} Branch` : 'All Branches'}
              </p>
            </div>
            {!selectedBranch && (
              <span className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                💡 Select a branch in the header to drill down
              </span>
            )}
          </div>
        )}

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Contacts"
            value={dashboardStats.totalContacts}
            change={dashboardStats.totalContactsChange}
          />
          <StatCard
            icon={UserPlus}
            title="Active Leads"
            value={dashboardStats.activeLeads}
            change={dashboardStats.activeLeadsChange}
          />
          <StatCard
            icon={DollarSign}
            title="Revenue"
            value={dashboardStats.revenue}
            change={dashboardStats.revenueChange}
            format="currency"
          />
          <StatCard
            icon={TrendingUp}
            title="Conversion Rate"
            value={dashboardStats.conversionRate}
            change={dashboardStats.conversionRateChange}
            format="percentage"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevenueChart data={revenueData} />
          <PipelineChart data={pipelineData} />
        </div>

        {/* Lead Sources */}
        <div className="grid grid-cols-1 gap-6">
          <LeadsChart data={leadSourcesData} />
        </div>

        {/* Activity and Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityFeed activities={activityFeed} />
          <UpcomingTasks tasks={upcomingTasks} />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all animate-fade-in">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{dashboardStats.emailsSent}</p>
                  <p className="text-xs text-slate-500">Emails Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all animate-fade-in">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{dashboardStats.tasksCompleted}</p>
                  <p className="text-xs text-slate-500">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all animate-fade-in">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{dashboardStats.openDeals}</p>
                  <p className="text-xs text-slate-500">Open Deals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all animate-fade-in">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">${dashboardStats.avgDealSize}</p>
                  <p className="text-xs text-slate-500">Avg Deal Size</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}


