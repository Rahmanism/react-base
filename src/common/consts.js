export const Consts = {
  brand: 'React-Base',

  save_successful: 'با موفقیت ذخیره شد.',
  delete_failed: 'عملیات حذف موفقیت‌آمیز نبود.',
  operation_failed: 'عملیات ناموفق بود.',
  reading_data_failed: 'خواندن اطلاعات ناموفق بود.',
  wait: 'لطفا صبر کنید...',

  delete_question: 'عمل حذف غیر قابل بازگشت است. آیا مطمئنید؟',

  Numbers: {
    max_toast_length: 150,
  },
}

export const DefaultUser = {
  id: 0,
  givenName: '',
  username: '',
  password: '',
  role: '2',
  cardId: '',
  enabled: true,
}

export const ActionType = {
  Command: 'Command',
  InternalLink: 'InternalLink',
  ExternalLink: 'ExternalLink',
}

export const EventStatus = {
  success: 'success',
  ok: 'primary',
  warning: 'warning',
  error: 'error',
}

export const TheColors = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
]

export const TheColorsCodes = {
  default: 0,
  primary: 1,
  secondary: 2,
  success: 3,
  error: 4,
  info: 5,
  warning: 6,
}

export const ConfigurationTitles = {
  Timeout: 'حداکثر زمان مجاز',
  RefreshInterval: 'صفحه داشبورد هر چند ثانیه یک بار بروزرسانی شود؟',
}

/**
 * Events that needs a ding audio to be played.
 * Will be used in dashboard.
 * @type {number[]}
 */
export const DingEvents = [-1, 0, 5, 6, 8, 9, 12, 13, 14, 20, 27, 28, 102, 200, 201, 205]
