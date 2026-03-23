# Stewart.com - Travel Booking Platform

A comprehensive travel booking platform built with Next.js 16, featuring properties, flights, attractions, car rentals, and airport taxis with full admin control.

## 🚀 Features Implemented

### ✅ **User Authentication & Profile Management**
- User registration at `/register`
- User sign-in at `/signin`
- Admin sign-in at `/admin/signin`
- Persistent session management with localStorage
- Profile dropdown in header showing user info
- Sign out functionality for all users

### ✅ **Admin System**
- **Two Admin Accounts Available:**
  - Email: `admin@stewart.com` / Password: `Admin123456` (NEW)
  - Email: `stewartadmin@gmail.com` / Password: `Stewartadmin123` (Original)
  
- **Complete Admin Dashboard** at `/admin`:
  - View all bookings and approvals
  - Approve or cancel booking requests
  - Manage support tickets (resolve/re-open)
  - Track user favorites and activity
  - Real-time statistics and metrics
  
- **Admin Navigation Bar** with quick access to:
  - Dashboard
  - Bookings Management
  - Support Tickets
  - User Activities Tracking
  - Favorites Monitoring
  - Admin Settings
  
- **Admin Settings Page** at `/admin/settings`:
  - Admin account information
  - Permission management
  - System configuration options

### ✅ **Header Features**
- **Dynamic User Profile Display:**
  - When logged out: Shows "Register" and "Sign In" buttons
  - When user logged in: Shows 👤 + abbreviated name (e.g., "JD" for John Doe)
  - When admin logged in: Shows 👤 + "Admin" label
  
- **User Dropdown Menu** with:
  - User/Admin profile information
  - Links to dashboard/bookings
  - Sign out option
  
- **Top Bar with Quick Access:**
  - Currency selector (NGN, USD, EUR, GBP)
  - Country selector with regional flags
  - Customer support link
  - Theme toggle (dark/light mode)
  
- **Main Navigation:**
  - Stays (Properties)
  - Flights
  - Car Rentals
  - Attractions
  - Airport Taxis
  - Mobile responsive menu

### ✅ **Footer Navigation**
- **Available for All Users:**
  - Favorites link (heart icon) - accessible to everyone
  - Admin Dashboard link (appears only when admin logged in)
  
- **Footer Links:**
  - Company: About, Careers, Press, Investors, Sustainability
  - Support: Help Center, Safety, Cancellation, COVID-19, Report
  - Discover: Trust & Safety, Credits, Gift Cards, Loyalty, Partners
  - Hosting: List Property, Host Resources, Community
  - Social Media: Facebook, Twitter, Instagram, YouTube, LinkedIn
  - Contact Information: Address, Phone, Email

### ✅ **Main Pages & Features**

#### **Homepage** (`/`)
- Hero search component
- Explore section with destination cards
- Quick and Easy Trip Planner with vibes:
  - Historical Tours
  - Shopping & Outlets
  - Live Music
  - Adventures
  - Wellness
- Popular flight routes
- Why Stewart section
- Featured properties slider
- Five-star properties section
- Trending destinations
- CTA sections and booking flow

#### **Properties & Stays** (`/property/[id]`)
- Detailed property listings
- High-quality images and gallery
- Property descriptions and amenities
- Rating and reviews
- Price information
- Booking buttons

#### **Flights** (`/flights`)
- Flight search and booking
- Popular flight routes display
- Airline information
- Price comparisons
- Duration and stops information
- Booking integration

#### **Attractions** (`/attractions`, `/attractions/[id]`)
- Attraction listings with images
- Detailed descriptions
- Ratings and reviews
- Price information
- Duration details
- Booking functionality

#### **Car Rentals** (`/car-rentals`, `/car-rentals/[id]`)
- Vehicle listings
- Car specifications (seats, transmission, fuel)
- Rental prices
- Location information
- Booking integration

#### **Airport Taxis** (`/airport-taxis`)
- Taxi service options
- Route information
- Pricing
- Vehicle types
- Passenger capacity
- Booking system

#### **User Dashboard** (`/dashboard`)
- View all user bookings
- Booking status tracking
- Manage reservations
- User profile information
- Favorites access

#### **Favorites** (`/favorites`)
- View all saved favorite properties
- Save/unsave items
- Quick access to favorites
- Available for all users

#### **Search** (`/search`)
- Smart search across all services
- Filter by destination, type, vibe
- Results showing:
  - Matching properties
  - Attractions
  - Flights
  - Car rentals
  - Airport taxis
- **Empty State Handling:** Shows featured items when no results found
- **Improved Search Matching:** Word-by-word matching for better results

#### **Support** (`/support`)
- Help center with categories
- Search support articles
- Support ticket submission
- Live chat integration path
- Support category pages

#### **Authentication Pages**
- `/signin` - User login
- `/register` - New user registration
- `/admin/signin` - Admin login
- `/forgot-password` - Password recovery
- Protected routes with redirects

#### **Content Pages**
- About page (`/about`)
- Careers page (`/careers`) with job listings
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)
- Help articles with categories
- Support categories (billing, booking, cancellation, etc.)

### ✅ **Advanced Search Features**
- **Improved Matching Algorithm:**
  - Word-by-word search matching
  - Matches properties by title, type, location, city, country
  - Flexible query handling
  - Partial word matching
  
- **Search Parameters:**
  - Service type (stays, flights, attractions, cars, taxis, help)
  - Destination filtering
  - Vibe selection (for trip planner)
  - Date ranges
  - Multiple filter combinations

### ✅ **Booking System**
- Add bookings to cart
- Booking status management:
  - Pending (requires approval)
  - Approved
  - Cancelled
  - Completed
- Booking details tracking:
  - Customer information
  - Dates
  - Prices
  - Item details
- Admin approval workflows

### ✅ **User Preferences & Data**
- **Favorites System:**
  - Save/unsave properties
  - Persistent favorite lists
  - Quick access from any page
  - Favorites page overview
  - Admin monitoring of favorite trends
  
- **Session Management:**
  - Persistent login with localStorage
  - Real-time session updates
  - Auto-redirect on protected routes
  - Session clearing on logout

### ✅ **UI/UX Components**
- Responsive accordion components
- Alert dialogs and notifications
- Avatar components for profiles
- Badge system for labels
- Breadcrumb navigation
- Button groups and variations
- Calendars for date selection
- Carousels for browsing content
- Charts for data visualization
- Collapsible sections
- Command palettes for actions
- Context menus
- Dropdown menus
- Empty state displays
- Form validation
- Hover cards for additional info
- Input groups and OTP inputs
- Loading spinners
- Progress bars
- Radio groups and toggles
- Resizable panels
- Scroll areas
- Sheet dialogs
- Sidebar navigation
- Skeleton loaders
- Sliders for filtering
- Sonner toast notifications
- Table components
- Tabs for content switching
- Text areas
- Tooltips for help text

### ✅ **Theme & Styling**
- Dark mode / Light mode toggle
- Tailwind CSS styling
- Responsive design (mobile, tablet, desktop)
- Custom color variables
- Smooth transitions and animations
- Accessible color contrasts
- Consistent spacing and sizing

### ✅ **Data Management**
- Mock data for properties, flights, attractions, cars, taxis
- Demo bookings and support tickets
- Favorites tracking
- User activity logging
- Admin analytics

### ✅ **Performance Features**
- Next.js optimization
- Image optimization with Image component
- Code splitting and lazy loading
- Font optimization
- Metadata and SEO optimization

## 📋 Admin Capabilities

The admin account has **full control** over:

1. **Booking Management**
   - View all bookings from all users
   - Approve pending bookings
   - Cancel bookings when needed
   - Track booking status and history

2. **Support Management**
   - Monitor all customer support tickets
   - Resolve issues
   - Re-open tickets if needed
   - Track support activity

3. **User Activity Monitoring**
   - View all user activities on the site
   - Track customer preferences
   - Monitor bookings by type
   - View usage statistics

4. **Favorites Tracking**
   - See what properties users are saving
   - Identify popular destinations
   - Monitor trending items
   - Analyze user preferences

5. **System Access**
   - Full site control
   - Settings management
   - Permission configuration
   - Activity logs

## 🔐 User Accounts

### Test Accounts Available:

**Regular Users:**
- Can sign up at `/register`
- Can sign in at `/signin`
- Access to ALL features
- Can save favorites
- Can make bookings
- Can submit support tickets

**Admin Users:**
- Account 1: `admin@stewart.com` / `Admin123456`
- Account 2: `stewartadmin@gmail.com` / `Stewartadmin123`
- Access to full admin dashboard
- Control over all site operations
- Approves user bookings
- Manages support tickets

## 🛠️ Technical Stack

- **Framework:** Next.js 16.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI with custom components
- **Icons:** Lucide React
- **State Management:** React Hooks + localStorage
- **Type Definitions:** TypeScript interfaces
- **Routing:** Next.js App Router
- **Package Manager:** pnpm

## 📁 Project Structure

```
app/
  ├── page.tsx                 # Homepage
  ├── admin/                   # Admin pages
  ├── attractions/             # Attractions listings
  ├── car-rentals/            # Car rental listings
  ├── airport-taxis/          # Taxi services
  ├── dashboard/              # User dashboard
  ├── favorites/              # Favorites page
  ├── flights/                # Flights listings
  ├── property/               # Property details
  ├── search/                 # Search results
  ├── signin/                 # User login
  ├── register/               # User registration
  ├── support/                # Support center
  └── [slug]/                 # Dynamic routes

components/
  ├── header.tsx              # Main navigation header
  ├── footer.tsx              # Footer with links
  ├── admin-nav.tsx           # Admin navigation
  ├── booking-button.tsx      # Booking CTA button
  ├── property-card.tsx       # Property display card
  ├── explore-section.tsx     # Explore destinations
  ├── trip-planner.tsx        # Trip planner component
  └── ui/                     # UI component library

lib/
  ├── site-store.ts           # State management
  ├── site-data.ts            # Mock data
  ├── search-utils.ts         # Search utilities
  ├── formatters.ts           # Data formatting
  └── utils.ts                # Helper functions
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Test Features:
   - Sign up/login as regular user at `/signin` and `/register`
   - Sign in as admin at `/admin/signin` with provided credentials
   - Explore properties, flights, attractions, cars, and taxis
   - Save favorites (visible to all users)
   - Make bookings (requires login)
   - Admin can approve/manage all bookings and tickets

## 📝 Recent Updates

- ✅ Fixed header to show user profile when logged in (all users)
- ✅ Fixed footer to only show admin dashboard when admin logged in
- ✅ Improved search matching algorithm (word-by-word)
- ✅ Added empty state handling for search results (shows featured items)
- ✅ Created admin navigation system
- ✅ Implemented admin settings page
- ✅ Added new admin account for testing
- ✅ Favorites link visible to all users (logged in or not)
- ✅ Full booking and support management system
- ✅ Real-time session synchronization

## 📧 Support

For support inquiries, visit `/support` or use the chat feature.

## 📄 License

This project is part of Stewart.com platform.
