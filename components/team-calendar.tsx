"use client"

import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWeekend, getDay } from "date-fns"
import { ChevronLeft, ChevronRight, Users, CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { holidays } from "@/lib/mock-data"
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_COLORS } from "@/lib/types"

// Mock team leave data
const teamLeaves = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "",
    type: "annual" as const,
    startDate: "2026-03-15",
    endDate: "2026-03-18",
  },
  {
    id: "2",
    name: "Amit Patel",
    avatar: "",
    type: "annual" as const,
    startDate: "2026-03-20",
    endDate: "2026-03-22",
  },
  {
    id: "3",
    name: "Sneha Reddy",
    avatar: "",
    type: "sick" as const,
    startDate: "2026-03-09",
    endDate: "2026-03-10",
  },
  {
    id: "4",
    name: "Vikram Singh",
    avatar: "",
    type: "wfh" as const,
    startDate: "2026-03-12",
    endDate: "2026-03-12",
  },
  {
    id: "5",
    name: "Kavitha Menon",
    avatar: "",
    type: "annual" as const,
    startDate: "2026-03-10",
    endDate: "2026-03-11",
  },
  {
    id: "6",
    name: "Rahul Verma",
    avatar: "",
    type: "wfh" as const,
    startDate: "2026-03-09",
    endDate: "2026-03-09",
  },
]

const departments = ["All Departments", "Engineering", "Design", "Product", "Marketing"]

function getLeaveForDate(date: Date) {
  return teamLeaves.filter((leave) => {
    const start = new Date(leave.startDate)
    const end = new Date(leave.endDate)
    return date >= start && date <= end
  })
}

function getHolidayForDate(date: Date) {
  return holidays.find((h) => isSameDay(new Date(h.date), date))
}

export function TeamCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = React.useState("All Departments")
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get the day of week for the first day (0 = Sunday)
  const startDayOfWeek = getDay(monthStart)

  // Previous month navigation
  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const goToToday = () => setCurrentDate(new Date())

  const selectedDateLeaves = selectedDate ? getLeaveForDate(selectedDate) : []
  const selectedDateHoliday = selectedDate ? getHolidayForDate(selectedDate) : null

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Calendar */}
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPrevMonth}>
                <ChevronLeft className="size-4" />
              </Button>
              <h2 className="text-lg font-semibold min-w-[140px] text-center">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {/* Empty cells for days before the month starts */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-muted/30 min-h-[100px] p-2" />
            ))}

            {days.map((day) => {
              const leavesOnDay = getLeaveForDate(day)
              const holiday = getHolidayForDate(day)
              const isToday = isSameDay(day, new Date())
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isWeekendDay = isWeekend(day)

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "bg-card min-h-[100px] p-2 text-left transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset",
                    isWeekendDay && "bg-muted/30",
                    isSelected && "ring-2 ring-primary ring-inset",
                    holiday && "bg-warning/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full text-sm",
                        isToday && "bg-primary text-primary-foreground font-semibold"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {holiday && (
                      <span className="text-xs text-warning font-medium truncate max-w-[60px]">
                        {holiday.name}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {leavesOnDay.slice(0, 2).map((leave) => (
                      <div
                        key={leave.id}
                        className={cn(
                          "flex items-center gap-1 rounded px-1.5 py-0.5 text-xs truncate",
                          LEAVE_TYPE_COLORS[leave.type]
                        )}
                      >
                        <span className="truncate">{leave.name.split(" ")[0]}</span>
                      </div>
                    ))}
                    {leavesOnDay.length > 2 && (
                      <div className="text-xs text-muted-foreground pl-1">
                        +{leavesOnDay.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded bg-warning/30" />
              <span className="text-muted-foreground">Holiday</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded bg-blue-100" />
              <span className="text-muted-foreground">Annual Leave</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded bg-cyan-100" />
              <span className="text-muted-foreground">WFH</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded bg-red-100" />
              <span className="text-muted-foreground">Sick Leave</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar - Selected Date Details */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">
                {selectedDate
                  ? format(selectedDate, "EEEE, MMMM d")
                  : "Select a Date"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {selectedDateHoliday && (
                  <div className="rounded-lg bg-warning/10 p-3">
                    <p className="text-sm font-medium text-warning">
                      {selectedDateHoliday.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {selectedDateHoliday.type} Holiday
                    </p>
                  </div>
                )}

                {selectedDateLeaves.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {selectedDateLeaves.length} team member(s) on leave
                    </p>
                    {selectedDateLeaves.map((leave) => (
                      <div
                        key={leave.id}
                        className="flex items-center gap-3 py-2"
                      >
                        <Avatar className="size-8">
                          <AvatarImage src={leave.avatar} />
                          <AvatarFallback className="text-xs bg-muted">
                            {leave.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {leave.name}
                          </p>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs mt-0.5",
                              LEAVE_TYPE_COLORS[leave.type]
                            )}
                          >
                            {LEAVE_TYPE_LABELS[leave.type]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No team members on leave
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Click on a date to see who is on leave
              </p>
            )}
          </CardContent>
        </Card>

        {/* Team Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">This Month</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Leave Days</span>
                <span className="font-medium">18 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Team Members</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average Availability</span>
                <span className="font-medium text-success">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
