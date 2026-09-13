import { useState } from 'react'
import type { FormEvent } from 'react'
import { User, Phone } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import { addFieldOwner } from '../lib/queries'

interface FieldOwnerFormModalProps {
  onClose: () => void
  onSaved: () => void
}

export default function FieldOwnerFormModal({ onClose, onSaved }: FieldOwnerFormModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !phone.trim()) {
      setError(t('required'))
      return
    }
    setSubmitting(true)
    try {
      await addFieldOwner({ name: name.trim(), phone_number: phone.trim() })
      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={t('fieldOwners_addTitle')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="owner-name">
            <User size={14} />
            {t('fieldOwners_name')}
          </label>
          <input
            id="owner-name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="owner-phone">
            <Phone size={14} />
            {t('fieldOwners_phone')}
          </label>
          <input
            id="owner-phone"
            className="form-control"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
