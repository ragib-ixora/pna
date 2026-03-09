"use client"

import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfYear, endOfYear, getMonth, getYear, setMonth, setYear } from "date-fns"
import { CalendarIcon, Download, FileText, ChevronLeft, ChevronRight, Clock, Filter, Calendar as CalendarLucide, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currentUser, generateAttendanceRecords, calculateAttendanceSummary } from "@/lib/mock-data"
import { ATTENDANCE_STATUS_LABELS, ATTENDANCE_STATUS_COLORS, type AttendanceRecord, type AttendanceSummary } from "@/lib/types"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const YEARS = Array.from({ length: 5 }, (_, i) => 2024 + i)

export function AttendanceReport() {
  const [activeTab, setActiveTab] = React.useState("calendar")
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [startDate, setStartDate] = React.useState<Date>(startOfMonth(new Date()))
  const [endDate, setEndDate] = React.useState<Date>(endOfMonth(new Date()))
  const [startMonthFilter, setStartMonthFilter] = React.useState(getMonth(new Date()))
  const [endMonthFilter, setEndMonthFilter] = React.useState(getMonth(new Date()))
  const [yearFilter, setYearFilter] = React.useState(getYear(new Date()))
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false)

  // Generate attendance records based on selected date range
  const attendanceRecords = React.useMemo(() => {
    return generateAttendanceRecords(currentUser.id, startDate, endDate)
  }, [startDate, endDate])

  const summary = React.useMemo(() => {
    return calculateAttendanceSummary(attendanceRecords)
  }, [attendanceRecords])

  // Calendar month records
  const calendarRecords = React.useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    return generateAttendanceRecords(currentUser.id, monthStart, monthEnd)
  }, [currentMonth])

  const calendarSummary = React.useMemo(() => {
    return calculateAttendanceSummary(calendarRecords)
  }, [calendarRecords])

  // Filter by month range
  const handleMonthRangeFilter = () => {
    const start = setYear(setMonth(new Date(), startMonthFilter), yearFilter)
    const end = setYear(setMonth(new Date(), endMonthFilter), yearFilter)
    setStartDate(startOfMonth(start))
    setEndDate(endOfMonth(end))
  }

  // Generate PDF report
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    
    // Create PDF content
    const pdfContent = generatePDFContent(attendanceRecords, summary, startDate, endDate)
    
    // Create and download the PDF
    const blob = new Blob([pdfContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    
    // Open in new window for printing as PDF
    const printWindow = window.open(url, "_blank")
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
    
    setIsGeneratingPDF(false)
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const getRecordForDate = (date: Date): AttendanceRecord | undefined => {
    const dateStr = format(date, "yyyy-MM-dd")
    return calendarRecords.find((r) => r.date === dateStr)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <SummaryCard
          title="Present Days"
          value={calendarSummary.presentDays}
          icon={<div className="size-3 rounded-full bg-emerald-500" />}
          color="text-emerald-600"
        />
        <SummaryCard
          title="Absent"
          value={calendarSummary.absentDays}
          icon={<div className="size-3 rounded-full bg-red-500" />}
          color="text-red-600"
        />
        <SummaryCard
          title="Late Days"
          value={calendarSummary.lateDays}
          icon={<div className="size-3 rounded-full bg-orange-500" />}
          color="text-orange-600"
        />
        <SummaryCard
          title="WFH Days"
          value={calendarSummary.wfhDays}
          icon={<div className="size-3 rounded-full bg-blue-500" />}
          color="text-blue-600"
        />
        <SummaryCard
          title="On Leave"
          value={calendarSummary.leaveDays}
          icon={<div className="size-3 rounded-full bg-purple-500" />}
          color="text-purple-600"
        />
        <SummaryCard
          title="Avg Hours/Day"
          value={calendarSummary.averageHoursPerDay}
          icon={<Clock className="size-3 text-muted-foreground" />}
          color="text-foreground"
          suffix="hrs"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarLucide className="size-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="report" className="gap-2">
              <BarChart3 className="size-4" />
              Report View
            </TabsTrigger>
          </TabsList>

          <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="gap-2">
            <Download className="size-4" />
            {isGeneratingPDF ? "Generating..." : "Download PDF"}
          </Button>
        </div>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">
                  {format(currentMonth, "MMMM yyyy")}
                </CardTitle>
                <CardDescription>
                  Click on any date to view details
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AttendanceCalendarGrid 
                days={days} 
                currentMonth={currentMonth}
                getRecordForDate={getRecordForDate}
              />
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                {Object.entries(ATTENDANCE_STATUS_COLORS).map(([status, colors]) => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={cn("size-3 rounded-full", colors.dot)} />
                    <span className="text-sm text-muted-foreground">
                      {ATTENDANCE_STATUS_LABELS[status as keyof typeof ATTENDANCE_STATUS_LABELS]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          {/* Date Range Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="size-5" />
                Filter Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {startDate ? format(startDate, "PP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {endDate ? format(endDate, "PP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From Month</label>
                    <Select
                      value={startMonthFilter.toString()}
                      onValueChange={(v) => setStartMonthFilter(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((month, index) => (
                          <SelectItem key={month} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To Month</label>
                    <Select
                      value={endMonthFilter.toString()}
                      onValueChange={(v) => setEndMonthFilter(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((month, index) => (
                          <SelectItem key={month} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select
                      value={yearFilter.toString()}
                      onValueChange={(v) => setYearFilter(parseInt(v))}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleMonthRangeFilter}>
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Summary: {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <StatItem label="Total Working Days" value={summary.totalWorkingDays} />
                <StatItem label="Present Days" value={summary.presentDays} color="text-emerald-600" />
                <StatItem label="Absent Days" value={summary.absentDays} color="text-red-600" />
                <StatItem label="Late Days" value={summary.lateDays} color="text-orange-600" />
                <StatItem label="Half Days" value={summary.halfDays} color="text-amber-600" />
                <StatItem label="WFH Days" value={summary.wfhDays} color="text-blue-600" />
                <StatItem label="Leave Days" value={summary.leaveDays} color="text-purple-600" />
                <StatItem label="Holidays" value={summary.holidays} color="text-pink-600" />
                <StatItem label="Weekends" value={summary.weekends} color="text-slate-500" />
                <StatItem label="Total Hours" value={summary.totalHoursWorked} suffix="hrs" />
                <StatItem label="Avg Hours/Day" value={summary.averageHoursPerDay} suffix="hrs" />
                <StatItem label="Overtime" value={summary.overtimeHours} suffix="hrs" color="text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attendance Details</CardTitle>
              <CardDescription>
                Showing {attendanceRecords.length} records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Work Hours</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {format(new Date(record.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(record.date), "EEEE")}
                        </TableCell>
                        <TableCell>
                          <AttendanceStatusBadge status={record.status} />
                        </TableCell>
                        <TableCell>{record.checkIn || "-"}</TableCell>
                        <TableCell>{record.checkOut || "-"}</TableCell>
                        <TableCell>
                          {record.workHours ? `${record.workHours} hrs` : "-"}
                        </TableCell>
                        <TableCell>
                          {record.overtime ? (
                            <span className="text-emerald-600 font-medium">
                              +{record.overtime} hrs
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {record.notes || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SummaryCard({ 
  title, 
  value, 
  icon, 
  color,
  suffix 
}: { 
  title: string
  value: number
  icon: React.ReactNode
  color: string
  suffix?: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
        <p className={cn("text-2xl font-bold", color)}>
          {value}{suffix && <span className="text-base font-normal ml-1">{suffix}</span>}
        </p>
      </CardContent>
    </Card>
  )
}

function StatItem({ 
  label, 
  value, 
  color = "text-foreground",
  suffix
}: { 
  label: string
  value: number
  color?: string
  suffix?: string
}) {
  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className={cn("text-xl font-semibold", color)}>
        {value}{suffix && <span className="text-sm font-normal ml-1">{suffix}</span>}
      </p>
    </div>
  )
}

function AttendanceStatusBadge({ status }: { status: keyof typeof ATTENDANCE_STATUS_COLORS }) {
  const colors = ATTENDANCE_STATUS_COLORS[status]
  return (
    <Badge variant="secondary" className={cn(colors.bg, colors.text, "border-0")}>
      {ATTENDANCE_STATUS_LABELS[status]}
    </Badge>
  )
}

function AttendanceCalendarGrid({ 
  days, 
  currentMonth,
  getRecordForDate 
}: { 
  days: Date[]
  currentMonth: Date
  getRecordForDate: (date: Date) => AttendanceRecord | undefined
}) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  // Get the day of week the month starts on
  const startDay = days[0].getDay()
  
  // Create empty cells for days before the month starts
  const emptyCells = Array.from({ length: startDay }, (_, i) => (
    <div key={`empty-${i}`} className="h-24 bg-muted/30 rounded-lg" />
  ))

  return (
    <TooltipProvider>
      <div className="space-y-2">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {emptyCells}
          {days.map((day) => {
            const record = getRecordForDate(day)
            const statusColors = record 
              ? ATTENDANCE_STATUS_COLORS[record.status] 
              : { bg: "bg-muted/50", text: "text-muted-foreground", dot: "bg-muted" }

            return (
              <Tooltip key={day.toISOString()}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "h-24 p-2 rounded-lg border cursor-pointer transition-colors hover:border-primary/50",
                      statusColors.bg,
                      isToday(day) && "ring-2 ring-primary ring-offset-2"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isToday(day) ? "text-primary" : statusColors.text
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      <div className={cn("size-2 rounded-full", statusColors.dot)} />
                    </div>
                    {record && (
                      <div className="mt-1 space-y-1">
                        <p className={cn("text-xs truncate", statusColors.text)}>
                          {ATTENDANCE_STATUS_LABELS[record.status]}
                        </p>
                        {record.checkIn && (
                          <p className="text-xs text-muted-foreground">
                            {record.checkIn} - {record.checkOut}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">{format(day, "EEEE, MMMM d, yyyy")}</p>
                    {record && (
                      <>
                        <p>Status: {ATTENDANCE_STATUS_LABELS[record.status]}</p>
                        {record.checkIn && <p>Check In: {record.checkIn}</p>}
                        {record.checkOut && <p>Check Out: {record.checkOut}</p>}
                        {record.workHours && <p>Hours Worked: {record.workHours}</p>}
                        {record.overtime && <p>Overtime: {record.overtime} hrs</p>}
                        {record.notes && <p>Notes: {record.notes}</p>}
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}

function generatePDFContent(
  records: AttendanceRecord[],
  summary: AttendanceSummary,
  startDate: Date,
  endDate: Date
): string {
  const formatDateStr = (date: Date) => format(date, "MMMM d, yyyy")
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Attendance Report - ${currentUser.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      padding: 40px; 
      color: #1a1a1a;
      line-height: 1.6;
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-start;
      margin-bottom: 30px; 
      padding-bottom: 20px; 
      border-bottom: 2px solid #2563eb;
    }
    .logo { 
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background: #2563eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    .company-name { font-size: 24px; font-weight: 700; color: #2563eb; }
    .report-title { font-size: 14px; color: #666; margin-top: 4px; }
    .employee-info { text-align: right; }
    .employee-name { font-size: 18px; font-weight: 600; }
    .employee-details { font-size: 13px; color: #666; }
    .date-range { 
      background: #f8fafc; 
      padding: 16px 20px; 
      border-radius: 8px; 
      margin-bottom: 24px;
      border-left: 4px solid #2563eb;
    }
    .date-range-title { font-weight: 600; color: #333; margin-bottom: 4px; }
    .date-range-value { color: #666; }
    .summary { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 16px; 
      margin-bottom: 30px; 
    }
    .summary-item { 
      padding: 16px; 
      border-radius: 8px; 
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .summary-item.present { background: #ecfdf5; border-color: #10b981; }
    .summary-item.absent { background: #fef2f2; border-color: #ef4444; }
    .summary-item.late { background: #fff7ed; border-color: #f97316; }
    .summary-item.wfh { background: #eff6ff; border-color: #3b82f6; }
    .summary-item.leave { background: #faf5ff; border-color: #a855f7; }
    .summary-item.hours { background: #f8fafc; border-color: #64748b; }
    .summary-value { font-size: 28px; font-weight: 700; }
    .summary-label { font-size: 12px; color: #666; margin-top: 4px; }
    .summary-item.present .summary-value { color: #10b981; }
    .summary-item.absent .summary-value { color: #ef4444; }
    .summary-item.late .summary-value { color: #f97316; }
    .summary-item.wfh .summary-value { color: #3b82f6; }
    .summary-item.leave .summary-value { color: #a855f7; }
    .summary-item.hours .summary-value { color: #64748b; }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-top: 20px;
      font-size: 12px;
    }
    th { 
      background: #f8fafc; 
      padding: 12px 8px; 
      text-align: left; 
      font-weight: 600;
      border-bottom: 2px solid #e2e8f0;
      color: #475569;
    }
    td { 
      padding: 10px 8px; 
      border-bottom: 1px solid #f1f5f9;
    }
    tr:hover { background: #fafafa; }
    .status { 
      display: inline-block;
      padding: 4px 8px; 
      border-radius: 4px; 
      font-size: 11px;
      font-weight: 500;
    }
    .status-present { background: #dcfce7; color: #166534; }
    .status-absent { background: #fee2e2; color: #991b1b; }
    .status-late { background: #ffedd5; color: #9a3412; }
    .status-half_day { background: #fef3c7; color: #92400e; }
    .status-wfh { background: #dbeafe; color: #1e40af; }
    .status-on_leave { background: #f3e8ff; color: #7c3aed; }
    .status-holiday { background: #fce7f3; color: #be185d; }
    .status-weekend { background: #f1f5f9; color: #64748b; }
    .footer { 
      margin-top: 40px; 
      padding-top: 20px; 
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
    }
    @media print {
      body { padding: 20px; }
      .summary { grid-template-columns: repeat(3, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-icon">IX</div>
      <div>
        <div class="company-name">Ixora Solutions</div>
        <div class="report-title">Leave Management System - Attendance Report</div>
      </div>
    </div>
    <div class="employee-info">
      <div class="employee-name">${currentUser.name}</div>
      <div class="employee-details">${currentUser.department} • ${currentUser.email}</div>
      <div class="employee-details">Employee ID: ${currentUser.id}</div>
    </div>
  </div>

  <div class="date-range">
    <div class="date-range-title">Report Period</div>
    <div class="date-range-value">${formatDateStr(startDate)} - ${formatDateStr(endDate)}</div>
  </div>

  <div class="summary">
    <div class="summary-item present">
      <div class="summary-value">${summary.presentDays}</div>
      <div class="summary-label">Present Days</div>
    </div>
    <div class="summary-item absent">
      <div class="summary-value">${summary.absentDays}</div>
      <div class="summary-label">Absent Days</div>
    </div>
    <div class="summary-item late">
      <div class="summary-value">${summary.lateDays}</div>
      <div class="summary-label">Late Days</div>
    </div>
    <div class="summary-item wfh">
      <div class="summary-value">${summary.wfhDays}</div>
      <div class="summary-label">WFH Days</div>
    </div>
    <div class="summary-item leave">
      <div class="summary-value">${summary.leaveDays}</div>
      <div class="summary-label">On Leave</div>
    </div>
    <div class="summary-item hours">
      <div class="summary-value">${summary.totalHoursWorked}</div>
      <div class="summary-label">Total Hours</div>
    </div>
  </div>

  <h3 style="margin-bottom: 8px; color: #1e293b;">Attendance Details</h3>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Status</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th>Hours</th>
        <th>Overtime</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${records.map(record => `
        <tr>
          <td>${format(new Date(record.date), "MMM d, yyyy")}</td>
          <td>${format(new Date(record.date), "EEEE")}</td>
          <td><span class="status status-${record.status}">${ATTENDANCE_STATUS_LABELS[record.status]}</span></td>
          <td>${record.checkIn || "-"}</td>
          <td>${record.checkOut || "-"}</td>
          <td>${record.workHours ? record.workHours + " hrs" : "-"}</td>
          <td>${record.overtime ? "+" + record.overtime + " hrs" : "-"}</td>
          <td>${record.notes || "-"}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="footer">
    Generated on ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")} • Ixora Solutions LMS
  </div>
</body>
</html>
  `
}
