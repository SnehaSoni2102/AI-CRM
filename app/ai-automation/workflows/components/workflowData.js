import { Mail, MessageSquare, Phone } from 'lucide-react'

export const workflowData = [
  {
    id: 'wf-1',
    name: 'New Lead Nurture',
    trigger: 'Lead Created',
    steps: 5,
    totalRuns: 28,
    successRate: 75,
    lastRun: 'Jan 27, 2025',
    status: 'active',
  },
  {
    id: 'wf-2',
    name: 'Follow-Up Call',
    trigger: '24 Hours After Lead Creation',
    steps: 3,
    totalRuns: 15,
    successRate: 60,
    lastRun: 'Feb 1, 2025',
    status: 'active',
  },
  {
    id: 'wf-3',
    name: 'Email Campaign',
    trigger: '5 Days After Lead Creation',
    steps: 4,
    totalRuns: 30,
    successRate: 80,
    lastRun: 'Jan 30, 2025',
    status: 'active',
  },
  {
    id: 'wf-4',
    name: 'Survey Follow-Up',
    trigger: 'After First Interaction',
    steps: 2,
    totalRuns: 20,
    successRate: 90,
    lastRun: 'Jan 29, 2025',
    status: 'active',
  },
  {
    id: 'wf-5',
    name: 'Product Demo',
    trigger: '1 Week After Initial Contact',
    steps: 4,
    totalRuns: 10,
    successRate: 60,
    lastRun: 'Jan 28, 2025',
    status: 'active',
  },
  {
    id: 'wf-6',
    name: 'Re-engagement Campaign',
    trigger: 'Paused workflow',
    steps: 0,
    totalRuns: 0,
    successRate: 0,
    lastRun: '-',
    status: 'paused',
  },
]

export const stepTypes = [
  { id: 'call', name: 'Call', icon: Phone, color: 'bg-muted-foreground' },
  { id: 'email', name: 'Email', icon: Mail, color: 'bg-muted-foreground' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'bg-muted-foreground' },
]

export const wizardSteps = [
  { id: 1, title: 'Sequence Details', subtitle: 'Provide basic information about your outreach sequence' },
  { id: 2, title: 'Select Contacts', subtitle: 'Choose the contacts you want to include in this sequence' },
  { id: 3, title: 'Create Sequence Steps', subtitle: 'Set up actions and timing for your outreach sequence' },
]

export const sampleContacts = [
  { id: 'c1', name: 'Arya Sharma', email: 'arya.sharma@crmtest.com', group: 'US', subtitle: 'Kiran Patel' },
  { id: 'c2', name: 'Priya Verma', email: 'priya.verma@crmtest.com', group: 'US', subtitle: 'Arjun Reddy' },
  { id: 'c3', name: 'Divya Kapoor', email: 'divya.kapoor@crmtest.com', group: 'EMEA', subtitle: 'Rohan Singh' },
  { id: 'c4', name: 'Vikram Iyer', email: 'vikram.iyer@crmtest.com', group: 'APAC', subtitle: 'Sakshi Mehra' },
  { id: 'c5', name: 'Amit Verma', email: 'amit.verma@crmtest.com', group: 'US', subtitle: 'Neha Gupta' },
  { id: 'c6', name: 'Rohan Singh', email: 'rohan.singh@crmtest.com', group: 'EMEA', subtitle: 'Amit Verma' },
]
