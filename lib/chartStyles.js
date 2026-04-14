/** Recharts strokes/tooltip — uses CSS variables so charts respect light/dark mode */

export const chartGridStroke = 'hsl(var(--border))'
export const chartAxisStroke = 'hsl(var(--muted-foreground))'

export const rechartsTooltipContentStyle = {
  backgroundColor: 'hsl(var(--popover))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
  color: 'hsl(var(--popover-foreground))',
}
