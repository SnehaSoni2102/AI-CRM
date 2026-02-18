'use client'

import { toast as sonnerToast } from 'sonner'

/**
 * Toast utility using Sonner
 * Provides success, error, and info toast notifications
 */
export function useToast() {
  return {
    success: ({ title, message }) => {
      sonnerToast.success(title || 'Success', {
        description: message,
      })
    },
    error: ({ title, message }) => {
      sonnerToast.error(title || 'Error', {
        description: message,
      })
    },
    info: ({ title, message }) => {
      sonnerToast.info(title || 'Info', {
        description: message,
      })
    },
  }
}

// Export toast directly for use outside components
export const toast = {
  success: (title, options) => sonnerToast.success(title, options),
  error: (title, options) => sonnerToast.error(title, options),
  info: (title, options) => sonnerToast.info(title, options),
}
