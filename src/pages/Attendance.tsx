import { useState } from 'react'
import { CalendarPlus, CalendarDays, Users } from 'lucide-react'
import Layout from '../components/Layout'
import AttendanceFormModal from '../components/AttendanceFormModal'
import { useLabourData } from '../hooks/useLabourData'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDate } from '../lib/format'

export default function Attendance() {
  const { t } = useLanguage()
  const { labourers, attendance, loading, refresh } = useLabourData()
  const [showAdd, setShowAdd] = useState(false)

  const labourerNameById = new Map(labourers.map((l) => [l.id, l.name]))

  return (
    <Layout title={t('attendance_title')}>
      <button className="btn btn-primary btn-block" onClick={() => setShowAdd(true)}>
        <CalendarPlus size={18} />
        {t('attendance_addTitle')}
      </button>

      <div style={{ height: 18 }} />

      {loading ? (
        <div className="empty-state">{t('loading')}</div>
      ) : attendance.length === 0 ? (
        <div className="empty-state">
          <CalendarDays className="empty-icon" />
          {t('attendance_empty')}
        </div>
      ) : (
        attendance.map((record) => (
          <div className="list-item" key={record.id}>
            <div className="list-item-top">
              <div className="list-item-heading">
                <div className="avatar">
                  <CalendarDays size={16} />
                </div>
                <div className="list-item-name">{formatDate(record.attendance_date)}</div>
              </div>
              <span className="chip">
                <Users size={12} />
                {record.labourer_ids.length} {t('attendance_present')}
              </span>
            </div>
            <div className="list-item-sub" style={{ marginTop: 10 }}>
              {record.labourer_ids
                .map((id) => labourerNameById.get(id) ?? '')
                .filter(Boolean)
                .join(', ')}
            </div>
          </div>
        ))
      )}

      {showAdd && (
        <AttendanceFormModal
          labourers={labourers}
          onClose={() => setShowAdd(false)}
          onSaved={refresh}
        />
      )}
    </Layout>
  )
}
