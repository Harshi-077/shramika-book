import { supabase } from './supabase'
import type {
  Labourer,
  Gender,
  AttendanceRecord,
  AttendanceWithLabourers,
  Payment,
  FieldOwner,
  FieldOwnerWork,
  FieldOwnerWithStats,
  Language,
  LabourerWithStats,
} from '../types'

async function getManagerId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('Not authenticated')
  return data.user.id
}

// ---------- Labourers ----------

export async function getLabourers(): Promise<Labourer[]> {
  const { data, error } = await supabase
    .from('Labours')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as Labourer[]) ?? []
}

export async function addLabourer(input: {
  name: string
  phone_number: string
  gender: Gender
  daily_wage: number
}): Promise<Labourer> {
  const manager_id = await getManagerId()
  const { data, error } = await supabase
    .from('Labours')
    .insert([{ ...input, manager_id }])
    .select()
    .single()
  if (error) throw error
  return data as Labourer
}

export async function updateLabourer(
  id: string,
  input: Partial<{ name: string; phone_number: string; gender: Gender; daily_wage: number }>
): Promise<Labourer> {
  const { data, error } = await supabase
    .from('Labours')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Labourer
}

// ---------- Attendance ----------

export async function getAttendanceRecords(): Promise<AttendanceWithLabourers[]> {
  const { data, error } = await supabase
    .from('Attendance')
    .select('*, attendance_labourers(labourer_id)')
    .order('attendance_date', { ascending: false })
  if (error) throw error
  return (data ?? []).map((row: any) => ({
    id: row.id,
    manager_id: row.manager_id,
    attendance_date: row.attendance_date,
    created_at: row.created_at,
    labourer_ids: (row.attendance_labourers ?? []).map((l: any) => l.labourer_id),
  }))
}

/**
 * Creates (or replaces) the attendance entry for a given date with the
 * selected labourers marked present.
 */
export async function saveAttendance(
  date: string,
  labourerIds: string[]
): Promise<AttendanceRecord> {
  const manager_id = await getManagerId()

  // Check whether an attendance record already exists for this date
  const { data: existing, error: findError } = await supabase
    .from('Attendance')
    .select('id')
    .eq('attendance_date', date)
    .maybeSingle()
  if (findError) throw findError

  let attendanceId: string

  if (existing) {
    attendanceId = existing.id
    // Clear previous selections for this date before re-inserting
    const { error: deleteError } = await supabase
      .from('attendance_labourers')
      .delete()
      .eq('attendance_id', attendanceId)
    if (deleteError) throw deleteError
  } else {
    const { data: created, error: createError } = await supabase
      .from('Attendance')
      .insert([{ attendance_date: date, manager_id }])
      .select()
      .single()
    if (createError) throw createError
    attendanceId = created.id
  }

  if (labourerIds.length > 0) {
    const rows = labourerIds.map((labourer_id) => ({
      attendance_id: attendanceId,
      labourer_id,
    }))
    const { error: insertError } = await supabase.from('attendance_labourers').insert(rows)
    if (insertError) throw insertError
  }

  const { data: record, error: fetchError } = await supabase
    .from('Attendance')
    .select('*')
    .eq('id', attendanceId)
    .single()
  if (fetchError) throw fetchError
  return record as AttendanceRecord
}

export async function checkAttendanceExists(date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('Attendance')
    .select('id, attendance_labourers(labourer_id)')
    .eq('attendance_date', date)
    .maybeSingle()
  if (error) throw error
  if (!data) return []
  return ((data as any).attendance_labourers ?? []).map((l: any) => l.labourer_id)
}

// ---------- Payments ----------

export async function getPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('payment_date', { ascending: false })
  if (error) throw error
  return (data as Payment[]) ?? []
}

export async function addPayment(labourer_id: string, amount: number): Promise<Payment> {
  const manager_id = await getManagerId()
  const payment_date = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('payments')
    .insert([{ manager_id, labourer_id, amount, payment_date }])
    .select()
    .single()
  if (error) throw error
  return data as Payment
}

export async function deletePayment(id: string): Promise<void> {
  const { data, error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) {
    throw new Error(error.message || 'Failed to delete payment. Please try again.')
  }

  // Supabase RLS silently deletes 0 rows (no error) if the row doesn't belong
  // to the logged-in manager, or if it no longer exists. Surface that as an
  // explicit error instead of pretending the delete succeeded.
  if (!data || data.length === 0) {
    throw new Error(
      'Payment could not be deleted. It may have already been removed, or you do not have permission to delete it.'
    )
  }
}

// ---------- Field Owners ----------

export async function getFieldOwners(): Promise<FieldOwner[]> {
  const { data, error } = await supabase
    .from('field_owners')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as FieldOwner[]) ?? []
}

export async function addFieldOwner(input: {
  name: string
  phone_number: string
}): Promise<FieldOwner> {
  const manager_id = await getManagerId()
  const { data, error } = await supabase
    .from('field_owners')
    .insert([{ ...input, manager_id }])
    .select()
    .single()
  if (error) throw error
  return data as FieldOwner
}

export async function getFieldOwnerWork(): Promise<FieldOwnerWork[]> {
  const { data, error } = await supabase
    .from('field_owner_work')
    .select('*')
    .order('work_date', { ascending: false })
  if (error) throw error
  return (data as FieldOwnerWork[]) ?? []
}

export async function addFieldOwnerWork(input: {
  field_owner_id: string
  work_date: string
  workers_sent: number
}): Promise<FieldOwnerWork> {
  const manager_id = await getManagerId()
  const { data, error } = await supabase
    .from('field_owner_work')
    .insert([{ ...input, manager_id }])
    .select()
    .single()
  if (error) throw error
  return data as FieldOwnerWork
}

// ---------- Settings ----------

export async function getSettings(): Promise<{ language: Language } | null> {
  const { data, error } = await supabase.from('settings').select('*').maybeSingle()
  if (error) throw error
  if (!data) return null
  return { language: data.language as Language }
}

export async function upsertSettings(language: Language): Promise<void> {
  const manager_id = await getManagerId()
  const { data: existing, error: findError } = await supabase
    .from('settings')
    .select('id')
    .maybeSingle()
  if (findError) throw findError

  if (existing) {
    const { error } = await supabase
      .from('settings')
      .update({ language })
      .eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('settings').insert([{ manager_id, language }])
    if (error) throw error
  }
}

// ---------- Derived computations ----------

export function computeLabourerStats(
  labourers: Labourer[],
  attendance: AttendanceWithLabourers[],
  payments: Payment[]
): LabourerWithStats[] {
  const attendanceCountByLabourer = new Map<string, number>()
  for (const record of attendance) {
    for (const labourerId of record.labourer_ids) {
      attendanceCountByLabourer.set(
        labourerId,
        (attendanceCountByLabourer.get(labourerId) ?? 0) + 1
      )
    }
  }

  const paidByLabourer = new Map<string, number>()
  for (const payment of payments) {
    paidByLabourer.set(
      payment.labourer_id,
      (paidByLabourer.get(payment.labourer_id) ?? 0) + Number(payment.amount)
    )
  }

  return labourers.map((labourer) => {
    const attendanceDays = attendanceCountByLabourer.get(labourer.id) ?? 0
    const totalWage = attendanceDays * Number(labourer.daily_wage)
    const paid = paidByLabourer.get(labourer.id) ?? 0
    const pending = totalWage - paid
    return { ...labourer, attendanceDays, totalWage, paid, pending }
  })
}

export function computeFieldOwnerStats(
  owners: FieldOwner[],
  work: FieldOwnerWork[]
): FieldOwnerWithStats[] {
  const sentByOwner = new Map<string, number>()
  for (const entry of work) {
    sentByOwner.set(
      entry.field_owner_id,
      (sentByOwner.get(entry.field_owner_id) ?? 0) + Number(entry.workers_sent)
    )
  }
  return owners.map((owner) => ({
    ...owner,
    totalWorkersSent: sentByOwner.get(owner.id) ?? 0,
  }))
}

export function todayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}
