import { AppShell } from "@/components/app-shell"
import { HolidayList } from "@/components/holiday-list"

export default function HolidaysPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Holiday Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View all company holidays for the year
          </p>
        </div>
        <HolidayList />
      </div>
    </AppShell>
  )
}
