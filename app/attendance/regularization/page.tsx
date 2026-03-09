import { AppShell } from "@/components/app-shell"
import { RegularizationRequest } from "@/components/regularization-request"

export default function RegularizationPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Attendance Regularization
          </h1>
          <p className="text-muted-foreground">
            Request corrections for missed punches or attendance discrepancies
          </p>
        </div>
        <RegularizationRequest />
      </div>
    </AppShell>
  )
}
