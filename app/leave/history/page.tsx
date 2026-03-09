import { AppShell } from "@/components/app-shell"
import { LeaveHistory } from "@/components/leave-history"

export default function LeaveHistoryPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave History</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your leave requests
          </p>
        </div>
        <LeaveHistory />
      </div>
    </AppShell>
  )
}
