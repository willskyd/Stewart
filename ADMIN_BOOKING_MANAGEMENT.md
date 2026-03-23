# Admin Booking Management System

## Overview
The admin account has full control over all user bookings and activities on the Stewart.com platform. This document explains how to view, approve, and manage bookings from other accounts.

## Admin Credentials

**Account Email:** `stewartadmin@gmail.com`  
**Account Password:** `Stewartadmin123`

There is also a secondary admin account:
- **Email:** `admin@stewart.com`
- **Password:** `Admin123456`

## Accessing Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/signin`
2. Enter the admin credentials above
3. You will be redirected to the admin dashboard at `/admin`

## Admin Dashboard Features

### 1. Dashboard Statistics
The top section shows key metrics:
- **Total bookings** - Count of all bookings in the system
- **Pending approvals** - Number of bookings waiting for admin review (highlighted in yellow)
- **Approved** - Number of approved bookings (highlighted in green)
- **Saved favorites** - Number of favorite items saved by users

### 2. Booking Management Section

The "Booking Management" section allows you to view and control all bookings with three tabs:

#### **Pending Tab** (Default)
Shows all bookings awaiting approval. These are new bookings that users just created.

**Actions Available:**
- **Approve** - Click the green "Approve" button to confirm the booking
- **Decline** - Click the "Decline" button to reject the booking

#### **Approved Tab**
Shows all bookings that have been approved.

**Actions Available:**
- **Cancel** - Click the "Cancel" button to revoke an approval if needed

#### **Cancelled Tab**
Shows all bookings that have been declined or cancelled.

**Actions Available:**
- **Reactivate** - Click the "Reactivate" button to restore a cancelled booking to approved status

### 3. Booking Information Displayed
Each booking card shows:
- **Title & Subtitle** - The property/activity name and location
- **Status Badge** - Color-coded status indicator (pending/approved/cancelled)
- **Customer Name** - Full name of the person who made the booking
- **Customer Email** - Email address of the booking customer
- **Dates** - Check-in to check-out dates
- **Amount** - Price of the booking in local currency formatted

### 4. Support Messages
The right sidebar displays support tickets from customers with the ability to:
- View ticket status (new/in-progress/resolved)
- Resolve or re-open tickets
- Mark tickets as complete

## Workflow

### Typical Booking Approval Flow

1. **User Makes a Booking**
   - User navigates to a property/activity page
   - Clicks "Book now"
   - Booking is created with status: **PENDING**

2. **Admin Reviews Pending Bookings**
   - Admin logs into the dashboard
   - Views the "Pending" tab in Booking Management
   - Sees count of pending bookings in the statistics

3. **Admin Makes Decision**
   - **To Approve:** Click the green "Approve" button
     - Booking status changes to APPROVED
     - User can see the approved booking on their dashboard
     - Toast notification confirms the action
   
   - **To Decline:** Click the "Decline" button
     - Booking status changes to CANCELLED
     - User can see the rejected booking on their dashboard
     - Can be reactivated later if needed

4. **User Sees Updated Status**
   - User logs into their dashboard at `/dashboard`
   - Their bookings section shows the updated status
   - They can plan based on approved bookings

## Key Features

✅ **Real-time Updates** - Changes are instantly reflected across all pages via localStorage sync

✅ **Status-based Actions** - Buttons change based on booking status:
   - Pending bookings: Show Approve & Decline buttons
   - Approved bookings: Show Cancel button
   - Cancelled bookings: Show Reactivate button

✅ **Color-coded Indicators** - Easy visual identification:
   - Yellow badge = Pending (needs action)
   - Green badge = Approved (confirmed)
   - Red badge = Cancelled (rejected)

✅ **Toast Notifications** - Confirmation messages appear when you take action on a booking

✅ **Customer Details** - All relevant customer information displayed for context

✅ **Bulk Tab Filtering** - Quickly switch between booking status views

## Technical Implementation

### Database & Storage
- Bookings are stored in **localStorage** under key: `stewart_bookings`
- Admin session is stored under key: `stewart_admin_session`
- Data persists across browser sessions and is shared in real-time

### State Management
- Uses React hooks (useState, useEffect, useMemo) for state
- Subscribe function listens to localStorage changes
- Automatic UI updates when any admin/user makes changes

### Files Modified
- `/app/admin/page.tsx` - Main admin dashboard component
- Added Tabs component for booking filtering
- Added Badge component for status indicators
- Added Toast notifications for user feedback

## Support & Troubleshooting

### Admin Dashboard Not Showing Bookings?
1. Verify you're logged in as admin (check admin session in browser)
2. Make sure a user has made a booking first
3. Hard refresh the page (Ctrl+F5)
4. Check browser console for any errors (F12)

### Bookings Not Updating After Action?
1. Wait a moment for the toast notification to appear
2. The UI should update automatically
3. If not, refresh the page
4. Verify localStorage is enabled in browser settings

### Cannot Login to Admin Account?
1. Double-check email and password (case-sensitive)
2. Ensure you're at `/admin/signin` not `/signin`
3. Try the secondary admin account if available

## Demo Instructions

To test the complete workflow:

1. **Create a Test Booking**
   - Open a new browser tab/window
   - Go to `http://localhost:3000`
   - Sign in as a regular user (or create account)
   - Navigate to any property/activity
   - Click "Book now" to create a booking

2. **Check Admin Dashboard**
   - In another tab, log in to admin at `/admin/signin`
   - Go to the "Pending" tab
   - You should see the booking you just created

3. **Approve the Booking**
   - Click the green "Approve" button
   - Confirm you see the toast notification
   - The booking should move to the "Approved" tab

4. **Verify User Sees Update**
   - Return to the user's browser tab
   - Go to `/dashboard`
   - The booking should now show as "approved"

## Admin Permissions

The admin account (`stewartadmin@gmail.com`) with full control can:

✅ View all bookings from all users  
✅ Approve pending bookings  
✅ Decline/cancel bookings  
✅ Reactivate cancelled bookings  
✅ Manage support tickets  
✅ View all user favorites  
✅ Monitor site activity  

## Notes

- Bookings are filtered by status in tabs for easy organization
- Pending bookings show priority with yellow highlighting
- All actions are reversible (cancelled bookings can be reactivated)
- Multiple admins can work simultaneously (all see real-time updates)
- No email notifications are sent (this is a demo system)
