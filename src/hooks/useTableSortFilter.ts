import { useState, useMemo, useCallback } from 'react'

type SortDirection = 'asc' | 'desc' | null

interface SortConfig<T> {
  key: keyof T | null
  direction: SortDirection
}

export function useTableSortFilter<T extends Record<string, any>>(
  data: T[],
  filterableKeys: (keyof T)[],
  defaultSortKey?: keyof T
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: defaultSortKey ?? null,
    direction: defaultSortKey ? 'desc' : null,
  })
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' }
        if (prev.direction === 'desc') return { key: null, direction: null }
        return { key, direction: 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }, [])

  const setFilter = useCallback((key: keyof T, value: string) => {
    setFilters(prev => ({ ...prev, [String(key)]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const getSortIndicator = useCallback((key: keyof T) => {
    if (sortConfig.key !== key) return '⇅'
    if (sortConfig.direction === 'asc') return '↑'
    if (sortConfig.direction === 'desc') return '↓'
    return '⇅'
  }, [sortConfig])

  const processedData = useMemo(() => {
    // First filter
    let result = data.filter(row => {
      return filterableKeys.every(key => {
        const filterValue = filters[String(key)]
        if (!filterValue) return true
        const cellValue = String(row[key] ?? '').toLowerCase()
        return cellValue.includes(filterValue.toLowerCase())
      })
    })

    // Then sort
    if (sortConfig.key && sortConfig.direction) {
      const key = sortConfig.key
      const dir = sortConfig.direction
      result = [...result].sort((a, b) => {
        const aVal = a[key]
        const bVal = b[key]
        if (aVal == null && bVal == null) return 0
        if (aVal == null) return dir === 'asc' ? -1 : 1
        if (bVal == null) return dir === 'asc' ? 1 : -1
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return dir === 'asc' ? aVal - bVal : bVal - aVal
        }
        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        if (aStr < bStr) return dir === 'asc' ? -1 : 1
        if (aStr > bStr) return dir === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, filters, sortConfig, filterableKeys])

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(v => v.length > 0).length
  }, [filters])

  return {
    data: processedData,
    sortConfig,
    handleSort,
    getSortIndicator,
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
  }
}
