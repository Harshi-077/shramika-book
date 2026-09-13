import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Users,
  CalendarCheck,
  Wallet,
  AlertCircle,
  UserPlus,
  CalendarPlus,
  HandCoins,
  Tractor,
  CalendarDays,
} from 'lucide-react'
import Layout from '../components/Layout'
import LabourerFormModal from '../components/LabourerFormModal'
import AttendanceFormModal from '../components/AttendanceFormModal'
import PaymentFormModal from '../components/PaymentFormModal'
import { useLabourData } from '../hooks/useLabourData'
import { useLanguage } from '../i18n/LanguageContext'
import { addLabourer, todayDateString } from '../lib/queries'
import { formatCurrency, formatDate } from '../lib/format'
import type { Gender } from '../types'

export default function Dashboard() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { labourers, attendance, payments, loading, refresh } = useLabourData()

  const [showAddLabourer, setShowAddLabourer] = useState(false)
  const [showAddAttendance, setShowAddAttendance] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)

  const today = todayDateString()

  const todaysAttendanceCount = useMemo(() => {
    const record = attendance.find((a) => a.attendance_date === today)
    return record?.labourer_ids.length ?? 0
  }, [attendance, today])

  const totalWages = useMemo(
    () => labourers.reduce((sum, l) => sum + l.totalWage, 0),
    [labourers]
  )

  const pendingPayments = useMemo(
    () => labourers.reduce((sum, l) => sum + l.pending, 0),
    [labourers]
  )

  const labourerNameById = useMemo(
    () => new Map(labourers.map((l) => [l.id, l.name])),
    [labourers]
  )

  const recentActivity = useMemo(() => {
    const attendanceEvents = attendance.map((a) => ({
      type: 'attendance' as const,
      date: a.attendance_date,
      title: t('attendance_title'),
      text: `${a.labourer_ids.length} ${t('attendance_present')}`,
    }))
    const paymentEvents = payments.map((p) => ({
      type: 'payment' as const,
      date: p.payment_date,
      title: t('payments_title'),
      text: `${labourerNameById.get(p.labourer_id) ?? ''} · ${formatCurrency(p.amount)}`,
    }))
    return [...attendanceEvents, ...paymentEvents]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }, [attendance, payments, labourerNameById, t])

  const handleAddLabourer = async (input: {
    name: string
    phone_number: string
    gender: Gender
    daily_wage: number
  }) => {
    await addLabourer(input)
    await refresh()
  }

  const brandHeader = (
    <div className="brand-header">
      <div className="brand-logo">
        <BookOpen size={19} />
      </div>
      <div className="brand-text">
        <span className="brand-name">{t('appName')}</span>
        <span className="brand-subtitle">{t('dashboard_title')}</span>
      </div>
    </div>
  )

  return (
    <Layout title={t('dashboard_title')} headerContent={brandHeader}>
      <div className="summary-grid">
        <div className="summary-card">
          <div className="icon-badge">
            <Users size={17} />
          </div>
          <div>
            <div className="value">{loading ? '—' : labourers.length}</div>
            <div className="label">{t('dashboard_totalLabourers')}</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="icon-badge">
            <CalendarCheck size={17} />
          </div>
          <div>
            <div className="value">{loading ? '—' : todaysAttendanceCount}</div>
            <div className="label">{t('dashboard_todaysAttendance')}</div>
          </div>
        </div>
        <div className="summary-card highlight">
          <div className="icon-badge">
            <Wallet size={17} />
          </div>
          <div>
            <div className="value">{loading ? '—' : formatCurrency(totalWages)}</div>
            <div className="label">{t('dashboard_totalWages')}</div>
          </div>
        </div>
        <div className="summary-card accent">
          <div className="icon-badge">
            <AlertCircle size={17} />
          </div>
          <div>
            <div className="value">{loading ? '—' : formatCurrency(pendingPayments)}</div>
            <div className="label">{t('dashboard_pendingPayments')}</div>
          </div>
        </div>
      </div>

      <div className="section-title">{t('dashboard_quickActions')}</div>
      <div className="quick-actions">
        <div className="quick-action-btn" onClick={() => setShowAddLabourer(true)}>
          <span className="icon-badge">
            <UserPlus size={24} strokeWidth={2.1} />
          </span>
          {t('dashboard_addLabourer')}
        </div>
        <div className="quick-action-btn" onClick={() => setShowAddAttendance(true)}>
          <span className="icon-badge">
            <CalendarPlus size={24} strokeWidth={2.1} />
          </span>
          {t('dashboard_addAttendance')}
        </div>
        <div
          className={`quick-action-btn ${labourers.length === 0 ? 'disabled' : ''}`}
          onClick={() => setShowAddPayment(true)}
        >
          <span className="icon-badge">
            <HandCoins size={24} strokeWidth={2.1} />
          </span>
          {t('dashboard_recordPayment')}
        </div>
        <div className="quick-action-btn" onClick={() => navigate('/field-owners')}>
          <span className="icon-badge">
            <Tractor size={24} strokeWidth={2.1} />
          </span>
          {t('dashboard_fieldOwners')}
        </div>
      </div>

      <div className="section-title">{t('dashboard_recentActivity')}</div>
      {recentActivity.length === 0 ? (
        <div className="empty-state">
          <CalendarDays className="empty-icon" />
          {t('noData')}
        </div>
      ) : (
        recentActivity.map((event, idx) => (
          <div className="activity-item" key={idx}>
            <div className={`activity-icon ${event.type === 'payment' ? 'payment' : ''}`}>
              {event.type === 'attendance' ? (
                <CalendarCheck size={16} />
              ) : (
                <HandCoins size={16} />
              )}
            </div>
            <div className="activity-body">
              <div className="activity-title">{event.title}</div>
              <div className="activity-sub">{event.text}</div>
            </div>
            <div className="activity-date">{formatDate(event.date)}</div>
          </div>
        ))
      )}

      {showAddLabourer && (
        <LabourerFormModal
          onClose={() => setShowAddLabourer(false)}
          onSubmit={handleAddLabourer}
        />
      )}
      {showAddAttendance && (
        <AttendanceFormModal
          labourers={labourers}
          onClose={() => setShowAddAttendance(false)}
          onSaved={refresh}
        />
      )}
      {showAddPayment && (
        <PaymentFormModal
          labourers={labourers}
          onClose={() => setShowAddPayment(false)}
          onSaved={refresh}
        />
      )}
    </Layout>
  )
}
