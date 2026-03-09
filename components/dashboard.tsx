"use client"

import Link from "next/link"
import { format, differenceInDays } from "date-fns"
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  PlusCircle,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  leaveBalances,
  leaveRequests,
  pendingApprovals,
  teamOnLeave,
  holidays,
  currentUser,
} from "@/lib/mock-data"
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_COLORS, STATUS_COLORS } from "@/lib/types"

function LeaveBalanceCard({
  type,
  total,
  used,
  available,
}: {
  type: string
  total: number
  used: number
  available: number
}) {
  const percentage = (used / total) * 100

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs font-medium uppercase tracking-wider">
          {LEAVE_TYPE_LABELS[type as keyof typeof LEAVE_TYPE_LABELS]}
        </CardDescription>
        <CardTitle className="text-3xl font-bold">{available}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={percentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Used: {used}</span>
          <span>Total: {total}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  variant = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  variant?: "default" | "primary"
}) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "group cursor-pointer transition-all hover:shadow-md",
          variant === "primary" && "bg-primary text-primary-foreground"
        )}
      >
        <CardContent className="flex items-center gap-4 p-4">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-lg",
              variant === "primary"
                ? "bg-primary-foreground/10"
                : "bg-primary/10"
            )}
          >
            <Icon
              className={cn(
                "size-6",
                variant === "primary" ? "text-primary-foreground" : "text-primary"
              )}
            />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p
              className={cn(
                "text-sm",
                variant === "primary"
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function RecentLeaveItem({ request }: { request: (typeof leaveRequests)[0] }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg text-sm font-medium",
            LEAVE_TYPE_COLORS[request.type]
          )}
        >
          {format(new Date(request.startDate), "dd")}
        </div>
        <div>
          <p className="font-medium text-sm">
            {LEAVE_TYPE_LABELS[request.type]}
            {request.halfDay && ` (${request.halfDay === "morning" ? "AM" : "PM"})`}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(request.startDate), "MMM d")}
            {request.startDate !== request.endDate &&
              ` - ${format(new Date(request.endDate), "MMM d")}`}
          </p>
        </div>
      </div>
      <Badge
        variant="secondary"
        className={cn("capitalize", STATUS_COLORS[request.status])}
      >
        {request.status}
      </Badge>
    </div>
  )
}

function PendingApprovalCard({
  request,
}: {
  request: (typeof pendingApprovals)[0]
}) {
  const days =
    differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={request.userAvatar} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                {request.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{request.userName}</p>
              <p className="text-xs text-muted-foreground">
                {LEAVE_TYPE_LABELS[request.type]} &bull; {days} day{days > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className={cn(LEAVE_TYPE_COLORS[request.type])}>
            {format(new Date(request.startDate), "MMM d")}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {request.reason}
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1">
            <CheckCircle2 className="mr-1 size-4" />
            Approve
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <XCircle className="mr-1 size-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingHolidayItem({ holiday }: { holiday: (typeof holidays)[0] }) {
  const daysUntil = differenceInDays(new Date(holiday.date), new Date())
  
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-muted text-xs">
          <span className="font-semibold">{format(new Date(holiday.date), "d")}</span>
          <span className="text-muted-foreground">{format(new Date(holiday.date), "MMM")}</span>
        </div>
        <div>
          <p className="text-sm font-medium">{holiday.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{holiday.type}</p>
        </div>
      </div>
      {daysUntil >= 0 && (
        <span className="text-xs text-muted-foreground">
          {daysUntil === 0 ? "Today" : `in ${daysUntil} days`}
        </span>
      )}
    </div>
  )
}

export function Dashboard() {
  const isManager = currentUser.role === "supervisor" || currentUser.role === "hr_admin"
  const upcomingHolidays = holidays
    .filter((h) => new Date(h.date) >= new Date())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {leaveBalances.slice(0, 5).map((balance) => (
          <LeaveBalanceCard
            key={balance.type}
            type={balance.type}
            total={balance.total}
            used={balance.used}
            available={balance.available}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickActionCard
          icon={PlusCircle}
          title="Apply Leave"
          description="Submit a new leave request"
          href="/leave/apply"
          variant="primary"
        />
        <QuickActionCard
          icon={Calendar}
          title="Leave History"
          description="View your past requests"
          href="/leave/history"
        />
        <QuickActionCard
          icon={CalendarDays}
          title="Team Calendar"
          description="See who's on leave"
          href="/team/calendar"
        />
        <QuickActionCard
          icon={FileText}
          title="HR Policies"
          description="Company leave policies"
          href="/documents/policies"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Leave Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Leave Requests</CardTitle>
              <CardDescription>Your latest leave activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/leave/history">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {leaveRequests.length > 0 ? (
              <div className="divide-y">
                {leaveRequests.slice(0, 4).map((request) => (
                  <RecentLeaveItem key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="size-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No recent leave requests
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Team on Leave */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <CardTitle className="text-base">Team on Leave</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {teamOnLeave.length > 0 ? (
                <div className="space-y-3">
                  {teamOnLeave.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-muted text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Until {member.until}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          LEAVE_TYPE_COLORS[member.type]
                        )}
                      >
                        {LEAVE_TYPE_LABELS[member.type]}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No team members on leave
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                <CardTitle className="text-base">Upcoming Holidays</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingHolidays.length > 0 ? (
                <div className="space-y-1">
                  {upcomingHolidays.map((holiday) => (
                    <UpcomingHolidayItem key={holiday.id} holiday={holiday} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming holidays
                </p>
              )}
              <Button variant="link" size="sm" className="mt-2 h-auto p-0" asChild>
                <Link href="/documents/holidays">View full calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pending Approvals (for managers) */}
      {isManager && pendingApprovals.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="size-5 text-warning" />
                Pending Approvals
              </CardTitle>
              <CardDescription>
                {pendingApprovals.length} request{pendingApprovals.length > 1 ? "s" : ""} awaiting your action
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/team/approvals">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pendingApprovals.slice(0, 3).map((request) => (
                <PendingApprovalCard key={request.id} request={request} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
