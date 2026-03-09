import { AppShell } from "@/components/app-shell"
import { PendingApprovals } from "@/components/pending-approvals"

export default function ApprovalsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pending Approvals</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage leave requests from your team
          </p>
        </div>
        <PendingApprovals />
      </div>
    </AppShell>
  )
}
