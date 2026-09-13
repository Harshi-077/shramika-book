import { useState } from 'react'
import type { FormEvent } from 'react'
import { Users, IndianRupee } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import { addPayment } from '../lib/queries'
import type { LabourerWithStats } from '../types'

interface PaymentFormModalProps {
  labourers: LabourerWithStats[]
  preselectedLabourerId?: string
  onClose: () => void
  onSaved: () => void
}

export default function PaymentFormModal({
  labourers,
  preselectedLabourerId,
  onClose,
  onSaved,
}: PaymentFormModalProps) {
  const { t } = useLanguage()
  const [labourerId, setLabourerId] = useState(
    preselectedLabourerId ?? labourers[0]?.id ?? ''
  )
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const amountNumber = Number(amount)
    if (!labourerId || !amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setError(t('required'))
      return
    }
    setSubmitting(true)
    try {
      await addPayment(labourerId, amountNumber)
      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={t('payments_recordTitle')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="payment-labourer">
            <Users size={14} />
            {t('payments_selectLabourer')}
          </label>
          <select
            id="payment-labourer"
            className="form-control"
            value={labourerId}
            onChange={(e) => setLabourerId(e.target.value)}
            required
          >
            {labourers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="payment-amount">
            <IndianRupee size={14} />
            {t('payments_amount')}
          </label>
          <input
            id="payment-amount"
            className="form-control"
            type="number"
            min="0"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
