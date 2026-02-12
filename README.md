# Dance Academy CRM

A comprehensive multi-branch CRM system built for dance academies with 20 different locations.

## Features

### Core Functionality
- **Role-Based Access Control (RBAC)**: Three user roles with different permissions
  - Super Admin: Full access to all 20 branches
  - Admin: Access to specific branch
  - Staff: Limited access (Inbox & Calendar only)

- **Multi-Tenant Architecture**: Branch-based data filtering for all 20 locations

### Pages & Features

1. **Dashboard** - Analytics and key metrics with charts
2. **Inbox** - Three-panel conversation management (Contacts, Messages, Details)
3. **Users** - Team member management with role-based filtering
4. **Leads** - Lead tracking with status and health indicators
5. **Calendar** - Month view with appointment management
6. **Reports** - Comprehensive analytics with multiple chart types
7. **Form Builder** - Drag-and-drop form creation
8. **Email Builder** - Visual email campaign creator
9. **SMS** - SMS template manager with character counter
10. **Workflows** - Visual automation workflow builder
11. **AI Calling** - AI-powered calling scripts and personas
12. **Floating Chatbot** - AI assistant for help and quick actions

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (JavaScript)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

**Super Admin**
- Email: `superadmin@danceacademy.com`
- Password: `password`
- Access: All 20 branches

**Admin (Stamford Branch)**
- Email: `admin.stamford@danceacademy.com`
- Password: `password`
- Access: Stamford branch only

**Staff (Stamford Branch)**
- Email: `staff.stamford@danceacademy.com`
- Password: `password`
- Access: Inbox and Calendar only

## Project Structure

```
app/
├── page.js                     # Dashboard
├── login/page.js               # Login page
├── inbox/page.js               # Inbox (3-panel)
├── users/page.js               # Users management
├── leads/page.js               # Leads tracking
├── calendar/page.js            # Calendar
├── reports/page.js             # Reports & Analytics
├── forms/page.js               # Form Builder
├── emails/page.js              # Email Builder
├── sms/page.js                 # SMS Manager
├── workflows/page.js           # Workflow Automation
└── ai-calling/page.js          # AI Calling

components/
├── layout/                     # Layout components
│   ├── MainLayout.js
│   ├── Sidebar.js             # Role-based navigation
│   └── Header.js              # Branch selector/badge
├── ui/                         # UI primitives
├── dashboard/                  # Dashboard components
├── shared/                     # Shared components
│   └── BranchSelector.js      # Super Admin branch selector
└── FloatingChatbot.js          # AI assistant

lib/
├── utils.js                    # Utility functions
├── constants.js                # App constants
├── auth.js                     # Authentication
├── permissions.js              # Permission checking
└── branch-filter.js            # Branch filtering

data/
└── dummyData.js               # Mock data for all 20 branches
```

## Key Features

### Branch Management
- 20 dance academy branches across the USA
- Super Admin can view/manage all branches
- Admin and Staff limited to their assigned branch
- Branch selector for Super Admin in header
- Branch badge for Admin/Staff in header

### Role-Based Navigation
- **Super Admin**: Access to all pages
- **Admin**: Access to all pages except branch selector
- **Staff**: Only Inbox and Calendar visible in sidebar

### Data Filtering
- All data automatically filtered by branch
- Super Admin can select "All Branches" or specific branch
- Admin/Staff data automatically scoped to their branch
- Staff data further filtered by assignments (e.g., only their appointments)

### Authentication
- Mock authentication system (easily replaceable with real auth)
- Session management with localStorage
- Protected routes with automatic redirects
- Role-based route access control

## Customization

### Adding New Branches
Update `/data/dummyData.js` to add more branches:

```javascript
export const branches = [
  { id: 'branch-21', name: 'New Location', ... },
  // ... more branches
]
```

### Modifying Permissions
Edit `/lib/constants.js` to adjust role permissions:

```javascript
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [...],
  [ROLES.ADMIN]: [...],
  [ROLES.STAFF]: [...],
}
```

### Theme Customization
Modify brand colors in `/tailwind.config.js`:

```javascript
brand: {
  DEFAULT: 'hsl(var(--primary))',  // Your primary color
  light: '#60A5FA',
  dark: 'hsl(var(--primary))',
  foreground: '#FFFFFF',
}
```

## Production Deployment

1. **Replace Mock Data**: Connect to your actual database/API
2. **Implement Real Authentication**: Use NextAuth.js or similar
3. **Add Server-Side Filtering**: Implement branch filtering on backend
4. **Environment Variables**: Set up proper env configuration
5. **Build & Deploy**:

```bash
npm run build
npm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For questions or issues, please contact support@danceacademy.com

