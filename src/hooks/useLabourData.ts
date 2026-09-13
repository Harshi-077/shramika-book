import { useCallback, useEffect, useState } from 'react'
import {
  getLabourers,
  getAttendanceRecords,
  getPayments,
  computeLabourerStats,
} from '../lib/queries'
import type { AttendanceWithLabourers, LabourerWithStats, Payment } from '../types'

export function useLabourData() {
  const [labourers, setLabourers] = useState<LabourerWithStats[]>([])
  const [attendance, setAttendance] = useState<AttendanceWithLabourers[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [labourerRows, attendanceRows, paymentRows] = await Promise.all([
        getLabourers(),
        getAttendanceRecords(),
        getPayments(),
      ])
      setAttendance(attendanceRows)
      setPayments(paymentRows)
      setLabourers(computeLabourerStats(labourerRows, attendanceRows, paymentRows))
    } catch (err: any) {
      setError(err.message ?? 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { labourers, attendance, payments, loading, error, refresh }
}
