import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'

interface ConfirmDialogProps {
  title: string
  message: string
  onCancel: () => void
  onConfirm: () => void
  confirming?: boolean
  error?: string | null
}

export default function ConfirmDialog({
  title,
  message,
  onCancel,
  onConfirm,
  confirming,
  error,
}: ConfirmDialogProps) {
  const { t } = useLanguage()

  return (
    <Modal title={title} onClose={onCancel}>
      <div className="confirm-dialog">
        <div className="confirm-icon">
          <AlertTriangle size={22} />
        </div>
        <p>{message}</p>
        {error && (
          <div className="form-error" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}
        <div className="confirm-dialog-actions">
          <button className="btn btn-secondary btn-block" onClick={onCancel} disabled={confirming}>
            {t('cancel')}
          </button>
          <button
            className="btn btn-danger-solid btn-block"
            onClick={onConfirm}
            disabled={confirming}
          >
            {confirming ? t('loading') : t('delete')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
