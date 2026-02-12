import { getCurrentUser, getEffectiveBranch } from './auth'
import { ROLES } from './constants'

/**
 * Filter data by branch based on user role and selected branch
 * @param {Array} data - Array of data items with branch_id field
 * @returns {Array} - Filtered data
 */
export function filterByBranch(data) {
  if (!Array.isArray(data)) return []

  const user = getCurrentUser()
  if (!user) return []

  const effectiveBranch = getEffectiveBranch()

  // Super Admin with no branch selected = see all branches
  if (user.role === ROLES.SUPER_ADMIN && !effectiveBranch) {
    return data
  }

  // Super Admin with branch selected or Admin/Staff = filter by branch
  return data.filter((item) => item.branch_id === effectiveBranch)
}

/**
 * Filter data by branch and additional criteria (for staff)
 * @param {Array} data - Array of data items
 * @param {Object} filters - Additional filters { assignedTo, etc. }
 * @returns {Array} - Filtered data
 */
export function filterByBranchAndUser(data, filters = {}) {
  const branchFiltered = filterByBranch(data)
  
  if (!filters || Object.keys(filters).length === 0) {
    return branchFiltered
  }

  return branchFiltered.filter((item) => {
    // Check each filter condition
    for (const [key, value] of Object.entries(filters)) {
      if (item[key] !== value) {
        return false
      }
    }
    return true
  })
}

/**
 * Get branch query parameter for API calls
 * @returns {string|null} - Branch ID or null for all branches
 */
export function getBranchQueryParam() {
  return getEffectiveBranch()
}

/**
 * Check if user can see all branches
 * @returns {boolean}
 */
export function canSeeAllBranches() {
  const user = getCurrentUser()
  return user?.role === ROLES.SUPER_ADMIN
}

/**
 * Check if current view is showing all branches
 * @returns {boolean}
 */
export function isViewingAllBranches() {
  const user = getCurrentUser()
  const effectiveBranch = getEffectiveBranch()
  
  return user?.role === ROLES.SUPER_ADMIN && !effectiveBranch
}

/**
 * Get branch name for display
 * @param {string} branchId - Branch ID
 * @param {Array} branches - Array of branches
 * @returns {string} - Branch name
 */
export function getBranchName(branchId, branches) {
  if (!branchId) return 'All Branches'
  const branch = branches.find((b) => b.id === branchId)
  return branch?.name || 'Unknown Branch'
}


