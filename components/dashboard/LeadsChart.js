'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { chartAxisStroke, chartGridStroke, rechartsTooltipContentStyle } from '@/lib/chartStyles'

export default function LeadsChart({ data }) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
            <XAxis dataKey="name" stroke={chartAxisStroke} fontSize={10} className="sm:text-xs" />
            <YAxis stroke={chartAxisStroke} fontSize={10} className="sm:text-xs" />
            <Tooltip contentStyle={rechartsTooltipContentStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="value" fill="var(--studio-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


