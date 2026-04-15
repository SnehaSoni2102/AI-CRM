import { redirect } from 'next/navigation'

export default function InboxCallsPage() {
  redirect('/inbox?channel=Call')
}
