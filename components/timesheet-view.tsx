"use client"

import * as React from "react"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { ChevronLeft, ChevronRight, Clock, Plus, Save, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface TimesheetEntry {
  id: string
  project: string
  task: string
  hours: { [key: string]: number }
}

const PROJECTS = [
  { id: "1", name: "Ixora LMS Development" },
  { id: "2", name: "Client Portal Redesign" },
  { id: "3", name: "Internal Tools" },
  { id: "4", name: "Training & Learning" },
  { id: "5", name: "Administrative Tasks" },
]

const TASKS = {
  "1": ["Frontend Development", "Backend API", "Testing", "Code Review", "Documentation"],
  "2": ["UI Design", "Frontend Implementation", "User Research", "Testing"],
  "3": ["Feature Development", "Bug Fixes", "Maintenance"],
  "4": ["Coursework", "Workshops", "Self-study"],
  "5": ["Meetings", "Planning", "Reporting"],
}

export function TimesheetView() {
  const [currentWeek, setCurrentWeek] = React.useState(new Date())
  const [entries, setEntries] = React.useState<TimesheetEntry[]>([
    {
      id: "1",
      project: "1",
      task: "Frontend Development",
      hours: {
        [format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")]: 8,
        [format(new Date(startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() + 86400000), "yyyy-MM-dd")]: 7,
        [format(new Date(startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() + 2 * 86400000), "yyyy-MM-dd")]: 8,
      },
    },
    {
      id: "2",
      project: "1",
      task: "Code Review",
      hours: {
        [format(new Date(startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() + 3 * 86400000), "yyyy-MM-dd")]: 4,
        [format(new Date(startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() + 4 * 86400000), "yyyy-MM-dd")]: 3,
      },
    },
    {
      id: "3",
      project: "4",
      task: "Self-study",
      hours: {
        [format(new Date(startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() + 4 * 86400000), "yyyy-MM-dd")]: 2,
      },
    },
  ])

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const addNewEntry = () => {
    const newEntry: TimesheetEntry = {
      id: Date.now().toString(),
      project: "",
      task: "",
      hours: {},
    }
    setEntries([...entries, newEntry])
  }

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  const updateEntry = (id: string, field: "project" | "task", value: string) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === id) {
          if (field === "project") {
            return { ...entry, project: value, task: "" }
          }
          return { ...entry, [field]: value }
        }
        return entry
      })
    )
  }

  const updateHours = (id: string, date: string, hours: number) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            hours: { ...entry.hours, [date]: hours },
          }
        }
        return entry
      })
    )
  }

  const getTotalForDay = (date: string): number => {
    return entries.reduce((sum, entry) => sum + (entry.hours[date] || 0), 0)
  }

  const getTotalForEntry = (entry: TimesheetEntry): number => {
    return Object.values(entry.hours).reduce((sum, h) => sum + h, 0)
  }

  const getWeekTotal = (): number => {
    return weekDays.reduce((sum, day) => sum + getTotalForDay(format(day, "yyyy-MM-dd")), 0)
  }

  const handleSave = () => {
    toast.success("Timesheet saved successfully")
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  Week of {format(weekStart, "MMMM d, yyyy")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Week Total</p>
                <p className="text-2xl font-bold text-primary">{getWeekTotal()} hrs</p>
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="size-4" />
                Save Timesheet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheet Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Time Entries</CardTitle>
              <CardDescription>Log your hours for each project and task</CardDescription>
            </div>
            <Button variant="outline" onClick={addNewEntry} className="gap-2">
              <Plus className="size-4" />
              Add Row
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Project</TableHead>
                  <TableHead className="w-[160px]">Task</TableHead>
                  {weekDays.map((day) => (
                    <TableHead
                      key={day.toISOString()}
                      className={cn(
                        "text-center w-[80px]",
                        isToday(day) && "bg-primary/10"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">
                          {format(day, "EEE")}
                        </span>
                        <span className={cn(
                          "font-medium",
                          isToday(day) && "text-primary"
                        )}>
                          {format(day, "d")}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-center w-[80px]">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Select
                        value={entry.project}
                        onValueChange={(v) => updateEntry(entry.id, "project", v)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECTS.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={entry.task}
                        onValueChange={(v) => updateEntry(entry.id, "task", v)}
                        disabled={!entry.project}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select task" />
                        </SelectTrigger>
                        <SelectContent>
                          {entry.project &&
                            TASKS[entry.project as keyof typeof TASKS]?.map((task) => (
                              <SelectItem key={task} value={task}>
                                {task}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {weekDays.map((day) => {
                      const dateKey = format(day, "yyyy-MM-dd")
                      const dayOfWeek = day.getDay()
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

                      return (
                        <TableCell
                          key={day.toISOString()}
                          className={cn(
                            "p-1",
                            isToday(day) && "bg-primary/5",
                            isWeekend && "bg-muted/50"
                          )}
                        >
                          <Input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={entry.hours[dateKey] || ""}
                            onChange={(e) =>
                              updateHours(
                                entry.id,
                                dateKey,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="h-9 text-center"
                            placeholder="-"
                          />
                        </TableCell>
                      )
                    })}
                    <TableCell className="text-center font-medium">
                      {getTotalForEntry(entry) || 0}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEntry(entry.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Daily Totals Row */}
                <TableRow className="bg-muted/50 font-medium">
                  <TableCell colSpan={2} className="text-right">
                    Daily Total
                  </TableCell>
                  {weekDays.map((day) => {
                    const dateKey = format(day, "yyyy-MM-dd")
                    const total = getTotalForDay(dateKey)
                    const isOvertime = total > 8
                    const isUndertime = total > 0 && total < 8

                    return (
                      <TableCell
                        key={day.toISOString()}
                        className={cn(
                          "text-center",
                          isToday(day) && "bg-primary/10"
                        )}
                      >
                        <Badge
                          variant={isOvertime ? "default" : isUndertime ? "secondary" : "outline"}
                          className={cn(
                            isOvertime && "bg-emerald-500",
                            isUndertime && "bg-amber-100 text-amber-700"
                          )}
                        >
                          {total || 0}
                        </Badge>
                      </TableCell>
                    )
                  })}
                  <TableCell className="text-center">
                    <Badge variant="default" className="bg-primary">
                      {getWeekTotal()}
                    </Badge>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-sm">Expected Hours</span>
            </div>
            <p className="text-2xl font-bold">40 hrs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-sm">Logged Hours</span>
            </div>
            <p className="text-2xl font-bold text-primary">{getWeekTotal()} hrs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-sm">Remaining</span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              getWeekTotal() >= 40 ? "text-emerald-600" : "text-amber-600"
            )}>
              {Math.max(40 - getWeekTotal(), 0)} hrs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-sm">Overtime</span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              getWeekTotal() > 40 ? "text-emerald-600" : "text-muted-foreground"
            )}>
              {Math.max(getWeekTotal() - 40, 0)} hrs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
