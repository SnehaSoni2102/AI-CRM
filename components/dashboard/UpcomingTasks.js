import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const priorityVariants = {
  High: 'error',
  Medium: 'warning',
  Low: 'info',
}

export default function UpcomingTasks({ tasks }) {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-slate-900">{task.title}</p>
                  <Badge variant={priorityVariants[task.priority]} className="shrink-0 text-xs">
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Due: {formatDate(task.dueDate)}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assigned to: {task.assignee}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


