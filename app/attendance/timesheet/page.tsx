import { AppShell } from "@/components/app-shell"
import { TimesheetView } from "@/components/timesheet-view"

export default function TimesheetPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Timesheet
          </h1>
          <p className="text-muted-foreground">
            Track your daily work hours and project allocations
          </p>
        </div>
        <TimesheetView />
      </div>
    </AppShell>
  )
}
