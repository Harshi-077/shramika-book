export type Gender = 'Male' | 'Female'

export interface Labourer {
  id: string
  manager_id: string
  name: string
  phone_number: string
  gender: Gender
  daily_wage: number
  created_at: string
}

export interface AttendanceRecord {
  id: string
  manager_id: string
  attendance_date: string // YYYY-MM-DD
  created_at: string
}

export interface AttendanceLabourer {
  id: string
  attendance_id: string
  labourer_id: string
}

export interface Payment {
  id: string
  manager_id: string
  labourer_id: string
  amount: number
  payment_date: string // YYYY-MM-DD
  created_at: string
}

export interface FieldOwner {
  id: string
  manager_id: string
  name: string
  phone_number: string
  created_at: string
}

export interface FieldOwnerWork {
  id: string
  manager_id: string
  field_owner_id: string
  work_date: string // YYYY-MM-DD
  workers_sent: number
  created_at: string
}

export type Language = 'en' | 'te'

export interface Settings {
  id: string
  manager_id: string
  language: Language
  created_at: string
}

// Derived / computed shapes used across the UI

export interface LabourerWithStats extends Labourer {
  attendanceDays: number
  totalWage: number
  paid: number
  pending: number
}

export interface AttendanceWithLabourers extends AttendanceRecord {
  labourer_ids: string[]
}

export interface FieldOwnerWithStats extends FieldOwner {
  totalWorkersSent: number
}
