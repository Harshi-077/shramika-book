import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarDays, AlertCircle } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import { checkAttendanceExists, saveAttendance, todayDateString } from '../lib/queries'
import type { Labourer } from '../types'

interface AttendanceFormModalProps {
  labourers: Labourer[]
  onClose: () => void
  onSaved: () => void
  initialDate?: string
}

export default function AttendanceFormModal({
  labourers,
  onClose,
  onSaved,
  initialDate,
}: AttendanceFormModalProps) {
  const { t } = useLanguage()
  const [date, setDate] = useState(initialDate ?? todayDateString())
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [notice, setNotice] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    checkAttendanceExists(date)
      .then((ids) => {
        if (cancelled) return
        if (ids.length > 0) {
          setSelected(new Set(ids))
          setNotice(t('attendance_alreadyExists'))
        } else {
          setSelected(new Set())
          setNotice(null)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === labourers.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(labourers.map((l) => l.id)))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await saveAttendance(date, Array.from(selected))
      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={t('attendance_addTitle')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="attendance-date">
            <CalendarDays size={14} />
            {t('attendance_date')}
          </label>
          <input
            id="attendance-date"
            type="date"
            className="form-control"
            value={date}
            max={todayDateString()}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {notice && (
          <div className="form-notice">
            <AlertCircle size={15} />
            {notice}
          </div>
        )}

        {labourers.length === 0 ? (
          <div className="empty-state">{t('attendance_noLabourers')}</div>
        ) : (
          <div className="form-group">
            <div className="select-all-row">
              <span className="label">{t('attendance_selectLabourers')}</span>
              <button type="button" className="select-all-btn" onClick={toggleAll}>
                {t('attendance_selectAll')}
              </button>
            </div>
            <div className="checkbox-list-card">
              {labourers.map((l) => (
                <label className="checkbox-row" key={l.id}>
                  <input
                    type="checkbox"
                    checked={selected.has(l.id)}
                    onChange={() => toggle(l.id)}
                  />
                  <div>
                    <div className="name">{l.name}</div>
                    <div className="meta">{l.phone_number}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {error && <div className="form-error">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting || labourers.length === 0}
        >
          {submitting ? t('loading') : t('save')}
        </button>
      </form>
    </Modal>
  )
}
