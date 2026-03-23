# Quick Admin Guide - Booking Management

## 🔐 LOGIN
**URL:** http://localhost:3000/admin/signin

**Credentials:**
- Email: `stewartadmin@gmail.com`
- Password: `Stewartadmin123`

Alternative account:
- Email: `admin@stewart.com`
- Password: `Admin123456`

---

## 📊 DASHBOARD
After login, you'll see:
- **Total Bookings** counter
- **Pending Approvals** (yellow) - These need your action!
- **Approved** (green) count
- **Saved Favorites** count

---

## 📋 BOOKING MANAGEMENT

### Three Tabs:

#### 1️⃣ **PENDING** (Default - Yellow)
**Your Priority:** These bookings need approval/decline
- Shows customer name, email, dates, amount
- **Approve Button** → Status becomes APPROVED (green)
- **Decline Button** → Status becomes CANCELLED (red)
- Toast notification confirms your action

#### 2️⃣ **APPROVED** (Green)
- Already approved bookings are shown here
- **Cancel Button** available if you need to revoke approval
- Shows customer details and booking info

#### 3️⃣ **CANCELLED** (Red)
- Declined or cancelled bookings
- **Reactivate Button** available to restore booking
- Shows customer details and cancellation reason

---

## ✅ TYPICAL WORKFLOW

```
1. User creates booking              → Status: PENDING (yellow)
                                      ↓
2. You see it on Admin Dashboard      → Pending tab
                                      ↓
3. You click APPROVE or DECLINE       → Status: APPROVED or CANCELLED
                                      ↓
4. User sees updated status           → On their dashboard
```

---

## 🎯 KEY FEATURES

✅ **Only Pending tab shows by default** - Shows what needs your attention first

✅ **Color-coded statuses:**
- Yellow = PENDING (needs action)
- Green = APPROVED (confirmed)
- Red = CANCELLED (rejected)

✅ **Smart buttons** - Only relevant actions show:
- Pending: Approve & Decline
- Approved: Cancel
- Cancelled: Reactivate

✅ **Real-time updates** - See changes instantly across all tabs

✅ **Toast notifications** - Confirmation when you take action

✅ **All customer info visible** - Name, email, dates, amount

---

## 💡 TIPS

- **Act fast on pending bookings** - Users wait for approval
- **Use Decline if policy violated** - System marks as cancelled
- **Can reactivate anytime** - Cancelled → Approved if needed
- **Check Approved tab** - See what's already been approved
- **Support section on right** - Also manage customer tickets

---

## ❓ QUICK ANSWERS

**Q: Where are pending bookings?**
A: They're in the "Pending" tab by default (yellow)

**Q: How do I approve a booking?**
A: Click the green "Approve" button

**Q: Can I undo an approval?**
A: Yes, cancel it and reactivate if needed

**Q: Do users get notified?**
A: Changes are instant on their dashboard (no email in demo)

**Q: Can other admins see my changes?**
A: Yes - all changes sync in real-time

---

## 📱 Other Admin Pages

- `/admin` - Main dashboard (where you are)
- `/admin/settings` - Admin settings & configuration
- `/admin/signin` - Admin login page

---

**Created:** March 2026 | **Version:** 1.0
