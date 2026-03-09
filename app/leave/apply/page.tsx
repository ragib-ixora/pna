import { AppShell } from "@/components/app-shell"
import { LeaveApplicationForm } from "@/components/leave-application-form"

export default function ApplyLeavePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Apply for Leave</h1>
          <p className="text-muted-foreground mt-1">
            Submit a new leave request for approval
          </p>
        </div>
        <LeaveApplicationForm />
      </div>
    </AppShell>
  )
}
