import { AppShell } from "@/components/app-shell"
import { TeamCalendar } from "@/components/team-calendar"

export default function TeamCalendarPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View team availability and leave schedules
          </p>
        </div>
        <TeamCalendar />
      </div>
    </AppShell>
  )
}
