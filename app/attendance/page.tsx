import { AppShell } from "@/components/app-shell"
import { AttendanceReport } from "@/components/attendance-report"

export default function AttendancePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Attendance
          </h1>
          <p className="text-muted-foreground">
            View your attendance records, calendar, and download reports
          </p>
        </div>
        <AttendanceReport />
      </div>
    </AppShell>
  )
}
