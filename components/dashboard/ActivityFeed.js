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
  lead: 'bg-muted text-foreground',
  email: 'bg-muted text-foreground',
  deal: 'bg-muted text-foreground',
  task: 'bg-muted text-foreground',
  appointment: 'bg-muted text-foreground',
}

export default function ActivityFeed({ activities }) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type]
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/60 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}


