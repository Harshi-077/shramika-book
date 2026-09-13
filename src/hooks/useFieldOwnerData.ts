import { useCallback, useEffect, useState } from 'react'
import { getFieldOwners, getFieldOwnerWork, computeFieldOwnerStats } from '../lib/queries'
import type { FieldOwnerWithStats, FieldOwnerWork } from '../types'

export function useFieldOwnerData() {
  const [owners, setOwners] = useState<FieldOwnerWithStats[]>([])
  const [work, setWork] = useState<FieldOwnerWork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [ownerRows, workRows] = await Promise.all([getFieldOwners(), getFieldOwnerWork()])
      setWork(workRows)
      setOwners(computeFieldOwnerStats(ownerRows, workRows))
    } catch (err: any) {
      setError(err.message ?? 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { owners, work, loading, error, refresh }
}
