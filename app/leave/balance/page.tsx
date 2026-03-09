import { AppShell } from "@/components/app-shell"
import { LeaveBalance } from "@/components/leave-balance"

export default function LeaveBalancePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Balance</h1>
          <p className="text-muted-foreground mt-1">
            Track your available leave across all categories
          </p>
        </div>
        <LeaveBalance />
      </div>
    </AppShell>
  )
}
