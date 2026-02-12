'use client'

import { ROLES, ROLE_PERMISSIONS } from './constants'

// Mock user session storage (in production, use NextAuth or similar)
const USER_STORAGE_KEY = 'crm_user_session'

export function login(email, password) {
  // Mock login - in production, validate against backend
  const users = [
    {
      userId: '1',
      email: 'superadmin@danceacademy.com',
      name: 'Super Admin',
      role: ROLES.SUPER_ADMIN,
      branchId: null,
      branchName: null,
      permissions: ROLE_PERMISSIONS[ROLES.SUPER_ADMIN],
    },
    {
      userId: '2',
      email: 'admin.stamford@danceacademy.com',
      name: 'John Smith',
      role: ROLES.ADMIN,
      branchId: 'branch-1',
      branchName: 'Stamford',
      permissions: ROLE_PERMISSIONS[ROLES.ADMIN],
    },
    {
      userId: '3',
      email: 'staff.stamford@danceacademy.com',
      name: 'Jane Doe',
      role: ROLES.STAFF,
      branchId: 'branch-1',
      branchName: 'Stamford',
      permissions: ROLE_PERMISSIONS[ROLES.STAFF],
    },
  ]

  const user = users.find((u) => u.email === email)
  
  if (user && password === 'password') {
    // In production, verify password hash
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    return { success: true, user }
  }

  return { success: false, error: 'Invalid credentials' }
}

export function logout() {
  localStorage.removeItem(USER_STORAGE_KEY)
  localStorage.removeItem('crm_selected_branch')
  window.location.href = '/login'
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  
  const userJson = localStorage.getItem(USER_STORAGE_KEY)
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

export function getUserRole() {
  const user = getCurrentUser()
  return user?.role || null
}

export function isSuperAdmin() {
  return getUserRole() === ROLES.SUPER_ADMIN
}

export function isAdmin() {
  return getUserRole() === ROLES.ADMIN
}

export function isStaff() {
  return getUserRole() === ROLES.STAFF
}

export function getUserBranch() {
  const user = getCurrentUser()
  return user?.branchId || null
}

export function getUserBranchName() {
  const user = getCurrentUser()
  return user?.branchName || null
}

// For Super Admin - get/set selected branch
export function getSelectedBranch() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('crm_selected_branch')
}

export function setSelectedBranch(branchId) {
  if (typeof window === 'undefined') return
  if (branchId) {
    localStorage.setItem('crm_selected_branch', branchId)
  } else {
    localStorage.removeItem('crm_selected_branch')
  }
  window.dispatchEvent(
    new CustomEvent('branch-change', {
      detail: { branchId },
    })
  )
}

// Get effective branch for queries (considers selected branch for super admin)
export function getEffectiveBranch() {
  const user = getCurrentUser()
  if (!user) return null

  if (user.role === ROLES.SUPER_ADMIN) {
    return getSelectedBranch() // Can be null for "All Branches"
  }

  return user.branchId
}


