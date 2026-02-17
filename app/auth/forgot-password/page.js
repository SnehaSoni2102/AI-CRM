 'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setMessage('If an account exists for that email, you will receive an email with reset instructions.')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto h-10 w-10 rounded-lg bg-brand flex items-center justify-center mb-3">
            <span className="text-white font-medium">DA</span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">Forgot password</h2>
          <p className="text-sm text-slate-500 mt-1">Enter your email and we'll send you instructions to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm text-slate-700 block mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 text-sm text-teal-800 bg-teal-50 border border-teal-100 rounded-lg">
              {message}
            </div>
          )}

          <Button type="submit" className="w-full h-10" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Remembered your password?{' '}
            <a href="/login" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}


