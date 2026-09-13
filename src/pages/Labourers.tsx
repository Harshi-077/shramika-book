import { useMemo, useState } from 'react'
import { Search, UserPlus, Phone, Pencil, Users, IndianRupee } from 'lucide-react'
import Layout from '../components/Layout'
import LabourerFormModal from '../components/LabourerFormModal'
import { useLabourData } from '../hooks/useLabourData'
import { useLanguage } from '../i18n/LanguageContext'
import { addLabourer, updateLabourer } from '../lib/queries'
import { formatCurrency } from '../lib/format'
import type { Gender, LabourerWithStats } from '../types'

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function Labourers() {
  const { t } = useLanguage()
  const { labourers, loading, refresh } = useLabourData()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<LabourerWithStats | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return labourers
    return labourers.filter(
      (l) => l.name.toLowerCase().includes(q) || l.phone_number.includes(q)
    )
  }, [labourers, search])

  const handleAdd = async (input: {
    name: string
    phone_number: string
    gender: Gender
    daily_wage: number
  }) => {
    await addLabourer(input)
    await refresh()
  }

  const handleEdit = async (input: {
    name: string
    phone_number: string
    gender: Gender
    daily_wage: number
  }) => {
    if (!editing) return
    await updateLabourer(editing.id, input)
    await refresh()
  }

  return (
    <Layout title={t('labourers_title')}>
      <div className="search-bar">
        <Search className="search-icon" size={16} />
        <input
          className="form-control"
          placeholder={t('labourers_searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-block" onClick={() => setShowAdd(true)}>
        <UserPlus size={18} />
        {t('labourers_addTitle')}
      </button>

      <div style={{ height: 18 }} />

      {loading ? (
        <div className="empty-state">{t('loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Users className="empty-icon" />
          {t('labourers_empty')}
        </div>
      ) : (
        filtered.map((l) => (
          <div className="list-item" key={l.id}>
            <div className="list-item-top">
              <div className="list-item-heading">
                <div className={`avatar ${l.gender === 'Female' ? 'female' : ''}`}>
                  {initials(l.name)}
                </div>
                <div>
                  <div className="list-item-name">{l.name}</div>
                  <div className="list-item-sub">
                    <Phone size={12} />
                    {l.phone_number}
                    <span className="chip" style={{ marginLeft: 6 }}>
                      {l.gender === 'Male' ? t('labourers_male') : t('labourers_female')}
                    </span>
                  </div>
                </div>
              </div>
              <button className="edit-link" onClick={() => setEditing(l)}>
                <Pencil size={13} />
                {t('edit')}
              </button>
            </div>

            <div className="list-item-meta-row">
              <span className="meta-item">
                <IndianRupee size={13} />
                {formatCurrency(l.daily_wage)} / {t('labourers_dailyWage').toLowerCase()}
              </span>
            </div>

            <div className="list-item-stats">
              <div className="stat">
                <strong>{l.attendanceDays}</strong>
                {t('labourers_attendanceDays')}
              </div>
              <div className="stat">
                <strong>{formatCurrency(l.totalWage)}</strong>
                {t('labourers_totalWage')}
              </div>
              <div className="stat paid">
                <strong>{formatCurrency(l.paid)}</strong>
                {t('labourers_paid')}
              </div>
              <div className="stat pending">
                <strong>{formatCurrency(l.pending)}</strong>
                {t('labourers_pending')}
              </div>
            </div>
          </div>
        ))
      )}

      {showAdd && <LabourerFormModal onClose={() => setShowAdd(false)} onSubmit={handleAdd} />}
      {editing && (
        <LabourerFormModal
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleEdit}
        />
      )}
    </Layout>
  )
}
