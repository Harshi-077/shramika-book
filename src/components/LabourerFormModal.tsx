import { useState } from 'react'
import type { FormEvent } from 'react'
import { User, Phone, Mars, Venus, IndianRupee } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import type { Gender, Labourer } from '../types'

interface LabourerFormModalProps {
  initial?: Labourer | null
  onClose: () => void
  onSubmit: (input: {
    name: string
    phone_number: string
    gender: Gender
    daily_wage: number
  }) => Promise<void>
}

export default function LabourerFormModal({
  initial,
  onClose,
  onSubmit,
}: LabourerFormModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState(initial?.name ?? '')
  const [phone, setPhone] = useState(initial?.phone_number ?? '')
  const [gender, setGender] = useState<Gender>(initial?.gender ?? 'Male')
  const [dailyWage, setDailyWage] = useState(initial ? String(initial.daily_wage) : '')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !phone.trim() || !dailyWage) {
      setError(t('required'))
      return
    }
    const wageNumber = Number(dailyWage)
    if (Number.isNaN(wageNumber) || wageNumber <= 0) {
      setError(t('required'))
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        phone_number: phone.trim(),
        gender,
        daily_wage: wageNumber,
      })
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={initial ? t('labourers_editTitle') : t('labourers_addTitle')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="labourer-name">
            <User size={14} />
            {t('labourers_name')}
          </label>
          <input
            id="labourer-name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="labourer-phone">
            <Phone size={14} />
            {t('labourers_phone')}
          </label>
          <input
            id="labourer-phone"
            className="form-control"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('labourers_gender')}</label>
          <div className="radio-group">
            <div
              className={`radio-pill ${gender === 'Male' ? 'selected' : ''}`}
              onClick={() => setGender('Male')}
            >
              <Mars size={15} />
              {t('labourers_male')}
            </div>
            <div
              className={`radio-pill ${gender === 'Female' ? 'selected' : ''}`}
              onClick={() => setGender('Female')}
            >
              <Venus size={15} />
              {t('labourers_female')}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="labourer-wage">
            <IndianRupee size={14} />
            {t('labourers_dailyWage')}
          </label>
          <input
            id="labourer-wage"
            className="form-control"
            type="number"
            min="0"
            inputMode="decimal"
            value={dailyWage}
            onChange={(e) => setDailyWage(e.target.value)}
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
