import { useMemo, useState } from 'react'
import { Wallet, HandCoins, Receipt, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import PaymentFormModal from '../components/PaymentFormModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useLabourData } from '../hooks/useLabourData'
import { useLanguage } from '../i18n/LanguageContext'
import { deletePayment } from '../lib/queries'
import { formatCurrency, formatDate } from '../lib/format'
import type { Payment } from '../types'

export default function Payments() {
  const { t } = useLanguage()
  const { labourers, payments, loading, refresh } = useLabourData()
  const [showAdd, setShowAdd] = useState(false)
  const [deleting, setDeleting] = useState<Payment | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const labourerNameById = useMemo(
    () => new Map(labourers.map((l) => [l.id, l.name])),
    [labourers]
  )

  const sortedPayments = useMemo(
    () =>
      [...payments].sort(
        (a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
      ),
    [payments]
  )

  const handleDelete = async () => {
    if (!deleting) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deletePayment(deleting.id)
      await refresh()
      setDeleting(null)
    } catch (err: any) {
      setDeleteError(err?.message ?? 'Failed to delete payment. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const closeDeleteDialog = () => {
    setDeleting(null)
    setDeleteError(null)
  }

  return (
    <Layout title={t('payments_title')}>
      <button
        className="btn btn-primary btn-block"
        onClick={() => setShowAdd(true)}
        disabled={labourers.length === 0}
      >
        <HandCoins size={18} />
        {t('payments_recordTitle')}
      </button>

      <div style={{ height: 20 }} />

      {loading ? (
        <div className="empty-state">{t('loading')}</div>
      ) : labourers.length === 0 ? (
        <div className="empty-state">
          <Wallet className="empty-icon" />
          {t('labourers_empty')}
        </div>
      ) : (
        <>
          <div className="section-title">{t('labourers_title')}</div>
          {labourers.map((l) => (
            <div className="list-item" key={l.id}>
              <div className="list-item-name">{l.name}</div>
              <div className="list-item-stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stat">
                  <strong>{formatCurrency(l.totalWage)}</strong>
                  {t('payments_totalWage')}
                </div>
                <div className="stat paid">
                  <strong>{formatCurrency(l.paid)}</strong>
                  {t('payments_paid')}
                </div>
                <div className="stat pending">
                  <strong>{formatCurrency(l.pending)}</strong>
                  {t('payments_pending')}
                </div>
              </div>
            </div>
          ))}

          <div className="section-title" style={{ marginTop: 24 }}>
            {t('payments_history')}
          </div>
          {sortedPayments.length === 0 ? (
            <div className="empty-state">
              <Receipt className="empty-icon" />
              {t('payments_empty')}
            </div>
          ) : (
            sortedPayments.map((p) => (
              <div className="list-item" key={p.id}>
                <div className="list-item-top">
                  <div className="list-item-heading">
                    <div className="avatar">
                      <HandCoins size={17} />
                    </div>
                    <div>
                      <div className="list-item-name">
                        {labourerNameById.get(p.labourer_id) ?? '—'}
                      </div>
                      <div className="list-item-sub">{formatDate(p.payment_date)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="list-item-name">{formatCurrency(p.amount)}</div>
                    <button
                      className="icon-btn danger"
                      onClick={() => {
                        setDeleteError(null)
                        setDeleting(p)
                      }}
                      aria-label={t('delete')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {showAdd && (
        <PaymentFormModal
          labourers={labourers}
          onClose={() => setShowAdd(false)}
          onSaved={refresh}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title={t('payments_deleteTitle')}
          message={`${t('payments_deleteMessage')} (${labourerNameById.get(deleting.labourer_id) ?? ''} · ${formatCurrency(
            deleting.amount
          )})`}
          onCancel={closeDeleteDialog}
          onConfirm={handleDelete}
          confirming={isDeleting}
          error={deleteError}
        />
      )}
    </Layout>
  )
}
