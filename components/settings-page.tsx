"use client"

import * as React from "react"
import { Bell, Globe, Key, Moon, Palette, Shield, Sun, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { currentUser } from "@/lib/mock-data"

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and profile picture</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <Avatar className="size-20">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>

        <Separator />

        {/* Form Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Priya" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Sharma" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={currentUser.email} disabled />
            <p className="text-xs text-muted-foreground">
              Contact HR to change your email address
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" defaultValue={currentUser.department} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Reporting Manager</Label>
            <Input id="manager" defaultValue="Rajesh Kumar" disabled />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationSettings() {
  const [settings, setSettings] = React.useState({
    emailApprovals: true,
    emailReminders: true,
    emailTeamUpdates: false,
    pushApprovals: true,
    pushReminders: true,
    slackIntegration: false,
  })

  const updateSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Leave Approvals</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when your leave requests are approved or rejected
                </p>
              </div>
              <Switch
                checked={settings.emailApprovals}
                onCheckedChange={() => updateSetting("emailApprovals")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Leave Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Receive reminders about upcoming leaves and pending requests
                </p>
              </div>
              <Switch
                checked={settings.emailReminders}
                onCheckedChange={() => updateSetting("emailReminders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Team Updates</Label>
                <p className="text-xs text-muted-foreground">
                  Get updates when team members go on leave
                </p>
              </div>
              <Switch
                checked={settings.emailTeamUpdates}
                onCheckedChange={() => updateSetting("emailTeamUpdates")}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Push Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Approval Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Real-time alerts for approval status changes
                </p>
              </div>
              <Switch
                checked={settings.pushApprovals}
                onCheckedChange={() => updateSetting("pushApprovals")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Daily digest of pending actions
                </p>
              </div>
              <Switch
                checked={settings.pushReminders}
                onCheckedChange={() => updateSetting("pushReminders")}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Integrations */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Integrations</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Slack Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Receive leave updates in your Slack workspace
              </p>
            </div>
            <Switch
              checked={settings.slackIntegration}
              onCheckedChange={() => updateSetting("slackIntegration")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your password and account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Change Password */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Change Password</h3>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters with at least one number and special character
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button className="w-fit">Update Password</Button>
          </div>
        </div>

        <Separator />

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>

        <Separator />

        {/* Active Sessions */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Chrome on MacOS</p>
                <p className="text-xs text-muted-foreground">
                  Mumbai, India • Active now
                </p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Current
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Safari on iPhone</p>
                <p className="text-xs text-muted-foreground">
                  Mumbai, India • Last active 2 hours ago
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = React.useState("system")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how the application looks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Theme</h3>
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent transition-colors",
                theme === "light" && "border-primary bg-primary/5"
              )}
            >
              <Sun className="size-6" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent transition-colors",
                theme === "dark" && "border-primary bg-primary/5"
              )}
            >
              <Moon className="size-6" />
              <span className="text-sm">Dark</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent transition-colors",
                theme === "system" && "border-primary bg-primary/5"
              )}
            >
              <Palette className="size-6" />
              <span className="text-sm">System</span>
            </button>
          </div>
        </div>

        <Separator />

        {/* Language */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Language & Region</h3>
          <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

import { Badge } from "@/components/ui/badge"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="profile" className="gap-2">
            <User className="size-4 hidden sm:block" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="size-4 hidden sm:block" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="size-4 hidden sm:block" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="size-4 hidden sm:block" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
