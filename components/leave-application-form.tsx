"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format, differenceInDays, isWeekend, addDays, eachDayOfInterval } from "date-fns"
import { CalendarIcon, Upload, AlertCircle, Info, CheckCircle } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { leaveBalances, holidays, teamOnLeave } from "@/lib/mock-data"
import { LEAVE_TYPE_LABELS, type LeaveType } from "@/lib/types"

const leaveTypes: LeaveType[] = ["annual", "sick", "casual", "wfh", "comp_off", "unpaid"]

export function LeaveApplicationForm() {
  const router = useRouter()
  const [leaveType, setLeaveType] = React.useState<LeaveType>("annual")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [isHalfDay, setIsHalfDay] = React.useState(false)
  const [halfDayPeriod, setHalfDayPeriod] = React.useState<"morning" | "afternoon">("morning")
  const [reason, setReason] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const selectedBalance = leaveBalances.find((b) => b.type === leaveType)

  // Calculate leave days (excluding weekends)
  const calculateLeaveDays = () => {
    if (!dateRange?.from) return 0
    if (!dateRange.to) return isHalfDay ? 0.5 : 1

    const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
    const workingDays = days.filter((day) => !isWeekend(day)).length
    
    return isHalfDay ? 0.5 : workingDays
  }

  const leaveDays = calculateLeaveDays()
  const hasEnoughBalance = selectedBalance ? selectedBalance.available >= leaveDays : false

  // Check for conflicts
  const hasHolidayConflict = React.useMemo(() => {
    if (!dateRange?.from) return false
    const endDate = dateRange.to || dateRange.from
    
    return holidays.some((h) => {
      const holidayDate = new Date(h.date)
      return holidayDate >= dateRange.from! && holidayDate <= endDate
    })
  }, [dateRange])

  const conflictingHoliday = React.useMemo(() => {
    if (!dateRange?.from) return null
    const endDate = dateRange.to || dateRange.from
    
    return holidays.find((h) => {
      const holidayDate = new Date(h.date)
      return holidayDate >= dateRange.from! && holidayDate <= endDate
    })
  }, [dateRange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Redirect after success
    setTimeout(() => {
      router.push("/leave/history")
    }, 2000)
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="size-8 text-success" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Leave Request Submitted</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Your leave request has been submitted successfully and is pending approval.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Redirecting to leave history...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Leave Request Details</CardTitle>
          <CardDescription>
            Fill in the details below to submit your leave request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Leave Type Selection */}
          <div className="space-y-3">
            <Label className="text-base">Leave Type</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {leaveTypes.map((type) => {
                const balance = leaveBalances.find((b) => b.type === type)
                const isSelected = leaveType === type
                
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLeaveType(type)}
                    className={cn(
                      "flex flex-col items-start rounded-lg border p-3 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <span className="font-medium text-sm">
                      {LEAVE_TYPE_LABELS[type]}
                    </span>
                    {balance && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {balance.available} days available
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Balance Preview */}
          {selectedBalance && (
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {LEAVE_TYPE_LABELS[leaveType]} Balance
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedBalance.available} / {selectedBalance.total} days
                </span>
              </div>
              <Progress
                value={(selectedBalance.used / selectedBalance.total) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Used: {selectedBalance.used}</span>
                <span>Pending: {selectedBalance.pending}</span>
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div className="space-y-3">
            <Label className="text-base">Select Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Half Day Toggle */}
          {dateRange?.from && !dateRange.to && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Half Day Leave</Label>
                  <p className="text-xs text-muted-foreground">
                    Apply for only half of the day
                  </p>
                </div>
                <Switch checked={isHalfDay} onCheckedChange={setIsHalfDay} />
              </div>
              
              {isHalfDay && (
                <RadioGroup
                  value={halfDayPeriod}
                  onValueChange={(v) => setHalfDayPeriod(v as "morning" | "afternoon")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning" className="cursor-pointer">
                      Morning (9 AM - 1 PM)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon" className="cursor-pointer">
                      Afternoon (2 PM - 6 PM)
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          )}

          {/* Leave Summary */}
          {dateRange?.from && (
            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-medium">Leave Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Start Date</span>
                  <p className="font-medium">{format(dateRange.from, "EEEE, MMM d, yyyy")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">End Date</span>
                  <p className="font-medium">
                    {dateRange.to
                      ? format(dateRange.to, "EEEE, MMM d, yyyy")
                      : format(dateRange.from, "EEEE, MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Days</span>
                  <p className="font-medium">{leaveDays} {leaveDays === 1 ? "day" : "days"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Return to Work</span>
                  <p className="font-medium">
                    {format(
                      addDays(dateRange.to || dateRange.from, 1),
                      "EEEE, MMM d"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warnings */}
          {hasHolidayConflict && conflictingHoliday && (
            <Alert variant="default" className="bg-warning/10 border-warning/30">
              <Info className="size-4 text-warning" />
              <AlertTitle className="text-warning">Holiday Overlap</AlertTitle>
              <AlertDescription>
                Your selected dates include <strong>{conflictingHoliday.name}</strong> on{" "}
                {format(new Date(conflictingHoliday.date), "MMM d, yyyy")}. Consider adjusting your dates.
              </AlertDescription>
            </Alert>
          )}

          {!hasEnoughBalance && leaveDays > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>Insufficient Balance</AlertTitle>
              <AlertDescription>
                You have only {selectedBalance?.available} days available but requesting {leaveDays} days.
              </AlertDescription>
            </Alert>
          )}

          {/* Team on Leave Preview */}
          {dateRange?.from && teamOnLeave.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Team Availability</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {teamOnLeave.length} team member(s) are on leave during this period:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {teamOnLeave.map((member) => (
                  <Badge key={member.id} variant="secondary">
                    {member.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-base">
              Reason for Leave
              {(leaveType === "sick" || leaveType === "unpaid") && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Textarea
              id="reason"
              placeholder="Please provide the reason for your leave request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required={leaveType === "sick" || leaveType === "unpaid"}
            />
            <p className="text-xs text-muted-foreground">
              {leaveType === "sick"
                ? "Required for sick leave. Please attach medical certificate if available."
                : "Optional, but helps your manager understand your request."}
            </p>
          </div>

          {/* File Upload */}
          {leaveType === "sick" && (
            <div className="space-y-2">
              <Label className="text-base">Medical Certificate (Optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="size-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                </label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              !dateRange?.from ||
              !hasEnoughBalance ||
              isSubmitting ||
              (leaveType === "sick" && !reason) ||
              (leaveType === "unpaid" && !reason)
            }
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
