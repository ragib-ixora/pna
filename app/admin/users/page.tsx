import { AppShell } from "@/components/app-shell"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage employee accounts and permissions
          </p>
        </div>
        <UserManagement />
      </div>
    </AppShell>
  )
}
