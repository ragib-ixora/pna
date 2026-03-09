import { AppShell } from "@/components/app-shell"
import { TeamReports } from "@/components/team-reports"

export default function TeamReportsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Reports</h1>
          <p className="text-muted-foreground mt-1">
            View leave utilization and analytics for your team
          </p>
        </div>
        <TeamReports />
      </div>
    </AppShell>
  )
}
