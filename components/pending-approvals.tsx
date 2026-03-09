"use client"

import * as React from "react"
import { format, differenceInDays } from "date-fns"
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Filter,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { pendingApprovals } from "@/lib/mock-data"
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_COLORS } from "@/lib/types"

// Extended mock data with more requests
const allRequests = [
  ...pendingApprovals,
  {
    id: "8",
    userId: "8",
    userName: "Meera Nair",
    userAvatar: "",
    type: "casual" as const,
    startDate: "2026-03-25",
    endDate: "2026-03-25",
    halfDay: "afternoon" as const,
    reason: "Personal appointment in the afternoon",
    status: "pending" as const,
    appliedOn: "2026-03-08",
  },
  {
    id: "9",
    userId: "9",
    userName: "Arjun Kapoor",
    userAvatar: "",
    type: "comp_off" as const,
    startDate: "2026-03-13",
    endDate: "2026-03-13",
    reason: "Comp-off for weekend work on March 7",
    status: "pending" as const,
    appliedOn: "2026-03-09",
  },
]

const approvedRequests = [
  {
    id: "10",
    userId: "10",
    userName: "Divya Krishnan",
    userAvatar: "",
    type: "annual" as const,
    startDate: "2026-03-05",
    endDate: "2026-03-06",
    reason: "Family function",
    status: "approved" as const,
    appliedOn: "2026-02-28",
    approvedOn: "2026-03-01",
  },
]

const rejectedRequests = [
  {
    id: "11",
    userId: "11",
    userName: "Karthik Iyer",
    userAvatar: "",
    type: "annual" as const,
    startDate: "2026-03-10",
    endDate: "2026-03-15",
    reason: "Vacation",
    status: "rejected" as const,
    appliedOn: "2026-03-01",
    rejectedOn: "2026-03-02",
    rejectionReason: "Critical project deadline during this period. Please reschedule.",
  },
]

function RequestCard({
  request,
  onApprove,
  onReject,
  showActions = true,
}: {
  request: (typeof allRequests)[0]
  onApprove?: () => void
  onReject?: () => void
  showActions?: boolean
}) {
  const days =
    differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={request.userAvatar} />
              <AvatarFallback className="bg-muted">
                {request.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{request.userName}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Clock className="size-3" />
                Applied {format(new Date(request.appliedOn), "MMM d, yyyy")}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn(LEAVE_TYPE_COLORS[request.type])}
          >
            {LEAVE_TYPE_LABELS[request.type]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1">
              <CalendarDays className="size-3" />
              Duration
            </p>
            <p className="font-medium">
              {format(new Date(request.startDate), "MMM d")}
              {request.startDate !== request.endDate &&
                ` - ${format(new Date(request.endDate), "MMM d, yyyy")}`}
              {request.halfDay && ` (${request.halfDay === "morning" ? "Morning" : "Afternoon"})`}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1">
              <User className="size-3" />
              Days
            </p>
            <p className="font-medium">
              {request.halfDay ? "Half day" : `${days} day${days > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MessageSquare className="size-3" />
            Reason
          </p>
          <p className="text-sm bg-muted/50 rounded-md p-3">{request.reason}</p>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="gap-2 pt-0">
          <Button className="flex-1" onClick={onApprove}>
            <CheckCircle2 className="mr-2 size-4" />
            Approve
          </Button>
          <Button variant="outline" className="flex-1" onClick={onReject}>
            <XCircle className="mr-2 size-4" />
            Reject
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export function PendingApprovals() {
  const [approveDialogOpen, setApproveDialogOpen] = React.useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = React.useState("")
  const [requests, setRequests] = React.useState(allRequests)

  const handleApprove = (id: string) => {
    setSelectedRequest(id)
    setApproveDialogOpen(true)
  }

  const handleReject = (id: string) => {
    setSelectedRequest(id)
    setRejectDialogOpen(true)
  }

  const confirmApprove = () => {
    // In a real app, this would call an API
    setRequests(requests.filter((r) => r.id !== selectedRequest))
    setApproveDialogOpen(false)
    setSelectedRequest(null)
  }

  const confirmReject = () => {
    // In a real app, this would call an API
    setRequests(requests.filter((r) => r.id !== selectedRequest))
    setRejectDialogOpen(false)
    setSelectedRequest(null)
    setRejectionReason("")
  }

  return (
    <>
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            Pending
            <Badge
              variant="secondary"
              className="bg-warning/10 text-warning text-xs px-1.5 py-0"
            >
              {requests.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {requests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={() => handleApprove(request.id)}
                  onReject={() => handleReject(request.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="size-12 text-success/50" />
                <p className="mt-4 text-lg font-medium">All caught up!</p>
                <p className="text-muted-foreground">
                  No pending leave requests to review
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approvedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CalendarDays className="size-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No approved requests this month
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rejectedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CalendarDays className="size-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No rejected requests this month
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Leave Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve the leave request and notify the employee.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprove}>
              Approve Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this leave request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
