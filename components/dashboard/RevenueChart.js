'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chartAxisStroke, chartGridStroke, rechartsTooltipContentStyle } from '@/lib/chartStyles'

export default function RevenueChart({ data }) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--studio-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--studio-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
            <XAxis dataKey="month" stroke={chartAxisStroke} fontSize={10} className="sm:text-xs" />
            <YAxis stroke={chartAxisStroke} fontSize={10} className="sm:text-xs" />
            <Tooltip contentStyle={rechartsTooltipContentStyle} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--studio-primary)"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="var(--studio-primary)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


