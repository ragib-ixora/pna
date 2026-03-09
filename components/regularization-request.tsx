"use client"

import * as React from "react"
import { format, subDays, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths, getMonth, getYear, setMonth, setYear, isWeekend } from "date-fns"
import { CalendarIcon, Check, Clock, Plus, X, ChevronLeft, ChevronRight, Edit2, AlertCircle, FileText, Download, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { holidays } from "@/lib/mock-data"

interface DailyAttendanceEntry {
  id: string
  date: string
  dayType: "working" | "weekend" | "holiday"
  holidayName?: string
  checkIn: string | null
  checkOut: string | null
  workHours: number | null
  status: "present" | "absent" | "late" | "half_day" | "wfh" | "on_leave" | "holiday" | "weekend" | "pending"
  regularizationStatus?: "none" | "pending" | "approved" | "rejected"
  notes?: string
}

interface RegularizationEntry {
  id: string
  date: string
  type: "missed_check_in" | "missed_check_out" | "wrong_time" | "work_from_home" | "on_duty" | "forgot_punch" | "system_error" | "half_day"
  originalCheckIn?: string
  originalCheckOut?: string
  requestedCheckIn: string
  requestedCheckOut: string
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedOn: string
  reviewedBy?: string
  reviewedOn?: string
  comments?: string
}

const REGULARIZATION_TYPES = [
  { value: "missed_check_in", label: "Missed Check-In", description: "Forgot to punch in" },
  { value: "missed_check_out", label: "Missed Check-Out", description: "Forgot to punch out" },
  { value: "forgot_punch", label: "Forgot Both Punches", description: "Forgot both check-in and check-out" },
  { value: "wrong_time", label: "Wrong Time Recorded", description: "System recorded incorrect time" },
  { value: "system_error", label: "System Error", description: "Biometric/system malfunction" },
  { value: "work_from_home", label: "Work From Home", description: "Worked from home" },
  { value: "on_duty", label: "On Duty / Off-site", description: "Official work outside office" },
  { value: "half_day", label: "Half Day Correction", description: "Mark as half day" },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const YEARS = Array.from({ length: 3 }, (_, i) => 2024 + i)

// Generate daily attendance data with in/out times
function generateDailyAttendance(month: Date): DailyAttendanceEntry[] {
  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  })

  return days.map((day, index) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const isWeekendDay = isWeekend(day)
    const holiday = holidays.find(h => h.date === dateStr)

    if (isWeekendDay) {
      return {
        id: `daily-${index}`,
        date: dateStr,
        dayType: "weekend",
        checkIn: null,
        checkOut: null,
        workHours: null,
        status: "weekend",
      }
    }

    if (holiday) {
      return {
        id: `daily-${index}`,
        date: dateStr,
        dayType: "holiday",
        holidayName: holiday.name,
        checkIn: null,
        checkOut: null,
        workHours: null,
        status: "holiday",
      }
    }

    // Generate random attendance data
    const random = Math.random()
    let checkIn: string | null = null
    let checkOut: string | null = null
    let status: DailyAttendanceEntry["status"] = "present"
    let regularizationStatus: DailyAttendanceEntry["regularizationStatus"] = "none"

    if (random < 0.75) {
      // Normal present
      const inHour = 8 + Math.floor(Math.random() * 2)
      const inMin = Math.floor(Math.random() * 60)
      const outHour = 17 + Math.floor(Math.random() * 3)
      const outMin = Math.floor(Math.random() * 60)
      checkIn = `${inHour.toString().padStart(2, "0")}:${inMin.toString().padStart(2, "0")}`
      checkOut = `${outHour.toString().padStart(2, "0")}:${outMin.toString().padStart(2, "0")}`
      status = inHour >= 10 ? "late" : "present"
    } else if (random < 0.85) {
      // Missing check-out
      const inHour = 9 + Math.floor(Math.random() * 1)
      const inMin = Math.floor(Math.random() * 30)
      checkIn = `${inHour.toString().padStart(2, "0")}:${inMin.toString().padStart(2, "0")}`
      checkOut = null
      status = "pending"
      regularizationStatus = Math.random() > 0.5 ? "pending" : "none"
    } else if (random < 0.92) {
      // Missing check-in
      checkIn = null
      const outHour = 18 + Math.floor(Math.random() * 2)
      const outMin = Math.floor(Math.random() * 30)
      checkOut = `${outHour.toString().padStart(2, "0")}:${outMin.toString().padStart(2, "0")}`
      status = "pending"
      regularizationStatus = Math.random() > 0.5 ? "approved" : "none"
    } else {
      // Absent or both missing
      checkIn = null
      checkOut = null
      status = "absent"
    }

    const workHours = checkIn && checkOut ? calculateWorkHours(checkIn, checkOut) : null

    return {
      id: `daily-${index}`,
      date: dateStr,
      dayType: "working",
      checkIn,
      checkOut,
      workHours,
      status,
      regularizationStatus,
    }
  })
}

function calculateWorkHours(checkIn: string, checkOut: string): number {
  const [inH, inM] = checkIn.split(":").map(Number)
  const [outH, outM] = checkOut.split(":").map(Number)
  const hours = (outH * 60 + outM - inH * 60 - inM) / 60
  return Math.round(hours * 10) / 10
}

const SAMPLE_REQUESTS: RegularizationEntry[] = [
  {
    id: "1",
    date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    type: "missed_check_in",
    originalCheckIn: undefined,
    originalCheckOut: "18:30",
    requestedCheckIn: "09:15",
    requestedCheckOut: "18:30",
    reason: "Biometric machine was not working in the morning",
    status: "approved",
    submittedOn: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    reviewedBy: "Rajesh Kumar",
    reviewedOn: format(subDays(new Date(), 4), "yyyy-MM-dd"),
  },
  {
    id: "2",
    date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    type: "work_from_home",
    requestedCheckIn: "09:00",
    requestedCheckOut: "18:00",
    reason: "Plumber visit scheduled at home, worked full day remotely",
    status: "pending",
    submittedOn: format(subDays(new Date(), 2), "yyyy-MM-dd"),
  },
  {
    id: "3",
    date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    type: "missed_check_out",
    originalCheckIn: "09:10",
    originalCheckOut: undefined,
    requestedCheckIn: "09:10",
    requestedCheckOut: "19:30",
    reason: "Left in hurry due to personal emergency, forgot to punch out",
    status: "rejected",
    submittedOn: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    reviewedBy: "Rajesh Kumar",
    reviewedOn: format(subDays(new Date(), 9), "yyyy-MM-dd"),
    comments: "Please provide supporting documents for the emergency",
  },
  {
    id: "4",
    date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    type: "system_error",
    originalCheckIn: "09:05",
    originalCheckOut: "12:00",
    requestedCheckIn: "09:05",
    requestedCheckOut: "18:45",
    reason: "System auto-logged out at 12:00 due to server restart",
    status: "pending",
    submittedOn: format(subDays(new Date(), 3), "yyyy-MM-dd"),
  },
  {
    id: "5",
    date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    type: "on_duty",
    requestedCheckIn: "10:00",
    requestedCheckOut: "17:00",
    reason: "Client meeting at their Pune office",
    status: "approved",
    submittedOn: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    reviewedBy: "Rajesh Kumar",
    reviewedOn: format(subDays(new Date(), 6), "yyyy-MM-dd"),
  },
]

export function RegularizationRequest() {
  const [activeTab, setActiveTab] = React.useState("daily")
  const [requests, setRequests] = React.useState<RegularizationEntry[]>(SAMPLE_REQUESTS)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date>()
  const [type, setType] = React.useState("")
  const [requestedCheckIn, setRequestedCheckIn] = React.useState("")
  const [requestedCheckOut, setRequestedCheckOut] = React.useState("")
  const [reason, setReason] = React.useState("")
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedMonth, setSelectedMonth] = React.useState(getMonth(new Date()))
  const [selectedYear, setSelectedYear] = React.useState(getYear(new Date()))
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedEntry, setSelectedEntry] = React.useState<DailyAttendanceEntry | null>(null)

  // Generate daily attendance for the current month
  const dailyAttendance = React.useMemo(() => {
    const month = setYear(setMonth(new Date(), selectedMonth), selectedYear)
    return generateDailyAttendance(month)
  }, [selectedMonth, selectedYear])

  // Filter requests by status
  const filteredRequests = React.useMemo(() => {
    if (statusFilter === "all") return requests
    return requests.filter(r => r.status === statusFilter)
  }, [requests, statusFilter])

  // Summary counts
  const summary = React.useMemo(() => {
    const pendingRegularization = dailyAttendance.filter(d => 
      d.dayType === "working" && (d.checkIn === null || d.checkOut === null) && d.regularizationStatus === "none"
    ).length
    const missingPunches = dailyAttendance.filter(d => 
      d.dayType === "working" && (d.checkIn === null || d.checkOut === null)
    ).length
    const lateDays = dailyAttendance.filter(d => d.status === "late").length
    
    return {
      pendingRegularization,
      missingPunches,
      lateDays,
      pendingRequests: requests.filter(r => r.status === "pending").length,
      approvedRequests: requests.filter(r => r.status === "approved").length,
      rejectedRequests: requests.filter(r => r.status === "rejected").length,
    }
  }, [dailyAttendance, requests])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !type || !requestedCheckIn || !requestedCheckOut || !reason) {
      toast.error("Please fill in all required fields")
      return
    }

    const newRequest: RegularizationEntry = {
      id: Date.now().toString(),
      date: format(selectedDate, "yyyy-MM-dd"),
      type: type as RegularizationEntry["type"],
      originalCheckIn: selectedEntry?.checkIn || undefined,
      originalCheckOut: selectedEntry?.checkOut || undefined,
      requestedCheckIn,
      requestedCheckOut,
      reason,
      status: "pending",
      submittedOn: format(new Date(), "yyyy-MM-dd"),
    }

    setRequests([newRequest, ...requests])
    setIsDialogOpen(false)
    resetForm()
    toast.success("Regularization request submitted successfully")
  }

  const resetForm = () => {
    setSelectedDate(undefined)
    setType("")
    setRequestedCheckIn("")
    setRequestedCheckOut("")
    setReason("")
    setSelectedEntry(null)
  }

  const handleRowClick = (entry: DailyAttendanceEntry) => {
    if (entry.dayType !== "working") return
    if (entry.checkIn && entry.checkOut && entry.regularizationStatus === "none") return
    
    setSelectedEntry(entry)
    setSelectedDate(new Date(entry.date))
    if (entry.checkIn && !entry.checkOut) {
      setType("missed_check_out")
      setRequestedCheckIn(entry.checkIn)
    } else if (!entry.checkIn && entry.checkOut) {
      setType("missed_check_in")
      setRequestedCheckOut(entry.checkOut)
    } else if (!entry.checkIn && !entry.checkOut) {
      setType("forgot_punch")
    }
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: RegularizationEntry["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">Pending</Badge>
      case "approved":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Approved</Badge>
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-700">Rejected</Badge>
    }
  }

  const getAttendanceStatusBadge = (entry: DailyAttendanceEntry) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      present: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Present" },
      absent: { bg: "bg-red-100", text: "text-red-700", label: "Absent" },
      late: { bg: "bg-orange-100", text: "text-orange-700", label: "Late" },
      half_day: { bg: "bg-amber-100", text: "text-amber-700", label: "Half Day" },
      wfh: { bg: "bg-blue-100", text: "text-blue-700", label: "WFH" },
      on_leave: { bg: "bg-purple-100", text: "text-purple-700", label: "On Leave" },
      holiday: { bg: "bg-pink-100", text: "text-pink-700", label: "Holiday" },
      weekend: { bg: "bg-slate-100", text: "text-slate-500", label: "Weekend" },
      pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
    }
    const config = statusConfig[entry.status]
    return (
      <Badge variant="secondary" className={cn(config.bg, config.text)}>
        {config.label}
      </Badge>
    )
  }

  const getRegularizationBadge = (status?: DailyAttendanceEntry["regularizationStatus"]) => {
    if (!status || status === "none") return null
    const config: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Reg. Pending" },
      approved: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Reg. Approved" },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Reg. Rejected" },
    }
    const c = config[status]
    return (
      <Badge variant="outline" className={cn(c.bg, c.text, "text-xs ml-2")}>
        {c.label}
      </Badge>
    )
  }

  const handleDownloadReport = () => {
    const reportContent = generateRegularizationReport(dailyAttendance, requests, selectedMonth, selectedYear)
    const blob = new Blob([reportContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const printWindow = window.open(url, "_blank")
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertCircle className="size-4 text-amber-500" />
              <span className="text-sm">Missing Punches</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{summary.missingPunches}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Edit2 className="size-4 text-blue-500" />
              <span className="text-sm">Need Action</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{summary.pendingRegularization}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4 text-orange-500" />
              <span className="text-sm">Late Days</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{summary.lateDays}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4 text-amber-500" />
              <span className="text-sm">Pending</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{summary.pendingRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Check className="size-4 text-emerald-500" />
              <span className="text-sm">Approved</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{summary.approvedRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <X className="size-4 text-red-500" />
              <span className="text-sm">Rejected</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{summary.rejectedRequests}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="daily" className="gap-2">
              <Clock className="size-4" />
              Daily In-Out
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <FileText className="size-4" />
              My Requests
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownloadReport} className="gap-2">
              <Download className="size-4" />
              Download Report
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Regularization Request</DialogTitle>
                  <DialogDescription>
                    {selectedEntry 
                      ? `Correct attendance for ${format(new Date(selectedEntry.date), "MMMM d, yyyy")}`
                      : "Submit a request to correct your attendance record"
                    }
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="gap-4 py-4">
                    <Field>
                      <FieldLabel>Date *</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              date > new Date() || date < subDays(new Date(), 30)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">You can only request for dates within the last 30 days</p>
                    </Field>

                    <Field>
                      <FieldLabel>Type of Request *</FieldLabel>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {REGULARIZATION_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              <div className="flex flex-col">
                                <span>{t.label}</span>
                                <span className="text-xs text-muted-foreground">{t.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    {selectedEntry && (selectedEntry.checkIn || selectedEntry.checkOut) && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Original Record</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Check In:</span>
                            <span className="ml-2 font-medium">{selectedEntry.checkIn || "Missing"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check Out:</span>
                            <span className="ml-2 font-medium">{selectedEntry.checkOut || "Missing"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Check-In Time *</FieldLabel>
                        <Input
                          type="time"
                          value={requestedCheckIn}
                          onChange={(e) => setRequestedCheckIn(e.target.value)}
                          className="w-full"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Check-Out Time *</FieldLabel>
                        <Input
                          type="time"
                          value={requestedCheckOut}
                          onChange={(e) => setRequestedCheckOut(e.target.value)}
                          className="w-full"
                        />
                      </Field>
                    </div>

                    {requestedCheckIn && requestedCheckOut && (
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Calculated Work Hours</span>
                          <span className="font-semibold text-primary">
                            {calculateWorkHours(requestedCheckIn, requestedCheckOut)} hours
                          </span>
                        </div>
                      </div>
                    )}

                    <Field>
                      <FieldLabel>Reason *</FieldLabel>
                      <Textarea
                        placeholder="Provide a detailed reason for this request..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">Be specific to expedite the approval process</p>
                    </Field>
                  </FieldGroup>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Daily In-Out Tab */}
        <TabsContent value="daily" className="space-y-4">
          {/* Month/Year Selector */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Daily Attendance</CardTitle>
                  <CardDescription>View and regularize your daily in-out times</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month, idx) => (
                        <SelectItem key={month} value={idx.toString()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Work Hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyAttendance.map((entry) => {
                      const needsAction = entry.dayType === "working" && 
                        (entry.checkIn === null || entry.checkOut === null) && 
                        entry.regularizationStatus === "none"
                      
                      return (
                        <TableRow 
                          key={entry.id}
                          className={cn(
                            entry.dayType !== "working" && "bg-muted/30",
                            needsAction && "bg-amber-50/50"
                          )}
                        >
                          <TableCell className="font-medium">
                            {format(new Date(entry.date), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            {format(new Date(entry.date), "EEE")}
                          </TableCell>
                          <TableCell>
                            {entry.checkIn ? (
                              <span className={cn(
                                "font-mono",
                                entry.status === "late" && "text-orange-600"
                              )}>
                                {entry.checkIn}
                              </span>
                            ) : entry.dayType === "working" ? (
                              <span className="text-red-500 text-sm">Missing</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {entry.checkOut ? (
                              <span className="font-mono">{entry.checkOut}</span>
                            ) : entry.dayType === "working" ? (
                              <span className="text-red-500 text-sm">Missing</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {entry.workHours ? (
                              <span className={cn(
                                "font-medium",
                                entry.workHours >= 9 && "text-emerald-600",
                                entry.workHours >= 6 && entry.workHours < 9 && "text-amber-600",
                                entry.workHours < 6 && "text-red-600"
                              )}>
                                {entry.workHours} hrs
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getAttendanceStatusBadge(entry)}
                              {getRegularizationBadge(entry.regularizationStatus)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {entry.dayType === "working" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant={needsAction ? "default" : "ghost"}
                                      size="sm"
                                      onClick={() => handleRowClick(entry)}
                                      disabled={entry.regularizationStatus === "pending"}
                                    >
                                      <Edit2 className="size-4" />
                                      {needsAction && <span className="ml-1">Regularize</span>}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {entry.regularizationStatus === "pending" 
                                      ? "Regularization pending"
                                      : "Submit regularization request"
                                    }
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">My Regularization Requests</CardTitle>
                  <CardDescription>History of your regularization requests</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Original</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Reviewer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No regularization requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {format(new Date(request.date), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {REGULARIZATION_TYPES.find((t) => t.value === request.type)?.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-mono">
                              <div>{request.originalCheckIn || "-"}</div>
                              <div>{request.originalCheckOut || "-"}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-mono text-primary">
                              <div>{request.requestedCheckIn}</div>
                              <div>{request.requestedCheckOut}</div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="text-sm truncate">{request.reason}</p>
                            {request.comments && (
                              <p className="text-xs text-destructive mt-1 truncate">
                                {request.comments}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-sm">
                            {format(new Date(request.submittedOn), "MMM d")}
                          </TableCell>
                          <TableCell>
                            {request.reviewedBy ? (
                              <div>
                                <p className="text-sm">{request.reviewedBy}</p>
                                {request.reviewedOn && (
                                  <p className="text-xs text-muted-foreground">
                                    {format(new Date(request.reviewedOn), "MMM d")}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Guidelines for Regularization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">When to Submit</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Missed check-in or check-out due to biometric failure</li>
                <li>Forgot to punch in/out</li>
                <li>System recorded incorrect time</li>
                <li>Worked from home or off-site</li>
                <li>On official duty outside office</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Important Notes</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Requests can be submitted for last 30 days only</li>
                <li>All requests require manager approval</li>
                <li>Provide accurate and detailed reasons</li>
                <li>Repeated regularizations may be flagged</li>
                <li>Report biometric issues to IT helpdesk</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function generateRegularizationReport(
  attendance: DailyAttendanceEntry[], 
  requests: RegularizationEntry[],
  month: number,
  year: number
): string {
  const monthName = MONTHS[month]
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Attendance Regularization Report - ${monthName} ${year}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; padding: 40px; color: #1a1a2e; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: 700; color: #2563eb; }
        .report-info { text-align: right; }
        .report-info h1 { font-size: 18px; margin-bottom: 5px; }
        .report-info p { font-size: 12px; color: #666; }
        
        .section { margin-bottom: 30px; }
        .section-title { font-size: 14px; font-weight: 600; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
        
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th, td { padding: 8px 10px; text-align: left; border: 1px solid #e5e5e5; }
        th { background: #f8fafc; font-weight: 600; }
        tr:nth-child(even) { background: #fafafa; }
        
        .status-present { color: #059669; }
        .status-absent { color: #dc2626; }
        .status-late { color: #ea580c; }
        .status-pending { color: #d97706; }
        .status-weekend { color: #64748b; background: #f1f5f9; }
        .status-holiday { color: #db2777; background: #fdf2f8; }
        
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
        .summary-item { padding: 15px; background: #f8fafc; border-radius: 8px; }
        .summary-item .label { font-size: 11px; color: #666; margin-bottom: 5px; }
        .summary-item .value { font-size: 20px; font-weight: 600; }
        
        .missing { color: #dc2626; font-weight: 500; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 10px; color: #666; text-align: center; }
        
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Ixora Solutions</div>
        <div class="report-info">
          <h1>Attendance Regularization Report</h1>
          <p>${monthName} ${year}</p>
          <p>Generated: ${format(new Date(), "PPP")}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Summary</div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="label">Total Working Days</div>
            <div class="value">${attendance.filter(a => a.dayType === "working").length}</div>
          </div>
          <div class="summary-item">
            <div class="label">Present Days</div>
            <div class="value" style="color: #059669">${attendance.filter(a => a.status === "present" || a.status === "late").length}</div>
          </div>
          <div class="summary-item">
            <div class="label">Missing Punches</div>
            <div class="value" style="color: #dc2626">${attendance.filter(a => a.dayType === "working" && (!a.checkIn || !a.checkOut)).length}</div>
          </div>
          <div class="summary-item">
            <div class="label">Regularization Requests</div>
            <div class="value">${requests.length}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Daily In-Out Record</div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${attendance.map(entry => `
              <tr class="${entry.status === 'weekend' ? 'status-weekend' : ''} ${entry.status === 'holiday' ? 'status-holiday' : ''}">
                <td>${format(new Date(entry.date), "MMM d, yyyy")}</td>
                <td>${format(new Date(entry.date), "EEE")}</td>
                <td>${entry.checkIn || (entry.dayType === "working" ? '<span class="missing">Missing</span>' : '-')}</td>
                <td>${entry.checkOut || (entry.dayType === "working" ? '<span class="missing">Missing</span>' : '-')}</td>
                <td>${entry.workHours ? `${entry.workHours} hrs` : '-'}</td>
                <td class="status-${entry.status}">${entry.status.charAt(0).toUpperCase() + entry.status.slice(1).replace('_', ' ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${requests.length > 0 ? `
      <div class="section">
        <div class="section-title">Regularization Requests</div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Requested Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map(req => `
              <tr>
                <td>${format(new Date(req.date), "MMM d, yyyy")}</td>
                <td>${req.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td>${req.requestedCheckIn} - ${req.requestedCheckOut}</td>
                <td>${req.reason}</td>
                <td class="status-${req.status}">${req.status.charAt(0).toUpperCase() + req.status.slice(1)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}

      <div class="footer">
        <p>This is a system-generated report from Ixora LMS</p>
        <p>For any discrepancies, please contact HR department</p>
      </div>
    </body>
    </html>
  `
}
