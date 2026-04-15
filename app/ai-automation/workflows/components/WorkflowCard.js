import { Eye, Pencil, Trash2, Workflow } from 'lucide-react'

export default function WorkflowCard({ workflow }) {
  const isPaused = workflow.status === 'paused'

  return (
    <article className="h-[286px] w-full rounded-xl border border-border bg-card p-4 shadow-sm">
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
