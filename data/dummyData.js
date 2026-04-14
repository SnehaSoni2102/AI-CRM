// 20 Dance Academy Branches
export const branches = [
  { id: 'branch-1', name: 'Stamford', city: 'Stamford', state: 'CT', address: '123 Main St', zipCode: '06901', phone: '(203) 555-0101', email: 'stamford@danceacademy.com', status: 'active', createdAt: '2023-01-15' },
  { id: 'branch-2', name: 'New York City', city: 'New York', state: 'NY', address: '456 Broadway', zipCode: '10001', phone: '(212) 555-0102', email: 'nyc@danceacademy.com', status: 'active', createdAt: '2023-02-01' },
  { id: 'branch-3', name: 'Boston', city: 'Boston', state: 'MA', address: '789 Commonwealth Ave', zipCode: '02115', phone: '(617) 555-0103', email: 'boston@danceacademy.com', status: 'active', createdAt: '2023-03-10' },
  { id: 'branch-4', name: 'Philadelphia', city: 'Philadelphia', state: 'PA', address: '321 Market St', zipCode: '19103', phone: '(215) 555-0104', email: 'philly@danceacademy.com', status: 'active', createdAt: '2023-04-05' },
  { id: 'branch-5', name: 'Miami', city: 'Miami', state: 'FL', address: '654 Ocean Dr', zipCode: '33139', phone: '(305) 555-0105', email: 'miami@danceacademy.com', status: 'active', createdAt: '2023-05-12' },
  { id: 'branch-6', name: 'Atlanta', city: 'Atlanta', state: 'GA', address: '987 Peachtree St', zipCode: '30303', phone: '(404) 555-0106', email: 'atlanta@danceacademy.com', status: 'active', createdAt: '2023-06-20' },
  { id: 'branch-7', name: 'Chicago', city: 'Chicago', state: 'IL', address: '147 Michigan Ave', zipCode: '60601', phone: '(312) 555-0107', email: 'chicago@danceacademy.com', status: 'active', createdAt: '2023-07-08' },
  { id: 'branch-8', name: 'Houston', city: 'Houston', state: 'TX', address: '258 Westheimer Rd', zipCode: '77006', phone: '(713) 555-0108', email: 'houston@danceacademy.com', status: 'active', createdAt: '2023-08-15' },
  { id: 'branch-9', name: 'Dallas', city: 'Dallas', state: 'TX', address: '369 Main St', zipCode: '75201', phone: '(214) 555-0109', email: 'dallas@danceacademy.com', status: 'active', createdAt: '2023-09-03' },
  { id: 'branch-10', name: 'Phoenix', city: 'Phoenix', state: 'AZ', address: '741 Central Ave', zipCode: '85004', phone: '(602) 555-0110', email: 'phoenix@danceacademy.com', status: 'active', createdAt: '2023-10-11' },
  { id: 'branch-11', name: 'Los Angeles', city: 'Los Angeles', state: 'CA', address: '852 Sunset Blvd', zipCode: '90028', phone: '(323) 555-0111', email: 'la@danceacademy.com', status: 'active', createdAt: '2023-11-01' },
  { id: 'branch-12', name: 'San Francisco', city: 'San Francisco', state: 'CA', address: '963 Market St', zipCode: '94103', phone: '(415) 555-0112', email: 'sf@danceacademy.com', status: 'active', createdAt: '2023-11-15' },
  { id: 'branch-13', name: 'Seattle', city: 'Seattle', state: 'WA', address: '159 Pike St', zipCode: '98101', phone: '(206) 555-0113', email: 'seattle@danceacademy.com', status: 'active', createdAt: '2023-12-01' },
  { id: 'branch-14', name: 'Denver', city: 'Denver', state: 'CO', address: '357 16th St', zipCode: '80202', phone: '(303) 555-0114', email: 'denver@danceacademy.com', status: 'active', createdAt: '2024-01-10' },
  { id: 'branch-15', name: 'Portland', city: 'Portland', state: 'OR', address: '486 Burnside St', zipCode: '97209', phone: '(503) 555-0115', email: 'portland@danceacademy.com', status: 'active', createdAt: '2024-02-05' },
  { id: 'branch-16', name: 'Las Vegas', city: 'Las Vegas', state: 'NV', address: '753 Las Vegas Blvd', zipCode: '89101', phone: '(702) 555-0116', email: 'vegas@danceacademy.com', status: 'active', createdAt: '2024-03-12' },
  { id: 'branch-17', name: 'Nashville', city: 'Nashville', state: 'TN', address: '951 Broadway', zipCode: '37203', phone: '(615) 555-0117', email: 'nashville@danceacademy.com', status: 'active', createdAt: '2024-04-20' },
  { id: 'branch-18', name: 'Austin', city: 'Austin', state: 'TX', address: '246 Congress Ave', zipCode: '78701', phone: '(512) 555-0118', email: 'austin@danceacademy.com', status: 'active', createdAt: '2024-05-08' },
  { id: 'branch-19', name: 'Charlotte', city: 'Charlotte', state: 'NC', address: '135 Tryon St', zipCode: '28202', phone: '(704) 555-0119', email: 'charlotte@danceacademy.com', status: 'active', createdAt: '2024-06-15' },
  { id: 'branch-20', name: 'San Diego', city: 'San Diego', state: 'CA', address: '864 Harbor Dr', zipCode: '92101', phone: '(619) 555-0120', email: 'sandiego@danceacademy.com', status: 'active', createdAt: '2024-07-01' },
]

// Sample Users (distributed across branches)
export const users = [
  { id: '1', branch_id: null, name: 'Sarah Johnson', email: 'sarah@danceacademy.com', role: 'Super Admin', phone: '(555) 001-0001', status: 'Active', avatar: null, title: 'System Administrator', joinedDate: '2023-01-01' },
  { id: '2', branch_id: 'branch-1', name: 'John Smith', email: 'john.smith@danceacademy.com', role: 'Admin', phone: '(555) 001-0002', status: 'Active', avatar: null, title: 'Branch Manager', joinedDate: '2023-01-15' },
  { id: '3', branch_id: 'branch-1', name: 'Jane Doe', email: 'jane.doe@danceacademy.com', role: 'Staff', phone: '(555) 001-0003', status: 'Active', avatar: null, title: 'Dance Instructor', joinedDate: '2023-02-01' },
  { id: '4', branch_id: 'branch-1', name: 'Mike Wilson', email: 'mike.wilson@danceacademy.com', role: 'Teacher', phone: '(555) 001-0004', status: 'Active', avatar: null, title: 'Ballet Instructor', joinedDate: '2023-03-10' },
  { id: '5', branch_id: 'branch-2', name: 'Emily Chen', email: 'emily.chen@danceacademy.com', role: 'Admin', phone: '(555) 002-0001', status: 'Active', avatar: null, title: 'Branch Manager', joinedDate: '2023-02-01' },
  { id: '6', branch_id: 'branch-2', name: 'David Lee', email: 'david.lee@danceacademy.com', role: 'Teacher', phone: '(555) 002-0002', status: 'Active', avatar: null, title: 'Hip Hop Instructor', joinedDate: '2023-03-15' },
  { id: '7', branch_id: 'branch-3', name: 'Lisa Anderson', email: 'lisa.anderson@danceacademy.com', role: 'Admin', phone: '(555) 003-0001', status: 'Active', avatar: null, title: 'Branch Manager', joinedDate: '2023-03-10' },
  { id: '8', branch_id: 'branch-3', name: 'Tom Martinez', email: 'tom.martinez@danceacademy.com', role: 'Staff', phone: '(555) 003-0002', status: 'Active', avatar: null, title: 'Dance Instructor', joinedDate: '2023-04-05' },
  { id: '9', branch_id: 'branch-4', name: 'Rachel Green', email: 'rachel.green@danceacademy.com', role: 'Admin', phone: '(555) 004-0001', status: 'Active', avatar: null, title: 'Branch Manager', joinedDate: '2023-04-05' },
  { id: '10', branch_id: 'branch-5', name: 'Carlos Rodriguez', email: 'carlos.rodriguez@danceacademy.com', role: 'Admin', phone: '(555) 005-0001', status: 'Active', avatar: null, title: 'Branch Manager', joinedDate: '2023-05-12' },
]

// Sample Contacts (students/parents across branches)
export const contacts = [
  { id: 'c1', branch_id: 'branch-1', name: 'Emma Thompson', email: 'emma.t@email.com', phone: '(555) 101-0001', type: 'Customer', status: 'Active', lastContact: '2024-01-15', tags: ['Ballet', 'Premium'], createdAt: '2023-06-01' },
  { id: 'c2', branch_id: 'branch-1', name: 'Oliver Brown', email: 'oliver.b@email.com', phone: '(555) 101-0002', type: 'Lead', status: 'New', lastContact: '2024-01-20', tags: ['Hip Hop', 'Trial'], createdAt: '2024-01-18' },
  { id: 'c3', branch_id: 'branch-1', name: 'Sophia Davis', email: 'sophia.d@email.com', phone: '(555) 101-0003', type: 'Customer', status: 'Active', lastContact: '2024-01-10', tags: ['Jazz', 'Regular'], createdAt: '2023-08-15' },
  { id: 'c4', branch_id: 'branch-2', name: 'Liam Johnson', email: 'liam.j@email.com', phone: '(555) 102-0001', type: 'Customer', status: 'Active', lastContact: '2024-01-12', tags: ['Contemporary', 'Premium'], createdAt: '2023-07-20' },
  { id: 'c5', branch_id: 'branch-2', name: 'Ava Wilson', email: 'ava.w@email.com', phone: '(555) 102-0002', type: 'Lead', status: 'Contacted', lastContact: '2024-01-22', tags: ['Ballet', 'Interested'], createdAt: '2024-01-15' },
  { id: 'c6', branch_id: 'branch-3', name: 'Noah Martinez', email: 'noah.m@email.com', phone: '(555) 103-0001', type: 'Customer', status: 'Active', lastContact: '2024-01-08', tags: ['Tap', 'Regular'], createdAt: '2023-09-10' },
  { id: 'c7', branch_id: 'branch-3', name: 'Isabella Garcia', email: 'isabella.g@email.com', phone: '(555) 103-0002', type: 'Lead', status: 'Qualified', lastContact: '2024-01-25', tags: ['Salsa', 'Hot Lead'], createdAt: '2024-01-20' },
  { id: 'c8', branch_id: 'branch-4', name: 'Ethan Anderson', email: 'ethan.a@email.com', phone: '(555) 104-0001', type: 'Customer', status: 'Active', lastContact: '2024-01-14', tags: ['Modern', 'Premium'], createdAt: '2023-10-05' },
]

// Sample Leads
export const leads = [
  { id: 'l1', branch_id: 'branch-1', name: 'Michael Chen', email: 'michael.chen@email.com', phone: '(555) 201-0001', status: 'New', health: 'Cold', source: 'Website', value: 500, calls: 0, emails: 0, sms: 0, createdAt: '2024-01-28', lastContactedAt: null },
  { id: 'l2', branch_id: 'branch-1', name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '(555) 201-0002', status: 'Contacted', health: 'Contacted', source: 'Referral', value: 750, calls: 2, emails: 3, sms: 1, createdAt: '2024-01-20', lastContactedAt: '2024-01-25' },
  { id: 'l3', branch_id: 'branch-1', name: 'James Taylor', email: 'james.t@email.com', phone: '(555) 201-0003', status: 'Qualified', health: 'Contacted', source: 'Social Media', value: 1200, calls: 3, emails: 5, sms: 2, createdAt: '2024-01-15', lastContactedAt: '2024-01-27' },
  { id: 'l4', branch_id: 'branch-1', name: 'Jessica Moore', email: 'jessica.m@email.com', phone: '(555) 201-0004', status: 'Proposal', health: 'Converted', source: 'Walk-in', value: 2000, calls: 5, emails: 8, sms: 3, createdAt: '2024-01-10', lastContactedAt: '2024-01-26' },
  { id: 'l5', branch_id: 'branch-2', name: 'Daniel White', email: 'daniel.w@email.com', phone: '(555) 202-0001', status: 'New', health: 'Cold', source: 'Website', value: 600, calls: 0, emails: 0, sms: 0, createdAt: '2024-01-27', lastContactedAt: null },
  { id: 'l6', branch_id: 'branch-2', name: 'Amanda Clark', email: 'amanda.c@email.com', phone: '(555) 202-0002', status: 'Contacted', health: 'Contacted', source: 'Google Ads', value: 850, calls: 1, emails: 2, sms: 1, createdAt: '2024-01-22', lastContactedAt: '2024-01-28' },
  { id: 'l7', branch_id: 'branch-3', name: 'Ryan Thomas', email: 'ryan.t@email.com', phone: '(555) 203-0001', status: 'Qualified', health: 'Contacted', source: 'Referral', value: 1500, calls: 4, emails: 6, sms: 2, createdAt: '2024-01-18', lastContactedAt: '2024-01-27' },
  { id: 'l8', branch_id: 'branch-3', name: 'Michelle Lee', email: 'michelle.l@email.com', phone: '(555) 203-0002', status: 'Negotiation', health: 'Converted', source: 'Event', value: 2500, calls: 6, emails: 10, sms: 4, createdAt: '2024-01-12', lastContactedAt: '2024-01-28' },
]

// Sample Appointments/Calendar Events
export const appointments = [
  { id: 'a1', branch_id: 'branch-1', assigned_to: '3', title: 'Trial Class - Ballet', type: 'Demo', date: '2024-02-05', time: '10:00 AM', contact: 'Emma Thompson', status: 'Scheduled', notes: 'Beginner level' },
  { id: 'a2', branch_id: 'branch-1', assigned_to: '4', title: 'Follow-up Call', type: 'Call', date: '2024-02-05', time: '2:00 PM', contact: 'Sarah Williams', status: 'Scheduled', notes: 'Discuss pricing' },
  { id: 'a3', branch_id: 'branch-1', assigned_to: '2', title: 'Parent Meeting', type: 'Meeting', date: '2024-02-06', time: '11:00 AM', contact: 'James Taylor', status: 'Scheduled', notes: 'Review progress' },
  { id: 'a4', branch_id: 'branch-1', assigned_to: '3', title: 'Hip Hop Class', type: 'Demo', date: '2024-02-07', time: '3:00 PM', contact: 'Oliver Brown', status: 'Scheduled', notes: 'Advanced level' },
  { id: 'a5', branch_id: 'branch-2', assigned_to: '6', title: 'Trial Class - Contemporary', type: 'Demo', date: '2024-02-05', time: '1:00 PM', contact: 'Liam Johnson', status: 'Scheduled', notes: 'Intermediate' },
  { id: 'a6', branch_id: 'branch-2', assigned_to: '5', title: 'Enrollment Discussion', type: 'Meeting', date: '2024-02-08', time: '10:00 AM', contact: 'Ava Wilson', status: 'Scheduled', notes: 'Package options' },
  { id: 'a7', branch_id: 'branch-3', assigned_to: '8', title: 'Salsa Trial', type: 'Demo', date: '2024-02-06', time: '5:00 PM', contact: 'Isabella Garcia', status: 'Scheduled', notes: 'Beginner welcome' },
  { id: 'a8', branch_id: 'branch-3', assigned_to: '7', title: 'Contract Review', type: 'Meeting', date: '2024-02-09', time: '2:00 PM', contact: 'Noah Martinez', status: 'Scheduled', notes: 'Renewal discussion' },
]

// Sample Conversations (Inbox)
export const conversations = [
  { id: 'conv1', branch_id: 'branch-1', contact: { id: 'c1', name: 'Emma Thompson', avatar: null, type: 'Customer', stage: 'Active Student', nextVisit: '2024-02-05' }, lastMessage: 'Thank you! Looking forward to the class.', timestamp: '2024-01-28T14:30:00', unread: 2, channel: 'Email' },
  { id: 'conv2', branch_id: 'branch-1', contact: { id: 'c2', name: 'Oliver Brown', avatar: null, type: 'Lead', stage: 'Trial Scheduled', nextVisit: '2024-02-07' }, lastMessage: 'Can I reschedule my trial class?', timestamp: '2024-01-28T13:15:00', unread: 1, channel: 'SMS' },
  { id: 'conv3', branch_id: 'branch-1', contact: { id: 'c3', name: 'Sophia Davis', avatar: null, type: 'Customer', stage: 'Active Student', nextVisit: '2024-02-10' }, lastMessage: 'What time is the recital?', timestamp: '2024-01-27T16:45:00', unread: 0, channel: 'Email' },
  { id: 'conv4', branch_id: 'branch-2', contact: { id: 'c4', name: 'Liam Johnson', avatar: null, type: 'Customer', stage: 'Active Student', nextVisit: '2024-02-05' }, lastMessage: 'Thanks for the update!', timestamp: '2024-01-28T11:20:00', unread: 0, channel: 'Email' },
  { id: 'conv5', branch_id: 'branch-2', contact: { id: 'c5', name: 'Ava Wilson', avatar: null, type: 'Lead', stage: 'Interested', nextVisit: 'TBD' }, lastMessage: 'I\'d like to know more about your programs', timestamp: '2024-01-28T09:30:00', unread: 3, channel: 'SMS' },
]

// Sample Messages
export const messages = {
  conv1: [
    { id: 'm1', sender: 'Emma Thompson', direction: 'inbound', content: 'Hi! I wanted to confirm my daughter\'s class schedule for next week.', timestamp: '2024-01-28T14:15:00', channel: 'Email' },
    { id: 'm2', sender: 'Jane Doe', direction: 'outbound', content: 'Hello Emma! Yes, her ballet class is scheduled for Monday and Wednesday at 4:00 PM.', timestamp: '2024-01-28T14:20:00', channel: 'Email' },
    { id: 'm3', sender: 'Emma Thompson', direction: 'inbound', content: 'Thank you! Looking forward to the class.', timestamp: '2024-01-28T14:30:00', channel: 'Email' },
  ],
  conv2: [
    { id: 'm4', sender: 'Oliver Brown', direction: 'inbound', content: 'Can I reschedule my trial class?', timestamp: '2024-01-28T13:15:00', channel: 'SMS' },
  ],
  conv3: [
    { id: 'm5', sender: 'Sophia Davis', direction: 'inbound', content: 'What time is the recital?', timestamp: '2024-01-27T16:45:00', channel: 'Email' },
    { id: 'm6', sender: 'Jane Doe', direction: 'outbound', content: 'The recital is on March 15th at 6:00 PM. We\'ll send more details soon!', timestamp: '2024-01-27T17:00:00', channel: 'Email' },
  ],
}

// Dashboard Stats
export const dashboardStats = {
  totalContacts: 1247,
  totalContactsChange: 12.5,
  activeLeads: 89,
  activeLeadsChange: 8.3,
  revenue: 45280,
  revenueChange: 15.2,
  conversionRate: 23.5,
  conversionRateChange: 3.1,
  emailsSent: 1456,
  tasksCompleted: 234,
  openDeals: 45,
  avgDealSize: 1850,
}

// Revenue Chart Data
export const revenueData = [
  { month: 'Jan', revenue: 35000, target: 30000 },
  { month: 'Feb', revenue: 38000, target: 32000 },
  { month: 'Mar', revenue: 42000, target: 35000 },
  { month: 'Apr', revenue: 39000, target: 37000 },
  { month: 'May', revenue: 45000, target: 40000 },
  { month: 'Jun', revenue: 48000, target: 42000 },
]

// Pipeline Data
export const pipelineData = [
  { name: 'New Leads', value: 35, color: 'var(--studio-primary)' },
  { name: 'Contacted', value: 25, color: '#8B5CF6' },
  { name: 'Qualified', value: 20, color: '#EC4899' },
  { name: 'Proposal', value: 12, color: '#F59E0B' },
  { name: 'Won', value: 8, color: '#10B981' },
]

// Lead Sources Data
export const leadSourcesData = [
  { name: 'Website', value: 450, color: 'var(--studio-primary)' },
  { name: 'Referral', value: 320, color: '#10B981' },
  { name: 'Social Media', value: 280, color: '#EC4899' },
  { name: 'Walk-in', value: 150, color: '#F59E0B' },
  { name: 'Events', value: 110, color: '#8B5CF6' },
]

// Activity Feed
export const activityFeed = [
  { id: 'act1', type: 'lead', message: 'New lead added: Michael Chen', time: '2 minutes ago', icon: 'UserPlus' },
  { id: 'act2', type: 'email', message: 'Email campaign "Winter Special" sent to 245 contacts', time: '15 minutes ago', icon: 'Mail' },
  { id: 'act3', type: 'deal', message: 'Deal closed: Premium Package - $2,500', time: '1 hour ago', icon: 'DollarSign' },
  { id: 'act4', type: 'task', message: 'Task completed: Follow-up with Ava Wilson', time: '2 hours ago', icon: 'CheckCircle' },
  { id: 'act5', type: 'appointment', message: 'New appointment scheduled with James Taylor', time: '3 hours ago', icon: 'Calendar' },
]

// Upcoming Tasks
export const upcomingTasks = [
  { id: 'task1', title: 'Follow-up call with Sarah Williams', dueDate: '2024-02-05', priority: 'High', assignee: 'Jane Doe' },
  { id: 'task2', title: 'Send proposal to James Taylor', dueDate: '2024-02-06', priority: 'High', assignee: 'John Smith' },
  { id: 'task3', title: 'Prepare trial class materials', dueDate: '2024-02-07', priority: 'Medium', assignee: 'Mike Wilson' },
  { id: 'task4', title: 'Review contract renewals', dueDate: '2024-02-08', priority: 'Medium', assignee: 'John Smith' },
]

// Form Templates
export const formTemplates = [
  { id: 'f1', name: 'Student Registration', description: 'Complete registration form for new students', fields: 15, submissions: 234, conversionRate: 78, createdAt: '2023-09-15' },
  { id: 'f2', name: 'Trial Class Signup', description: 'Quick signup for trial classes', fields: 8, submissions: 456, conversionRate: 85, createdAt: '2023-10-01' },
  { id: 'f3', name: 'Parent Consent Form', description: 'Medical and liability consent', fields: 12, submissions: 189, conversionRate: 92, createdAt: '2023-08-20' },
  { id: 'f4', name: 'Feedback Survey', description: 'Post-class feedback collection', fields: 10, submissions: 567, conversionRate: 45, createdAt: '2023-11-10' },
]

// Email Templates
export const emailTemplates = [
  { id: 'e1', name: 'Welcome Email', category: 'Onboarding', status: 'Active', lastUsed: '2024-01-28', opens: 234, clicks: 89 },
  { id: 'e2', name: 'Class Reminder', category: 'Notifications', status: 'Active', lastUsed: '2024-01-27', opens: 456, clicks: 167 },
  { id: 'e3', name: 'Payment Reminder', category: 'Billing', status: 'Active', lastUsed: '2024-01-25', opens: 123, clicks: 45 },
  { id: 'e4', name: 'Special Offer', category: 'Promotions', status: 'Draft', lastUsed: null, opens: 0, clicks: 0 },
]

// SMS Templates
export const smsTemplates = [
  { id: 's1', name: 'Class Reminder', category: 'Reminders', status: 'Active', sent: 1234, delivered: 1201, responses: 89 },
  { id: 's2', name: 'Appointment Confirmation', category: 'Confirmations', status: 'Active', sent: 567, delivered: 552, responses: 234 },
  { id: 's3', name: 'Payment Received', category: 'Notifications', status: 'Active', sent: 890, delivered: 875, responses: 12 },
  { id: 's4', name: 'Trial Class Invite', category: 'Marketing', status: 'Active', sent: 345, delivered: 338, responses: 67 },
]

// Workflows
export const workflows = [
  { id: 'w1', name: 'New Lead Nurture', status: 'Active', trigger: 'Lead Created', totalRuns: 234, successRate: 78, lastRun: '2024-01-28', steps: 5 },
  { id: 'w2', name: 'Trial Class Follow-up', status: 'Active', trigger: 'Trial Completed', totalRuns: 156, successRate: 85, lastRun: '2024-01-27', steps: 4 },
  { id: 'w3', name: 'Payment Reminder Sequence', status: 'Active', trigger: 'Payment Due', totalRuns: 89, successRate: 92, lastRun: '2024-01-26', steps: 3 },
  { id: 'w4', name: 'Re-engagement Campaign', status: 'Paused', trigger: 'Inactive 30 Days', totalRuns: 45, successRate: 34, lastRun: '2024-01-20', steps: 6 },
]

// AI Calling Scripts
export const aiScripts = [
  { id: 'script1', name: 'Trial Class Invitation', type: 'Outbound', status: 'Active', lastUsed: '2024-01-28', calls: 145, conversions: 67 },
  { id: 'script2', name: 'Payment Follow-up', type: 'Outbound', status: 'Active', lastUsed: '2024-01-27', calls: 89, conversions: 72 },
  { id: 'script3', name: 'Feedback Collection', type: 'Outbound', status: 'Active', lastUsed: '2024-01-25', calls: 234, conversions: 156 },
]

// AI Personas
export const aiPersonas = [
  { id: 'p1', name: 'Emily - Friendly Receptionist', voice: 'Female', personality: 'Warm, welcoming, and enthusiastic about dance education', language: 'English (US)', speed: 'Normal', isActive: true },
  { id: 'p2', name: 'David - Professional Assistant', voice: 'Male', personality: 'Professional, courteous, and detail-oriented', language: 'English (US)', speed: 'Slightly Slow', isActive: false },
  { id: 'p3', name: 'Sofia - Bilingual Support', voice: 'Female', personality: 'Patient, helpful, and culturally sensitive', language: 'English/Spanish', speed: 'Normal', isActive: false },
]

// Knowledge Base Documents
export const knowledgeBaseDocuments = [
  { id: 'kb1', name: 'Class Schedules & Pricing.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: '2024-01-15', status: 'Processed' },
  { id: 'kb2', name: 'Registration Policies.docx', type: 'docx', size: '856 KB', uploadedAt: '2024-01-20', status: 'Processed' },
  { id: 'kb3', name: 'FAQ Script.txt', type: 'txt', size: '124 KB', uploadedAt: '2024-01-22', status: 'Processed' },
  { id: 'kb4', name: 'Welcome Message.mp3', type: 'mp3', size: '3.2 MB', uploadedAt: '2024-01-25', status: 'Processing' },
]


