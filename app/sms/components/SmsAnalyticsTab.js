'use client'

import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SmsAnalyticsTab() {
  // Placeholder until backend analytics endpoints are provided.
  return (
    <TabsContent value="analytics" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Sent', value: '—' },
          { label: 'Delivered', value: '—' },
          { label: 'Failed', value: '—' },
          { label: 'Responses', value: '—' },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-2">Analytics API not wired yet</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Performance by template</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you share the SMS analytics endpoints, we’ll show real delivery/response performance here.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

