const en = {
  appName: 'Shramika Book',

  // Nav
  nav_dashboard: 'Dashboard',
  nav_labourers: 'Labourers',
  nav_attendance: 'Attendance',
  nav_payments: 'Payments',
  nav_settings: 'Settings',

  // Common
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  add: 'Add',
  back: 'Back',
  search: 'Search',
  loading: 'Loading...',
  noData: 'No data yet',
  required: 'Required',
  logout: 'Logout',
  close: 'Close',
  delete: 'Delete',
  confirm: 'Confirm',

  // Auth
  login_title: 'Manager Login',
  login_email: 'Email',
  login_password: 'Password',
  login_button: 'Login',
  login_error: 'Invalid email or password',
  login_subtitle: 'Login to manage your labourers',

  // Dashboard
  dashboard_title: 'Dashboard',
  dashboard_totalLabourers: 'Total Labourers',
  dashboard_todaysAttendance: "Today's Attendance",
  dashboard_totalWages: 'Total Wages',
  dashboard_pendingPayments: 'Pending Payments',
  dashboard_quickActions: 'Quick Actions',
  dashboard_addLabourer: 'Add Labourer',
  dashboard_addAttendance: 'Add Attendance',
  dashboard_recordPayment: 'Record Payment',
  dashboard_fieldOwners: 'Field Owners',
  dashboard_recentActivity: 'Recent Activity',

  // Labourers
  labourers_title: 'Labourers',
  labourers_searchPlaceholder: 'Search by name or phone',
  labourers_addTitle: 'Add Labourer',
  labourers_editTitle: 'Edit Labourer',
  labourers_name: 'Name',
  labourers_phone: 'Phone Number',
  labourers_gender: 'Gender',
  labourers_male: 'Male',
  labourers_female: 'Female',
  labourers_dailyWage: 'Daily Wage',
  labourers_attendanceDays: 'Attendance Days',
  labourers_totalWage: 'Total Wage',
  labourers_paid: 'Paid',
  labourers_pending: 'Pending',
  labourers_empty: 'No labourers added yet. Tap "Add Labourer" to get started.',
  labourers_details: 'Labourer Details',

  // Attendance
  attendance_title: 'Attendance',
  attendance_addTitle: 'Add Attendance',
  attendance_date: 'Date',
  attendance_selectLabourers: 'Select Labourers',
  attendance_noLabourers: 'Add labourers first before recording attendance.',
  attendance_empty: 'No attendance recorded yet.',
  attendance_present: 'present',
  attendance_selectAll: 'Select All',
  attendance_alreadyExists: 'Attendance for this date already exists. It will be updated.',

  // Payments
  payments_title: 'Payments',
  payments_recordTitle: 'Record Payment',
  payments_amount: 'Amount',
  payments_selectLabourer: 'Select Labourer',
  payments_empty: 'No payments recorded yet.',
  payments_totalWage: 'Total Wage',
  payments_paid: 'Paid',
  payments_pending: 'Pending',
  payments_history: 'Payment History',
  payments_deleteTitle: 'Delete Payment',
  payments_deleteMessage: 'Are you sure you want to delete this payment record? This cannot be undone.',

  // Field Owners
  fieldOwners_title: 'Field Owners',
  fieldOwners_addTitle: 'Add Field Owner',
  fieldOwners_name: 'Name',
  fieldOwners_phone: 'Phone Number',
  fieldOwners_empty: 'No field owners added yet.',
  fieldOwners_recordWork: 'Record Workers Sent',
  fieldOwners_date: 'Date',
  fieldOwners_workersSent: 'Number of Workers Sent',
  fieldOwners_selectOwner: 'Select Field Owner',
  fieldOwners_workHistory: 'Work History',
  fieldOwners_totalSent: 'Total Workers Sent',

  // Settings
  settings_title: 'Settings',
  settings_language: 'Language',
  settings_account: 'Account',
  settings_loggedInAs: 'Logged in as',

  // Currency
  currency_symbol: '₹',
}

export default en
export type TranslationKeys = keyof typeof en
