"use client"

import * as React from "react"
import { format, differenceInDays } from "date-fns"
import {
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { leaveRequests } from "@/lib/mock-data"
import {
  LEAVE_TYPE_LABELS,
  LEAVE_TYPE_COLORS,
  STATUS_COLORS,
  type LeaveStatus,
  type LeaveType,
} from "@/lib/types"

type FilterStatus = LeaveStatus | "all"
type FilterType = LeaveType | "all"

export function LeaveHistory() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<FilterStatus>("all")
  const [typeFilter, setTypeFilter] = React.useState<FilterType>("all")
  const [selectedRequest, setSelectedRequest] = React.useState<(typeof leaveRequests)[0] | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)
  const [requestToCancel, setRequestToCancel] = React.useState<string | null>(null)

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.reason.toLowerCase().includes(search.toLowerCase()) ||
      LEAVE_TYPE_LABELS[request.type].toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCancelRequest = () => {
    // In a real app, this would call an API
    console.log("Cancelling request:", requestToCancel)
    setCancelDialogOpen(false)
    setRequestToCancel(null)
  }

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTypeFilter("all")
  }

  const hasActiveFilters = search || statusFilter !== "all" || typeFilter !== "all"

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">All Requests</CardTitle>
              <CardDescription>
                {filteredRequests.length} request{filteredRequests.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 size-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by reason or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as FilterType)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Leave Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(LEAVE_TYPE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10">
                <X className="mr-1 size-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Applied On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const days =
                      differenceInDays(
                        new Date(request.endDate),
                        new Date(request.startDate)
                      ) + 1

                    return (
                      <TableRow key={request.id}>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(LEAVE_TYPE_COLORS[request.type])}
                          >
                            {LEAVE_TYPE_LABELS[request.type]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="size-4 text-muted-foreground" />
                            <span className="text-sm">
                              {format(new Date(request.startDate), "MMM d")}
                              {request.startDate !== request.endDate &&
                                ` - ${format(new Date(request.endDate), "MMM d")}`}
                              {request.halfDay && ` (${request.halfDay === "morning" ? "AM" : "PM"})`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {request.halfDay ? "Half day" : `${days} day${days > 1 ? "s" : ""}`}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn("capitalize", STATUS_COLORS[request.status])}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                          {format(new Date(request.appliedOn), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                                <Eye className="mr-2 size-4" />
                                View Details
                              </DropdownMenuItem>
                              {request.status === "pending" && (
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => {
                                    setRequestToCancel(request.id)
                                    setCancelDialogOpen(true)
                                  }}
                                >
                                  <X className="mr-2 size-4" />
                                  Cancel Request
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <CalendarDays className="size-10 mb-2" />
                        <p>No leave requests found</p>
                        {hasActiveFilters && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={clearFilters}
                            className="mt-1"
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Request submitted on{" "}
              {selectedRequest && format(new Date(selectedRequest.appliedOn), "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Leave Type</p>
                  <Badge
                    variant="secondary"
                    className={cn("mt-1", LEAVE_TYPE_COLORS[selectedRequest.type])}
                  >
                    {LEAVE_TYPE_LABELS[selectedRequest.type]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="secondary"
                    className={cn("mt-1 capitalize", STATUS_COLORS[selectedRequest.status])}
                  >
                    {selectedRequest.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.startDate), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.endDate), "MMMM d, yyyy")}
                  </p>
                </div>
                {selectedRequest.halfDay && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium capitalize">
                      Half Day ({selectedRequest.halfDay})
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reason</p>
                <p className="text-sm bg-muted/50 p-3 rounded-md">
                  {selectedRequest.reason}
                </p>
              </div>
              {selectedRequest.approvedBy && (
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved by</p>
                    <p className="font-medium">{selectedRequest.approvedBy}</p>
                  </div>
                  {selectedRequest.approvedOn && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">On</p>
                      <p className="font-medium">
                        {format(new Date(selectedRequest.approvedOn), "MMM d, yyyy")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Leave Request?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this leave request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Request
            </Button>
            <Button variant="destructive" onClick={handleCancelRequest}>
              Cancel Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
