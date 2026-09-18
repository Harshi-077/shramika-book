import type { TranslationKeys } from './en'

const te: Record<TranslationKeys, string> = {
  appName: 'శ్రామిక పుస్తకం',

  // Nav
  nav_dashboard: 'డాష్‌బోర్డ్',
  nav_labourers: 'కూలీలు',
  nav_attendance: 'హాజరు',
  nav_payments: 'చెల్లింపులు',
  nav_settings: 'సెట్టింగ్‌లు',

  // Common
  save: 'సేవ్ చేయండి',
  cancel: 'రద్దు చేయండి',
  edit: 'సవరించండి',
  add: 'జోడించండి',
  back: 'వెనుకకు',
  search: 'వెతకండి',
  loading: 'లోడ్ అవుతోంది...',
  noData: 'ఇంకా సమాచారం లేదు',
  required: 'తప్పనిసరి',
  logout: 'లాగ్అవుట్',
  close: 'మూసివేయండి',
  delete: 'తొలగించండి',
  confirm: 'నిర్ధారించండి',

  // Auth
  login_title: 'మేనేజర్ లాగిన్',
  login_email: 'ఇమెయిల్',
  login_password: 'పాస్‌వర్డ్',
  login_button: 'లాగిన్ చేయండి',
  login_error: 'ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు',
  login_subtitle: 'మీ కూలీలను నిర్వహించడానికి లాగిన్ చేయండి',

  login_createAccount: 'ఖాతా సృష్టించండి',
  login_welcomeBack: 'తిరిగి స్వాగతం',
  login_createSubtitle:
    'మీ మేనేజర్ ఖాతాను సృష్టించి ప్రారంభించండి',
  login_loginSubtitle:
    'మీ కూలీల రికార్డులను నిర్వహించడానికి లాగిన్ చేయండి',
  login_confirmPassword: 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
  login_rememberMe: 'నన్ను గుర్తుంచుకోండి',
  login_forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
  login_pleaseWait: 'దయచేసి వేచి ఉండండి...',
  login_or: 'లేదా',
  login_backToLogin: 'లాగిన్‌కు తిరిగి వెళ్లండి',
  login_loginHere: 'ఇక్కడ లాగిన్ చేయండి',
  login_newToApp: 'Shramika Bookకి కొత్తవారా?',
  login_createYourAccount: 'మీ ఖాతాను సృష్టించండి',
  login_alreadyHaveAccount:
    'ఇప్పటికే Shramika Book ఖాతా ఉందా?',
  login_passwordMismatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
  login_passwordMinLength:
    'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
  login_accountCreated:
    'ఖాతా విజయవంతంగా సృష్టించబడింది! లాగిన్ చేయడానికి ముందు మీ ఇమెయిల్‌ను నిర్ధారించండి.',
  login_passwordResetNext:
    'పాస్‌వర్డ్ రీసెట్‌ను తదుపరి జోడించవచ్చు.',
  login_emailPlaceholder: 'మీ ఇమెయిల్‌ను నమోదు చేయండి',
  login_passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
  login_confirmPasswordPlaceholder:
    'మీ పాస్‌వర్డ్‌ను నిర్ధారించండి',

  // Login page
  login_brandSubtitle: 'కూలీల నిర్వహణ యాప్',
  login_heroTitle: 'మెరుగైన రికార్డులు',
  login_heroTitleSecond: 'మెరుగైన',
  login_heroTitleHighlight: 'భవిష్యత్తు కోసం',
  login_heroDescription:
    'మీ కూలీలు, హాజరు, వేతనాలు మరియు చెల్లింపులను ఒకే చోట నిర్వహించండి.',

  login_featureLabourers: 'కూలీలు',
  login_featureAttendance: 'హాజరు',
  login_featureWagesPayments: 'వేతనాలు & చెల్లింపులు',
  login_featureFieldOwners: 'పొలం యజమానులు',

  // Dashboard
  dashboard_title: 'డాష్‌బోర్డ్',
  dashboard_totalLabourers: 'మొత్తం కూలీలు',
  dashboard_todaysAttendance: 'ఈరోజు హాజరు',
  dashboard_totalWages: 'మొత్తం వేతనాలు',
  dashboard_pendingPayments: 'బాకీ చెల్లింపులు',
  dashboard_quickActions: 'త్వరిత చర్యలు',
  dashboard_addLabourer: 'కూలీని జోడించండి',
  dashboard_addAttendance: 'హాజరు నమోదు చేయండి',
  dashboard_recordPayment: 'చెల్లింపు నమోదు చేయండి',
  dashboard_fieldOwners: 'పొలం యజమానులు',
  dashboard_recentActivity: 'ఇటీవలి కార్యకలాపాలు',

  // Labourers
  labourers_title: 'కూలీలు',
  labourers_searchPlaceholder:
    'పేరు లేదా ఫోన్ నంబర్ ద్వారా వెతకండి',
  labourers_addTitle: 'కూలీని జోడించండి',
  labourers_editTitle: 'కూలీని సవరించండి',
  labourers_name: 'పేరు',
  labourers_phone: 'ఫోన్ నంబర్',
  labourers_gender: 'లింగం',
  labourers_male: 'పురుషుడు',
  labourers_female: 'స్త్రీ',
  labourers_dailyWage: 'రోజువారీ వేతనం',
  labourers_attendanceDays: 'హాజరు రోజులు',
  labourers_totalWage: 'మొత్తం వేతనం',
  labourers_paid: 'చెల్లించినది',
  labourers_pending: 'బాకీ',
  labourers_empty:
    'ఇంకా కూలీలు జోడించలేదు. ప్రారంభించడానికి "కూలీని జోడించండి" నొక్కండి.',
  labourers_details: 'కూలీ వివరాలు',

  // Attendance
  attendance_title: 'హాజరు',
  attendance_addTitle: 'హాజరు నమోదు చేయండి',
  attendance_date: 'తేదీ',
  attendance_selectLabourers: 'కూలీలను ఎంచుకోండి',
  attendance_noLabourers:
    'హాజరు నమోదు చేయడానికి ముందు కూలీలను జోడించండి.',
  attendance_empty: 'ఇంకా హాజరు నమోదు కాలేదు.',
  attendance_present: 'హాజరు',
  attendance_selectAll: 'అందరినీ ఎంచుకోండి',
  attendance_alreadyExists:
    'ఈ తేదీకి హాజరు ఇప్పటికే ఉంది. ఇది నవీకరించబడుతుంది.',

  // Payments
  payments_title: 'చెల్లింపులు',
  payments_recordTitle: 'చెల్లింపు నమోదు చేయండి',
  payments_amount: 'మొత్తం',
  payments_selectLabourer: 'కూలీని ఎంచుకోండి',
  payments_empty: 'ఇంకా చెల్లింపులు నమోదు కాలేదు.',
  payments_totalWage: 'మొత్తం వేతనం',
  payments_paid: 'చెల్లించినది',
  payments_pending: 'బాకీ',
  payments_history: 'చెల్లింపు చరిత్ర',
  payments_deleteTitle: 'చెల్లింపును తొలగించండి',
  payments_deleteMessage:
    'మీరు ఖచ్చితంగా ఈ చెల్లింపు రికార్డును తొలగించాలనుకుంటున్నారా? దీన్ని వెనక్కి తీసుకోలేరు.',

  // Field Owners
  fieldOwners_title: 'పొలం యజమానులు',
  fieldOwners_addTitle: 'పొలం యజమానిని జోడించండి',
  fieldOwners_name: 'పేరు',
  fieldOwners_phone: 'ఫోన్ నంబర్',
  fieldOwners_empty: 'ఇంకా పొలం యజమానులు జోడించలేదు.',
  fieldOwners_recordWork: 'పంపిన కూలీలను నమోదు చేయండి',
  fieldOwners_date: 'తేదీ',
  fieldOwners_workersSent: 'పంపిన కూలీల సంఖ్య',
  fieldOwners_selectOwner: 'పొలం యజమానిని ఎంచుకోండి',
  fieldOwners_workHistory: 'పని చరిత్ర',
  fieldOwners_totalSent: 'మొత్తం పంపిన కూలీలు',

  // Settings
  settings_title: 'సెట్టింగ్‌లు',
  settings_language: 'భాష',
  settings_account: 'ఖాతా',
  settings_loggedInAs: 'లాగిన్ అయినది',

  // Currency
  currency_symbol: '₹',
}

export default te