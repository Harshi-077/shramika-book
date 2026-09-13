import { useMemo, useState } from 'react'
import { Tractor, Phone, Users, ClipboardList, UserPlus } from 'lucide-react'
import Layout from '../components/Layout'
import FieldOwnerFormModal from '../components/FieldOwnerFormModal'
import FieldOwnerWorkFormModal from '../components/FieldOwnerWorkFormModal'
import { useFieldOwnerData } from '../hooks/useFieldOwnerData'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate } from '../lib/format'

export default function FieldOwners() {
  const { t } = useLanguage()
  const { owners, work, loading, refresh } = useFieldOwnerData()
  const [showAddOwner, setShowAddOwner] = useState(false)
  const [showAddWork, setShowAddWork] = useState(false)

  const ownerNameById = useMemo(() => new Map(owners.map((o) => [o.id, o.name])), [owners])

  const sortedWork = useMemo(
    () =>
      [...work].sort((a, b) => new Date(b.work_date).getTime() - new Date(a.work_date).getTime()),
    [work]
  )

  return (
    <Layout title={t('fieldOwners_title')} showBack>
      <div className="fab-row">
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddOwner(true)}>
          <UserPlus size={17} />
          {t('fieldOwners_addTitle')}
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={() => setShowAddWork(true)}
          disabled={owners.length === 0}
        >
          <ClipboardList size={17} />
          {t('fieldOwners_recordWork')}
        </button>
      </div>

      {loading ? (
        <div className="empty-state">{t('loading')}</div>
      ) : owners.length === 0 ? (
        <div className="empty-state">
          <Tractor className="empty-icon" />
          {t('fieldOwners_empty')}
        </div>
      ) : (
        <>
          {owners.map((o) => (
            <div className="list-item" key={o.id}>
              <div className="list-item-top">
                <div className="list-item-heading">
                  <div className="avatar">
                    <Tractor size={16} />
                  </div>
                  <div>
                    <div className="list-item-name">{o.name}</div>
                    <div className="list-item-sub">
                      <Phone size={12} />
                      {o.phone_number}
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-item-meta-row">
                <span className="meta-item">
                  <Users size={13} />
                  {o.totalWorkersSent} {t('fieldOwners_totalSent')}
                </span>
              </div>
            </div>
          ))}

          <div className="section-title" style={{ marginTop: 24 }}>
            {t('fieldOwners_workHistory')}
          </div>
          {sortedWork.length === 0 ? (
            <div className="empty-state">{t('noData')}</div>
          ) : (
            sortedWork.map((w) => (
              <div className="list-item" key={w.id}>
                <div className="list-item-top">
                  <div>
                    <div className="list-item-name">{ownerNameById.get(w.field_owner_id) ?? '—'}</div>
                    <div className="list-item-sub">{formatDate(w.work_date)}</div>
                  </div>
                  <span className="chip accent">
                    <Users size={12} />
                    {w.workers_sent}
                  </span>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {showAddOwner && (
        <FieldOwnerFormModal onClose={() => setShowAddOwner(false)} onSaved={refresh} />
      )}
      {showAddWork && (
        <FieldOwnerWorkFormModal
          owners={owners}
          onClose={() => setShowAddWork(false)}
          onSaved={refresh}
        />
      )}
    </Layout>
  )
}
