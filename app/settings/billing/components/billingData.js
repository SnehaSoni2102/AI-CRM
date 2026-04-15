export const PLAN_CATALOG = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$299/mo',
    seats: '3 seats',
    aiCalls: '2,000 AI calls',
    includes: ['CRM Pipeline', 'Inbox', 'Basic Integrations'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$699/mo',
    seats: '10 seats',
    aiCalls: '10,000 AI calls',
    includes: ['CRM + AI Agent', 'Human Queue', 'Meta + HubSpot Sync'],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$1,499/mo',
    seats: 'Unlimited seats',
    aiCalls: '35,000 AI calls',
    includes: ['White-label', 'Priority Support', 'Advanced Reporting'],
  },
]

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1001',
    studioName: 'Miami Dance Collective',
    owner: 'Sarah Mills',
    email: 'ops@miamidancecollective.com',
    plan: 'Scale',
    monthlyAmount: 1499,
    status: 'Active',
    seatsUsed: 18,
    seatsLimit: 999,
    aiCallsUsed: 21240,
    aiCallsLimit: 35000,
    importedLeads: 1860,
    activeIntegrations: ['Meta', 'HubSpot'],
    nextBillingDate: '2026-05-03T00:00:00.000Z',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'cust-1002',
    studioName: 'Austin Rhythm Academy',
    owner: 'David Chen',
    email: 'billing@austinrhythm.co',
    plan: 'Growth',
    monthlyAmount: 699,
    status: 'Active',
    seatsUsed: 8,
    seatsLimit: 10,
    aiCallsUsed: 6840,
    aiCallsLimit: 10000,
    importedLeads: 924,
    activeIntegrations: ['Meta'],
    nextBillingDate: '2026-04-29T00:00:00.000Z',
    paymentMethod: 'Mastercard •••• 1188',
  },
  {
    id: 'cust-1003',
    studioName: 'LA Movement Hub',
    owner: 'Priya Shah',
    email: 'accounts@lamovementhub.com',
    plan: 'Starter',
    monthlyAmount: 299,
    status: 'Past Due',
    seatsUsed: 3,
    seatsLimit: 3,
    aiCallsUsed: 2230,
    aiCallsLimit: 2000,
    importedLeads: 320,
    activeIntegrations: ['HubSpot'],
    nextBillingDate: '2026-04-12T00:00:00.000Z',
    paymentMethod: 'Amex •••• 7722',
  },
  {
    id: 'cust-1004',
    studioName: 'Dallas Kids Dance',
    owner: 'Noah Carter',
    email: 'owner@dallaskidsdance.com',
    plan: 'Growth',
    monthlyAmount: 699,
    status: 'Trial',
    seatsUsed: 4,
    seatsLimit: 10,
    aiCallsUsed: 780,
    aiCallsLimit: 10000,
    importedLeads: 104,
    activeIntegrations: [],
    nextBillingDate: '2026-05-18T00:00:00.000Z',
    paymentMethod: 'No card yet',
  },
]

export const INVOICES = [
  { id: 'INV-4821', customer: 'Miami Dance Collective', amount: 1499, status: 'Paid', dueDate: '2026-04-03T00:00:00.000Z' },
  { id: 'INV-4822', customer: 'Austin Rhythm Academy', amount: 699, status: 'Paid', dueDate: '2026-03-29T00:00:00.000Z' },
  { id: 'INV-4823', customer: 'LA Movement Hub', amount: 299, status: 'Overdue', dueDate: '2026-04-12T00:00:00.000Z' },
  { id: 'INV-4824', customer: 'Dallas Kids Dance', amount: 0, status: 'Trial', dueDate: '2026-05-18T00:00:00.000Z' },
]

export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export function statusClass(status) {
  if (status === 'Active' || status === 'Paid') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
  if (status === 'Trial') return 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400'
  return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
}
