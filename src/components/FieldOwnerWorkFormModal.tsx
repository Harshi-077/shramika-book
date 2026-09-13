import { useState } from 'react'
import type { FormEvent } from 'react'
import { Tractor, CalendarDays, Users } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import { addFieldOwnerWork, todayDateString } from '../lib/queries'
import type { FieldOwner } from '../types'

interface FieldOwnerWorkFormModalProps {
  owners: FieldOwner[]
  onClose: () => void
  onSaved: () => void
}

export default function FieldOwnerWorkFormModal({
  owners,
  onClose,
  onSaved,
}: FieldOwnerWorkFormModalProps) {
  const { t } = useLanguage()
  const [ownerId, setOwnerId] = useState(owners[0]?.id ?? '')
  const [date, setDate] = useState(todayDateString())
  const [workersSent, setWorkersSent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const count = Number(workersSent)
    if (!ownerId || !date || !workersSent || Number.isNaN(count) || count <= 0) {
      setError(t('required'))
      return
    }
    setSubmitting(true)
    try {
      await addFieldOwnerWork({ field_owner_id: ownerId, work_date: date, workers_sent: count })
      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={t('fieldOwners_recordWork')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fow-owner">
            <Tractor size={14} />
            {t('fieldOwners_selectOwner')}
          </label>
          <select
            id="fow-owner"
            className="form-control"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          >
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fow-date">
            <CalendarDays size={14} />
            {t('fieldOwners_date')}
          </label>
          <input
            id="fow-date"
            type="date"
            className="form-control"
            value={date}
            max={todayDateString()}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fow-workers">
            <Users size={14} />
            {t('fieldOwners_workersSent')}
          </label>
          <input
            id="fow-workers"
            type="number"
            min="1"
            inputMode="numeric"
            className="form-control"
            value={workersSent}
            onChange={(e) => setWorkersSent(e.target.value)}
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? t('loading') : t('save')}
        </button>
      </form>
    </Modal>
  )
}
