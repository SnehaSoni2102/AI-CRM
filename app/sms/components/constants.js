export const SMS_VARIABLES = [
  { name: '{{name}}', description: 'Contact name' },
  { name: '{{date}}', description: 'Current date' },
  { name: '{{time}}', description: 'Current time' },
  { name: '{{class}}', description: 'Class name' },
  { name: '{{location}}', description: 'Branch location' },
]

export function previewMessage(message = '') {
  return String(message || '')
    .replaceAll('{{name}}', 'John Doe')
    .replaceAll('{{date}}', 'Mar 26, 2026')
    .replaceAll('{{time}}', '3:00 PM')
    .replaceAll('{{class}}', 'Ballet')
    .replaceAll('{{location}}', 'Stamford')
}

