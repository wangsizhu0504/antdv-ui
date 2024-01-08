import type { VueNode } from '@antdv/types'

export interface PaginationLocale {
  items_per_page?: string
  jump_to?: string
  jump_to_confirm?: string
  page?: string
  prev_page?: string
  next_page?: string
  prev_5?: string
  next_5?: string
  prev_3?: string
  next_3?: string
}

export interface TableLocale {
  filterTitle?: string
  filterConfirm?: any
  filterReset?: any
  filterEmptyText?: any
  filterCheckAll?: any
  filterSearchPlaceholder?: any
  emptyText?: any | (() => any)
  selectAll?: any
  selectNone?: any
  selectInvert?: any
  selectionAll?: any
  sortTitle?: string
  expand?: string
  collapse?: string
  triggerDesc?: string
  triggerAsc?: string
  cancelSort?: string
}

type ValidateMessage = string | (() => string)
export interface ValidateMessages {
  default?: ValidateMessage
  required?: ValidateMessage
  enum?: ValidateMessage
  whitespace?: ValidateMessage
  date?: {
    format?: ValidateMessage
    parse?: ValidateMessage
    invalid?: ValidateMessage
  }
  types?: {
    string?: ValidateMessage
    method?: ValidateMessage
    array?: ValidateMessage
    object?: ValidateMessage
    number?: ValidateMessage
    date?: ValidateMessage
    boolean?: ValidateMessage
    integer?: ValidateMessage
    float?: ValidateMessage
    regexp?: ValidateMessage
    email?: ValidateMessage
    url?: ValidateMessage
    hex?: ValidateMessage
  }
  string?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  number?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  array?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  pattern?: {
    mismatch?: ValidateMessage
  }
}

export interface PickerLocale {
  locale: string

  // ===================== Date Panel =====================
  /** Display month before year in date panel header */
  monthBeforeYear?: boolean
  yearFormat: string
  monthFormat?: string
  quarterFormat?: string

  today: string
  now: string
  backToToday: string
  ok: string
  timeSelect: string
  dateSelect: string
  weekSelect?: string
  clear: string
  month: string
  year: string
  previousMonth: string
  nextMonth: string
  monthSelect: string
  yearSelect: string
  decadeSelect: string

  dayFormat: string
  dateFormat: string
  dateTimeFormat: string
  previousYear: string
  nextYear: string
  previousDecade: string
  nextDecade: string
  previousCentury: string
  nextCentury: string

  shortWeekDays?: string[]
  shortMonths?: string[]

  // AdditionalPickerLocaleLang
  placeholder: string
  yearPlaceholder?: string
  quarterPlaceholder?: string
  monthPlaceholder?: string
  weekPlaceholder?: string
  rangeYearPlaceholder?: [string, string]
  rangeQuarterPlaceholder?: [string, string]
  rangeMonthPlaceholder?: [string, string]
  rangeWeekPlaceholder?: [string, string]
  rangePlaceholder?: [string, string]
}

// time picker locale
export interface TimePickerLocale {
  placeholder?: string
  rangePlaceholder?: [string, string]
}

// date picker locale
export interface DatePickerLocale {
  lang: PickerLocale
  timePickerLocale: TimePickerLocale

  // AdditionalPickerLocale
  dateFormat?: string
  dateTimeFormat?: string
  weekFormat?: string
  monthFormat?: string
}

// modal locale
export interface ModalLocale {
  okText: string
  cancelText: string
  justOkText: string
}

// upload locale
export interface UploadLocale {
  uploading?: string
  removeFile?: string
  downloadFile?: string
  uploadError?: string
  previewFile?: string
}
// tour locale
export interface TourLocale {
  Next: string
  Previous: string
  Finish: string
}

export interface TransferLocale {
  titles?: VueNode[]
  notFoundContent?: VueNode
  searchPlaceholder: string
  itemUnit: string
  itemsUnit: string
  remove?: string
  selectAll?: string
  selectCurrent?: string
  selectInvert?: string
  removeAll?: string
  removeCurrent?: string
}

export interface Locale {
  locale: string
  Pagination?: PaginationLocale
  Table?: TableLocale
  Popconfirm?: Record<string, any>
  Form?: {
    optional?: string
    defaultValidateMessages: ValidateMessages
  }
  Image?: {
    preview: string
  }
  DatePicker?: DatePickerLocale
  TimePicker?: Record<string, any>
  Calendar?: Record<string, any>
  Modal?: ModalLocale
  Transfer?: Partial<TransferLocale>
  Select?: Record<string, any>
  Upload?: UploadLocale
  Empty?: {
    description: string
  }
  global?: Record<string, any>
  PageHeader?: { back: string }
  Icon?: Record<string, any>
  Text?: {
    edit?: any
    copy?: any
    copied?: any
    expand?: any
  }
  Tour?: TourLocale
  QRCode?: {
    expired?: string
    refresh?: string
  }
}
