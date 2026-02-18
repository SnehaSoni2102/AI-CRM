'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import RoleEditor from '@/app/roles/components/RoleEditor'
import { getToken } from '@/lib/auth'
import { useToast } from '@/components/ui/toast'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

function deepClonePermissions(schema) {
  if (!schema) return {}
  const out = {}
  for (const [sectionKey, sectionVal] of Object.entries(schema)) {
    out[sectionKey] = { name: sectionVal.name, permissions: {} }
    for (const [permKey, permVal] of Object.entries(sectionVal.permissions || {})) {
      out[sectionKey].permissions[permKey] = {
        read: !!permVal.read,
        write: !!permVal.write,
        edit: !!permVal.edit,
        delete: !!permVal.delete,
      }
    }
  }
  return out
}

export default function RolesDialog({
  open,
  onClose,
  onRefresh,
  initialRoleId,
  permissionsSchema,
}) {
  const [editingRole, setEditingRole] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const isCreating = !initialRoleId

  useEffect(() => {
    if (!open) {
      setEditingRole(null)
      return
    }
    if (initialRoleId) {
      setLoading(true)
      fetch(`${API_BASE}/api/role/${initialRoleId}`, {
        headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.success && json.data) {
            const role = json.data
            setEditingRole({
              role: role.role,
              permissions: JSON.parse(JSON.stringify(role.permissions || {})),
              _id: role._id,
            })
          } else {
            toast.error({ title: 'Error', message: json?.message || 'Failed to load role' })
            onClose()
          }
        })
        .catch((e) => {
          console.error(e)
          toast.error({ title: 'Error', message: 'Failed to load role' })
          onClose()
        })
        .finally(() => setLoading(false))
    } else {
      setEditingRole({
        role: '',
        permissions: deepClonePermissions(permissionsSchema),
      })
    }
  }, [open, initialRoleId, permissionsSchema])

  function togglePermission(sectionKey, permKey, action) {
    setEditingRole((prev) => {
      if (!prev) return prev
      const next = JSON.parse(JSON.stringify(prev))
      if (!next.permissions[sectionKey]) next.permissions[sectionKey] = { permissions: {} }
      if (!next.permissions[sectionKey].permissions[permKey]) {
        next.permissions[sectionKey].permissions[permKey] = { read: false, write: false, edit: false, delete: false }
      }
      next.permissions[sectionKey].permissions[permKey][action] =
        !next.permissions[sectionKey].permissions[permKey][action]
      return next
    })
  }

  async function handleSave() {
    if (!editingRole) return
    setSaving(true)
    try {
      const payload = { role: editingRole.role, permissions: editingRole.permissions }
      const url = editingRole._id ? `${API_BASE}/api/role/${editingRole._id}` : `${API_BASE}/api/role`
      const method = editingRole._id ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json?.success) {
        toast.success({
          title: editingRole._id ? 'Role Updated' : 'Role Created',
          message: editingRole._id ? 'Role has been updated successfully' : 'Role has been created successfully',
        })
        onRefresh?.()
        onClose()
      } else {
        toast.error({
          title: 'Save Failed',
          message: json?.message || json?.error || 'Unable to save role',
        })
      }
    } catch (e) {
      console.error(e)
      toast.error({ title: 'Error', message: 'An unexpected error occurred while saving the role' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(roleId) {
    if (!confirm('Delete this role? This cannot be undone.')) return
    try {
      const res = await fetch(`${API_BASE}/api/role/${roleId}`, {
        method: 'DELETE',
        headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
      })
      const json = await res.json()
      if (json?.success) {
        toast.success({ title: 'Role Deleted', message: 'Role has been deleted successfully' })
        onRefresh?.()
        onClose()
      } else {
        toast.error({
          title: 'Delete Failed',
          message: json?.message || json?.error || 'Unable to delete role',
        })
      }
    } catch (e) {
      console.error(e)
      toast.error({ title: 'Error', message: 'An unexpected error occurred while deleting the role' })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="2xl">
      <DialogContent onClose={onClose} className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isCreating ? 'Create Role' : 'Edit Role'}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            <p className="ml-4 text-slate-500">Loading role...</p>
          </div>
        ) : (
          <RoleEditor
            editingRole={editingRole}
            isCreating={isCreating}
            permissionsSchema={permissionsSchema}
            onChange={setEditingRole}
            togglePermission={togglePermission}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={onClose}
            embedded
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
