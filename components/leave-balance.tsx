"use client"

import * as React from "react"
import Link from "next/link"
import { PlusCircle, TrendingDown, TrendingUp, Calendar, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { leaveBalances, currentUser } from "@/lib/mock-data"
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_COLORS } from "@/lib/types"

const leaveTypeDescriptions: Record<string, string> = {
  annual: "Earned leave that can be carried forward to next year (max 30 days)",
  sick: "For health-related absences. Medical certificate required for 3+ days",
  casual: "For personal matters. Cannot be combined with other leave types",
  wfh: "Work from home days for flexibility. Requires manager approval",
  comp_off: "Compensatory off for extra hours worked on weekends/holidays",
  unpaid: "Leave without pay when other balances are exhausted",
  maternity: "60 days paid leave for expecting mothers",
  paternity: "15 days paid leave for new fathers",
  bereavement: "5 days leave in case of family bereavement",
  marriage: "15 days leave for your own marriage",
}

function BalanceCard({
  type,
  total,
  used,
  pending,
  available,
}: {
  type: string
  total: number
  used: number
  pending: number
  available: number
}) {
  const usedPercentage = (used / total) * 100
  const pendingPercentage = (pending / total) * 100
  const availablePercentage = (available / total) * 100

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className={cn(LEAVE_TYPE_COLORS[type])}>
              {LEAVE_TYPE_LABELS[type as keyof typeof LEAVE_TYPE_LABELS]}
            </Badge>
            <CardTitle className="mt-3 text-4xl font-bold tracking-tight">
              {available}
              <span className="text-lg font-normal text-muted-foreground">
                {" "}/ {total}
              </span>
            </CardTitle>
            <CardDescription className="mt-1">days available</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <Info className="size-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{leaveTypeDescriptions[type] || "Leave balance details"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stacked Progress Bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div className="flex h-full">
            <div
              className="bg-primary transition-all"
              style={{ width: `${usedPercentage}%` }}
            />
            <div
              className="bg-warning transition-all"
              style={{ width: `${pendingPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Used</span>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-primary" />
              <span className="font-medium">{used}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Pending</span>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-warning" />
              <span className="font-medium">{pending}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Available</span>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-muted" />
              <span className="font-medium">{available}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryCard() {
  const totalAvailable = leaveBalances.reduce((sum, b) => sum + b.available, 0)
  const totalUsed = leaveBalances.reduce((sum, b) => sum + b.used, 0)
  const totalDays = leaveBalances.reduce((sum, b) => sum + b.total, 0)

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Total Leave Summary</CardTitle>
        <CardDescription className="text-primary-foreground/70">
          Your overall leave balance for {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-bold">{totalAvailable}</p>
            <p className="text-sm text-primary-foreground/70">Available</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold">{totalUsed}</p>
            <p className="text-sm text-primary-foreground/70">Used</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold">{totalDays}</p>
            <p className="text-sm text-primary-foreground/70">Total</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link href="/leave/apply">
              <PlusCircle className="mr-2 size-4" />
              Apply Leave
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link href="/leave/history">
              <Calendar className="mr-2 size-4" />
              History
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LeavePolicy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leave Policy Highlights</CardTitle>
        <CardDescription>Key points from the company leave policy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
              1
            </div>
            <div>
              <p className="font-medium">Annual Leave Accrual</p>
              <p className="text-muted-foreground">
                1.75 days per month, credited at the start of each month
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
              2
            </div>
            <div>
              <p className="font-medium">Carry Forward</p>
              <p className="text-muted-foreground">
                Maximum 30 days annual leave can be carried to next year
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
              3
            </div>
            <div>
              <p className="font-medium">Sick Leave</p>
              <p className="text-muted-foreground">
                Medical certificate required for sick leave exceeding 2 consecutive days
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
              4
            </div>
            <div>
              <p className="font-medium">Notice Period</p>
              <p className="text-muted-foreground">
                Annual leave requires 7 days advance notice for planned leaves
              </p>
            </div>
          </div>
        </div>
        <Button variant="link" className="h-auto p-0" asChild>
          <Link href="/documents/policies">View full policy document</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export function LeaveBalance() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Summary Card */}
        <SummaryCard />

        {/* Leave Policy */}
        <div className="lg:col-span-2">
          <LeavePolicy />
        </div>
      </div>

      {/* Individual Balance Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Balance by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leaveBalances.map((balance) => (
            <BalanceCard
              key={balance.type}
              type={balance.type}
              total={balance.total}
              used={balance.used}
              pending={balance.pending}
              available={balance.available}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
