"use client"

import * as React from "react"
import { Download, TrendingDown, TrendingUp, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_COLORS } from "@/lib/types"

const teamMembers = [
  {
    id: "1",
    name: "Priya Sharma",
    department: "Engineering",
    totalLeaves: 67,
    usedLeaves: 12,
    pendingLeaves: 2,
    leaveBreakdown: { annual: 8, sick: 2, casual: 2 },
  },
  {
    id: "2",
    name: "Amit Patel",
    department: "Engineering",
    totalLeaves: 67,
    usedLeaves: 8,
    pendingLeaves: 3,
    leaveBreakdown: { annual: 5, sick: 1, casual: 2 },
  },
  {
    id: "3",
    name: "Sneha Reddy",
    department: "Design",
    totalLeaves: 67,
    usedLeaves: 15,
    pendingLeaves: 0,
    leaveBreakdown: { annual: 10, sick: 3, casual: 2 },
  },
  {
    id: "4",
    name: "Vikram Singh",
    department: "Engineering",
    totalLeaves: 67,
    usedLeaves: 5,
    pendingLeaves: 1,
    leaveBreakdown: { annual: 3, sick: 1, casual: 1 },
  },
  {
    id: "5",
    name: "Kavitha Menon",
    department: "Product",
    totalLeaves: 67,
    usedLeaves: 10,
    pendingLeaves: 0,
    leaveBreakdown: { annual: 6, sick: 2, casual: 2 },
  },
]

const monthlyData = [
  { month: "Jan", leaves: 15 },
  { month: "Feb", leaves: 22 },
  { month: "Mar", leaves: 18 },
  { month: "Apr", leaves: 12 },
  { month: "May", leaves: 8 },
  { month: "Jun", leaves: 25 },
]

export function TeamReports() {
  const [period, setPeriod] = React.useState("this-year")

  const totalUsed = teamMembers.reduce((acc, m) => acc + m.usedLeaves, 0)
  const totalPending = teamMembers.reduce((acc, m) => acc + m.pendingLeaves, 0)
  const avgUtilization = Math.round(
    (totalUsed / (teamMembers.length * 67)) * 100
  )

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Team Members</CardDescription>
            <CardTitle className="text-3xl">{teamMembers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Leave Taken</CardDescription>
            <CardTitle className="text-3xl">{totalUsed}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="size-3 text-success" />
              <span className="text-success">12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <CardTitle className="text-3xl text-warning">{totalPending}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Utilization</CardDescription>
            <CardTitle className="text-3xl">{avgUtilization}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={avgUtilization} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leave by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leave by Type</CardTitle>
            <CardDescription>Distribution of leave types taken</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "annual" as const, value: 32, total: 50 },
                { type: "sick" as const, value: 9, total: 20 },
                { type: "casual" as const, value: 9, total: 15 },
                { type: "wfh" as const, value: 24, total: 40 },
              ].map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary" className={cn(LEAVE_TYPE_COLORS[item.type])}>
                      {LEAVE_TYPE_LABELS[item.type]}
                    </Badge>
                    <span className="text-muted-foreground">
                      {item.value} / {item.total} days
                    </span>
                  </div>
                  <Progress
                    value={(item.value / item.total) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Trend</CardTitle>
            <CardDescription>Leave taken per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-[200px]">
              {monthlyData.map((item) => {
                const height = (item.leaves / 30) * 100
                return (
                  <div
                    key={item.month}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div
                      className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{item.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Member Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Member Leave Summary</CardTitle>
          <CardDescription>Individual leave utilization for each team member</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Used</TableHead>
                <TableHead className="text-center">Pending</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => {
                const available = member.totalLeaves - member.usedLeaves - member.pendingLeaves
                const utilization = Math.round((member.usedLeaves / member.totalLeaves) * 100)

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-muted text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.department}
                    </TableCell>
                    <TableCell className="text-center">{member.totalLeaves}</TableCell>
                    <TableCell className="text-center font-medium">
                      {member.usedLeaves}
                    </TableCell>
                    <TableCell className="text-center">
                      {member.pendingLeaves > 0 ? (
                        <Badge variant="secondary" className="bg-warning/10 text-warning">
                          {member.pendingLeaves}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-success font-medium">
                      {available}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={utilization} className="h-2 w-16" />
                        <span className="text-sm text-muted-foreground">
                          {utilization}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
