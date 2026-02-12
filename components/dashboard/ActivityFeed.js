import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Mail, DollarSign, CheckCircle, Calendar } from 'lucide-react'

const iconMap = {
  lead: UserPlus,
  email: Mail,
  deal: DollarSign,
  task: CheckCircle,
  appointment: Calendar,
}

const colorMap = {
  lead: 'bg-slate-100 text-slate-700',
  email: 'bg-slate-100 text-slate-700',
  deal: 'bg-slate-100 text-slate-700',
  task: 'bg-slate-100 text-slate-700',
  appointment: 'bg-slate-100 text-slate-700',
}

export default function ActivityFeed({ activities }) {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type]
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}


