export type UserRole = "employee" | "supervisor" | "hr_admin" | "system_admin"

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled"

export type LeaveType = 
  | "annual"
  | "sick"
  | "casual"
  | "unpaid"
  | "maternity"
  | "paternity"
  | "wfh"
  | "comp_off"
  | "bereavement"
  | "marriage"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  avatar?: string
  managerId?: string
  joinDate: string
}

export interface LeaveBalance {
  type: LeaveType
  total: number
  used: number
  pending: number
  available: number
}

export interface LeaveRequest {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  type: LeaveType
  startDate: string
  endDate: string
  halfDay?: "morning" | "afternoon"
  reason: string
  status: LeaveStatus
  appliedOn: string
  approvedBy?: string
  approvedOn?: string
  comments?: string
  attachments?: string[]
}

export interface Holiday {
  id: string
  name: string
  date: string
  type: "public" | "optional" | "regional"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  link?: string
}

export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  annual: "Annual Leave",
  sick: "Sick Leave",
  casual: "Casual Leave",
  unpaid: "Unpaid Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave",
  wfh: "Work From Home",
  comp_off: "Compensatory Off",
  bereavement: "Bereavement Leave",
  marriage: "Marriage Leave",
}

export const LEAVE_TYPE_COLORS: Record<LeaveType, string> = {
  annual: "bg-blue-100 text-blue-800",
  sick: "bg-red-100 text-red-800",
  casual: "bg-green-100 text-green-800",
  unpaid: "bg-gray-100 text-gray-800",
  maternity: "bg-pink-100 text-pink-800",
  paternity: "bg-indigo-100 text-indigo-800",
  wfh: "bg-cyan-100 text-cyan-800",
  comp_off: "bg-orange-100 text-orange-800",
  bereavement: "bg-slate-100 text-slate-800",
  marriage: "bg-rose-100 text-rose-800",
}

export const STATUS_COLORS: Record<LeaveStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
}

// Attendance Types
export type AttendanceStatus = 
  | "present"
  | "absent"
  | "half_day"
  | "late"
  | "wfh"
  | "on_leave"
  | "holiday"
  | "weekend"

export interface AttendanceRecord {
  id: string
  userId: string
  date: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
  workHours?: number
  overtime?: number
  notes?: string
  leaveType?: LeaveType
}

export interface AttendanceSummary {
  totalWorkingDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  halfDays: number
  wfhDays: number
  leaveDays: number
  holidays: number
  weekends: number
  totalHoursWorked: number
  averageHoursPerDay: number
  overtimeHours: number
}

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "Present",
  absent: "Absent",
  half_day: "Half Day",
  late: "Late",
  wfh: "Work From Home",
  on_leave: "On Leave",
  holiday: "Holiday",
  weekend: "Weekend",
}

export const ATTENDANCE_STATUS_COLORS: Record<AttendanceStatus, { bg: string; text: string; dot: string }> = {
  present: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  absent: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  half_day: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  late: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  wfh: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  on_leave: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  holiday: { bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-500" },
  weekend: { bg: "bg-slate-50", text: "text-slate-500", dot: "bg-slate-400" },
}
