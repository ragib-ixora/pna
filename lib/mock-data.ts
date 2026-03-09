import type { User, LeaveBalance, LeaveRequest, Holiday, Notification, AttendanceRecord, AttendanceSummary, AttendanceStatus } from "./types"

export const currentUser: User = {
  id: "1",
  name: "Priya Sharma",
  email: "priya.sharma@ixora.com",
  role: "supervisor",
  department: "Engineering",
  avatar: "",
  joinDate: "2022-03-15",
}

export const leaveBalances: LeaveBalance[] = [
  { type: "annual", total: 21, used: 8, pending: 2, available: 11 },
  { type: "sick", total: 12, used: 3, pending: 0, available: 9 },
  { type: "casual", total: 7, used: 2, pending: 1, available: 4 },
  { type: "wfh", total: 24, used: 10, pending: 0, available: 14 },
  { type: "comp_off", total: 3, used: 1, pending: 0, available: 2 },
]

export const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Priya Sharma",
    type: "annual",
    startDate: "2026-03-15",
    endDate: "2026-03-18",
    reason: "Family vacation planned to Goa",
    status: "pending",
    appliedOn: "2026-03-05",
  },
  {
    id: "2",
    userId: "1",
    userName: "Priya Sharma",
    type: "sick",
    startDate: "2026-02-20",
    endDate: "2026-02-21",
    reason: "Feeling unwell, doctor advised rest",
    status: "approved",
    appliedOn: "2026-02-20",
    approvedBy: "Rajesh Kumar",
    approvedOn: "2026-02-20",
  },
  {
    id: "3",
    userId: "1",
    userName: "Priya Sharma",
    type: "wfh",
    startDate: "2026-02-10",
    endDate: "2026-02-10",
    reason: "Plumber visit scheduled",
    status: "approved",
    appliedOn: "2026-02-08",
    approvedBy: "Rajesh Kumar",
    approvedOn: "2026-02-08",
  },
  {
    id: "4",
    userId: "1",
    userName: "Priya Sharma",
    type: "casual",
    startDate: "2026-01-26",
    endDate: "2026-01-26",
    halfDay: "morning",
    reason: "Personal errands",
    status: "approved",
    appliedOn: "2026-01-24",
    approvedBy: "Rajesh Kumar",
    approvedOn: "2026-01-24",
  },
]

export const pendingApprovals: LeaveRequest[] = [
  {
    id: "5",
    userId: "2",
    userName: "Amit Patel",
    userAvatar: "",
    type: "annual",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    reason: "Attending a family wedding in Mumbai",
    status: "pending",
    appliedOn: "2026-03-06",
  },
  {
    id: "6",
    userId: "3",
    userName: "Sneha Reddy",
    userAvatar: "",
    type: "sick",
    startDate: "2026-03-09",
    endDate: "2026-03-10",
    reason: "Migraine, need rest",
    status: "pending",
    appliedOn: "2026-03-09",
  },
  {
    id: "7",
    userId: "4",
    userName: "Vikram Singh",
    userAvatar: "",
    type: "wfh",
    startDate: "2026-03-12",
    endDate: "2026-03-12",
    reason: "Internet installation at new apartment",
    status: "pending",
    appliedOn: "2026-03-08",
  },
]

export const teamOnLeave = [
  { id: "5", name: "Kavitha Menon", type: "annual" as const, until: "Mar 11" },
  { id: "6", name: "Rahul Verma", type: "wfh" as const, until: "Today" },
]

export const holidays: Holiday[] = [
  { id: "1", name: "Holi", date: "2026-03-14", type: "public" },
  { id: "2", name: "Good Friday", date: "2026-04-03", type: "public" },
  { id: "3", name: "Ugadi", date: "2026-03-22", type: "optional" },
  { id: "4", name: "Independence Day", date: "2026-08-15", type: "public" },
  { id: "5", name: "Diwali", date: "2026-11-11", type: "public" },
]

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Leave Approved",
    message: "Your sick leave request for Feb 20-21 has been approved by Rajesh Kumar.",
    type: "success",
    read: false,
    createdAt: "2026-02-20T10:30:00Z",
    link: "/leave/history",
  },
  {
    id: "2",
    title: "New Leave Request",
    message: "Amit Patel has requested annual leave for Mar 20-22.",
    type: "info",
    read: false,
    createdAt: "2026-03-06T09:15:00Z",
    link: "/team/approvals",
  },
  {
    id: "3",
    title: "Upcoming Holiday",
    message: "Reminder: Holi holiday on March 14, 2026.",
    type: "info",
    read: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
]

// Helper function to generate attendance records
export function generateAttendanceRecords(
  userId: string,
  startDate: Date,
  endDate: Date
): AttendanceRecord[] {
  const records: AttendanceRecord[] = []
  const currentDate = new Date(startDate)
  let id = 1

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0]
    const dayOfWeek = currentDate.getDay()
    
    // Check if it's a weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      records.push({
        id: `att-${id++}`,
        userId,
        date: dateStr,
        status: "weekend",
      })
    } 
    // Check if it's a holiday
    else if (holidays.some(h => h.date === dateStr)) {
      records.push({
        id: `att-${id++}`,
        userId,
        date: dateStr,
        status: "holiday",
        notes: holidays.find(h => h.date === dateStr)?.name,
      })
    }
    // Check if on leave
    else if (leaveRequests.some(l => 
      l.userId === userId && 
      l.status === "approved" && 
      new Date(l.startDate) <= currentDate && 
      new Date(l.endDate) >= currentDate
    )) {
      const leave = leaveRequests.find(l => 
        l.userId === userId && 
        l.status === "approved" && 
        new Date(l.startDate) <= currentDate && 
        new Date(l.endDate) >= currentDate
      )
      records.push({
        id: `att-${id++}`,
        userId,
        date: dateStr,
        status: leave?.type === "wfh" ? "wfh" : "on_leave",
        leaveType: leave?.type,
        notes: leave?.reason,
      })
    }
    // Regular working days - randomize for demo
    else {
      const random = Math.random()
      let status: AttendanceStatus = "present"
      let checkIn = "09:00"
      let checkOut = "18:00"
      let workHours = 9
      let overtime = 0
      
      if (random < 0.1) {
        status = "late"
        checkIn = `09:${Math.floor(Math.random() * 45 + 15).toString().padStart(2, "0")}`
        workHours = 8.5
      } else if (random < 0.15) {
        status = "half_day"
        checkOut = "13:30"
        workHours = 4.5
      } else if (random < 0.2) {
        status = "wfh"
      } else if (random > 0.9) {
        overtime = Math.floor(Math.random() * 3) + 1
        checkOut = `${18 + overtime}:00`
        workHours = 9 + overtime
      }
      
      records.push({
        id: `att-${id++}`,
        userId,
        date: dateStr,
        status,
        checkIn,
        checkOut,
        workHours,
        overtime: overtime > 0 ? overtime : undefined,
      })
    }
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return records
}

export function calculateAttendanceSummary(records: AttendanceRecord[]): AttendanceSummary {
  const summary: AttendanceSummary = {
    totalWorkingDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    halfDays: 0,
    wfhDays: 0,
    leaveDays: 0,
    holidays: 0,
    weekends: 0,
    totalHoursWorked: 0,
    averageHoursPerDay: 0,
    overtimeHours: 0,
  }

  records.forEach((record) => {
    switch (record.status) {
      case "present":
        summary.presentDays++
        summary.totalWorkingDays++
        break
      case "absent":
        summary.absentDays++
        summary.totalWorkingDays++
        break
      case "late":
        summary.lateDays++
        summary.presentDays++
        summary.totalWorkingDays++
        break
      case "half_day":
        summary.halfDays++
        summary.totalWorkingDays++
        break
      case "wfh":
        summary.wfhDays++
        summary.totalWorkingDays++
        break
      case "on_leave":
        summary.leaveDays++
        summary.totalWorkingDays++
        break
      case "holiday":
        summary.holidays++
        break
      case "weekend":
        summary.weekends++
        break
    }
    
    if (record.workHours) {
      summary.totalHoursWorked += record.workHours
    }
    if (record.overtime) {
      summary.overtimeHours += record.overtime
    }
  })

  summary.averageHoursPerDay = summary.totalWorkingDays > 0 
    ? Math.round((summary.totalHoursWorked / summary.presentDays) * 10) / 10 
    : 0

  return summary
}
