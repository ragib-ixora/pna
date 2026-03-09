"use client"

import * as React from "react"
import { format, getMonth, getYear, isAfter, isBefore, startOfDay } from "date-fns"
import { CalendarDays, Download, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Extended holiday list
const allHolidays = [
  { id: "1", name: "New Year's Day", date: "2026-01-01", type: "public" as const },
  { id: "2", name: "Makar Sankranti", date: "2026-01-14", type: "optional" as const },
  { id: "3", name: "Republic Day", date: "2026-01-26", type: "public" as const },
  { id: "4", name: "Maha Shivaratri", date: "2026-03-10", type: "optional" as const },
  { id: "5", name: "Holi", date: "2026-03-14", type: "public" as const },
  { id: "6", name: "Ugadi", date: "2026-03-22", type: "optional" as const },
  { id: "7", name: "Good Friday", date: "2026-04-03", type: "public" as const },
  { id: "8", name: "Eid-ul-Fitr", date: "2026-03-31", type: "optional" as const },
  { id: "9", name: "May Day", date: "2026-05-01", type: "public" as const },
  { id: "10", name: "Buddha Purnima", date: "2026-05-12", type: "optional" as const },
  { id: "11", name: "Independence Day", date: "2026-08-15", type: "public" as const },
  { id: "12", name: "Janmashtami", date: "2026-08-25", type: "optional" as const },
  { id: "13", name: "Ganesh Chaturthi", date: "2026-09-07", type: "optional" as const },
  { id: "14", name: "Onam", date: "2026-09-09", type: "regional" as const },
  { id: "15", name: "Gandhi Jayanti", date: "2026-10-02", type: "public" as const },
  { id: "16", name: "Dussehra", date: "2026-10-20", type: "public" as const },
  { id: "17", name: "Diwali", date: "2026-11-11", type: "public" as const },
  { id: "18", name: "Bhai Dooj", date: "2026-11-13", type: "optional" as const },
  { id: "19", name: "Guru Nanak Jayanti", date: "2026-11-25", type: "optional" as const },
  { id: "20", name: "Christmas", date: "2026-12-25", type: "public" as const },
]

const typeColors = {
  public: "bg-primary/10 text-primary border-primary/20",
  optional: "bg-warning/10 text-warning border-warning/20",
  regional: "bg-success/10 text-success border-success/20",
}

const typeLabels = {
  public: "Public Holiday",
  optional: "Optional Holiday",
  regional: "Regional Holiday",
}

export function HolidayList() {
  const [year, setYear] = React.useState("2026")
  const [filter, setFilter] = React.useState("all")
  const today = startOfDay(new Date())

  const filteredHolidays = allHolidays
    .filter((h) => {
      if (filter === "all") return true
      return h.type === filter
    })
    .filter((h) => getYear(new Date(h.date)).toString() === year)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingHolidays = filteredHolidays.filter((h) =>
    isAfter(new Date(h.date), today) || format(new Date(h.date), "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  )
  const pastHolidays = filteredHolidays.filter((h) => isBefore(new Date(h.date), today))

  const publicCount = allHolidays.filter((h) => h.type === "public").length
  const optionalCount = allHolidays.filter((h) => h.type === "optional").length

  // Group by month
  const groupByMonth = (holidays: typeof allHolidays) => {
    const grouped: Record<number, typeof allHolidays> = {}
    holidays.forEach((h) => {
      const month = getMonth(new Date(h.date))
      if (!grouped[month]) grouped[month] = []
      grouped[month].push(h)
    })
    return grouped
  }

  const upcomingByMonth = groupByMonth(upcomingHolidays)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Public Holidays</CardDescription>
            <CardTitle className="text-3xl text-primary">{publicCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Mandatory holidays for all employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Optional Holidays</CardDescription>
            <CardTitle className="text-3xl text-warning">{optionalCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              You can avail up to 2 optional holidays
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Holiday</CardDescription>
            <CardTitle className="text-xl">
              {upcomingHolidays[0]?.name || "None"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {upcomingHolidays[0]
                ? format(new Date(upcomingHolidays[0].date), "EEEE, MMMM d")
                : "No upcoming holidays"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Holiday Calendar</CardTitle>
              <CardDescription>
                {filteredHolidays.length} holidays in {year}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="optional">Optional</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Holidays</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {Object.entries(upcomingByMonth).length > 0 ? (
                Object.entries(upcomingByMonth).map(([month, holidays]) => (
                  <div key={month}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {format(new Date(2026, parseInt(month)), "MMMM yyyy")}
                    </h3>
                    <div className="space-y-2">
                      {holidays.map((holiday) => (
                        <div
                          key={holiday.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-muted text-center">
                              <span className="text-lg font-bold">
                                {format(new Date(holiday.date), "d")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(holiday.date), "EEE")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{holiday.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(holiday.date), "EEEE, MMMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(typeColors[holiday.type])}
                          >
                            {typeLabels[holiday.type]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarDays className="size-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No upcoming holidays</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all">
              <div className="space-y-2">
                {filteredHolidays.map((holiday) => {
                  const isPast = isBefore(new Date(holiday.date), today)
                  return (
                    <div
                      key={holiday.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border",
                        isPast && "opacity-60"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-muted text-center">
                          <span className="text-lg font-bold">
                            {format(new Date(holiday.date), "d")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(holiday.date), "MMM")}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{holiday.name}</p>
                            {isPast && (
                              <Badge variant="secondary" className="text-xs">
                                Past
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(holiday.date), "EEEE, MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(typeColors[holiday.type])}
                      >
                        {typeLabels[holiday.type]}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
