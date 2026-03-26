'use client'

import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import api from '@/lib/api'

export default function SmsTemplatePreviewDialog({ open, onClose, templateId }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sms, setSms] = useState(null)

  const fetchTemplate = useCallback(async () => {
    if (!templateId) return
    setLoading(true)
    setError(null)
    try {
      const result = await api.get(`/api/smsBuilder/${templateId}`)
      const tpl = result.data?.sms ?? result.data
      if (!result.success || !tpl) {
        setError(result.error || 'Could not load template')
        return
      }
      setSms(tpl)
    } catch (e) {
      console.error(e)
      setError('Could not load template')
    } finally {
      setLoading(false)
    }
  }, [templateId])

  useEffect(() => {
    if (open) fetchTemplate()
  }, [open, fetchTemplate])

  useEffect(() => {
    if (!open) {
      setSms(null)
      setError(null)
      setLoading(false)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="3xl">
      <DialogContent className="max-h-[90vh] overflow-y-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>SMS preview</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center py-14">
            <LoadingSpinner size="lg" text="Loading template…" />
          </div>
        )}

        {error && !loading && (
          <div className="py-6 text-center">
            <p className="text-sm font-medium text-destructive">{error}</p>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={fetchTemplate}>
                Retry
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && sms && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{sms.categoryID?.name || 'Uncategorized'}</Badge>
              {sms.subCategory ? <Badge variant="secondary">{sms.subCategory}</Badge> : null}
              <Badge variant="outline">{sms.name || 'Untitled template'}</Badge>
            </div>

            <div className="rounded-xl border border-border bg-background overflow-hidden">
              <div className="px-4 py-2 border-b border-border bg-muted/20">
                <p className="text-xs text-muted-foreground">Message</p>
              </div>
              <div className="p-4">
                <p className="text-sm whitespace-pre-wrap">{sms.message || '—'}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

