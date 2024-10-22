import type { Locale } from '../type'

const localeValues: Locale = {
  locale: 'he',
  Pagination: {
    items_per_page: '/ עמוד',
    jump_to: 'עבור אל',
    jump_to_confirm: 'אישור',
    page: '',
    prev_page: 'העמוד הקודם',
    next_page: 'העמוד הבא',
    prev_5: '5 עמודים קודמים',
    next_5: '5 עמודים הבאים',
    prev_3: '3 עמודים קודמים',
    next_3: '3 עמודים הבאים',
  },
  DatePicker: {
    lang: {
      placeholder: 'בחר תאריך',
      rangePlaceholder: [
        'תאריך התחלה',
        'תאריך סיום',
      ],
      locale: 'he_IL',
      today: 'היום',
      now: 'עכשיו',
      backToToday: 'חזור להיום',
      ok: 'אישור',
      clear: 'איפוס',
      month: 'חודש',
      year: 'שנה',
      timeSelect: 'בחר שעה',
      dateSelect: 'בחר תאריך',
      weekSelect: 'בחר שבוע',
      monthSelect: 'בחר חודש',
      yearSelect: 'בחר שנה',
      decadeSelect: 'בחר עשור',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthBeforeYear: true,
      previousMonth: 'חודש קודם (PageUp)',
      nextMonth: 'חודש הבא (PageDown)',
      previousYear: 'שנה שעברה (Control + left)',
      nextYear: 'שנה הבאה (Control + right)',
      previousDecade: 'העשור הקודם',
      nextDecade: 'העשור הבא',
      previousCentury: 'המאה הקודמת',
      nextCentury: 'המאה הבאה',
    },
    timePickerLocale: {
      placeholder: 'בחר שעה',
    },
  },
  TimePicker: {
    placeholder: 'בחר שעה',
  },
  Calendar: {
    lang: {
      placeholder: 'בחר תאריך',
      rangePlaceholder: [
        'תאריך התחלה',
        'תאריך סיום',
      ],
      locale: 'he_IL',
      today: 'היום',
      now: 'עכשיו',
      backToToday: 'חזור להיום',
      ok: 'אישור',
      clear: 'איפוס',
      month: 'חודש',
      year: 'שנה',
      timeSelect: 'בחר שעה',
      dateSelect: 'בחר תאריך',
      weekSelect: 'בחר שבוע',
      monthSelect: 'בחר חודש',
      yearSelect: 'בחר שנה',
      decadeSelect: 'בחר עשור',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthBeforeYear: true,
      previousMonth: 'חודש קודם (PageUp)',
      nextMonth: 'חודש הבא (PageDown)',
      previousYear: 'שנה שעברה (Control + left)',
      nextYear: 'שנה הבאה (Control + right)',
      previousDecade: 'העשור הקודם',
      nextDecade: 'העשור הבא',
      previousCentury: 'המאה הקודמת',
      nextCentury: 'המאה הבאה',
    },
    timePickerLocale: {
      placeholder: 'בחר שעה',
    },
  },
  global: {
    placeholder: 'אנא בחר',
  },
  Table: {
    filterTitle: 'תפריט סינון',
    filterConfirm: 'אישור',
    filterReset: 'איפוס',
    selectAll: 'בחר הכל',
    selectInvert: 'הפוך בחירה',
    selectionAll: 'בחר את כל הנתונים',
    sortTitle: 'מיון',
    expand: 'הרחב שורה',
    collapse: 'צמצם שורהw',
    triggerDesc: 'לחץ על מיון לפי סדר יורד',
    triggerAsc: 'לחץ על מיון לפי סדר עולה',
    cancelSort: 'לחץ כדי לבטל את המיון',
  },
  Modal: {
    okText: 'אישור',
    cancelText: 'ביטול',
    justOkText: 'אישור',
  },
  Popconfirm: {
    okText: 'אישור',
    cancelText: 'ביטול',
  },
  Transfer: {
    searchPlaceholder: 'חפש כאן',
    itemUnit: 'פריט',
    itemsUnit: 'פריטים',
  },
  Upload: {
    uploading: 'מעלה...',
    removeFile: 'הסר קובץ',
    uploadError: 'שגיאת העלאה',
    previewFile: 'הצג קובץ',
    downloadFile: 'הורד קובץ',
  },
  Empty: {
    description: 'אין מידע',
  },
  Icon: {
    icon: 'סמל',
  },
  Text: {
    edit: 'ערוך',
    copy: 'העתק',
    copied: 'הועתק',
    expand: 'הרחב',
  },
  PageHeader: {
    back: 'חזרה',
  },
  Form: {
    defaultValidateMessages: {
      default: 'ערך השדה שגוי ${label}',
      required: 'בבקשה הזן ${label}',
      enum: '${label} חייב להיות אחד מערכים אלו [${enum}]',
      whitespace: '${label} לא יכול להיות ריק',
      date: {
        format: '${label} תאריך לא תקין',
        parse: '${label} לא ניתן להמיר לתאריך',
        invalid: '${label} הוא לא תאריך תקין',
      },
      types: {
        string: '${label} הוא לא ${type} תקין',
        method: '${label} הוא לא ${type} תקין',
        array: '${label} הוא לא ${type} תקין',
        object: '${label} הוא לא ${type} תקין',
        number: '${label} הוא לא ${type} תקין',
        date: '${label} הוא לא ${type} תקין',
        boolean: '${label} הוא לא ${type} תקין',
        integer: '${label} הוא לא ${type} תקין',
        float: '${label} הוא לא ${type} תקין',
        regexp: '${label} הוא לא ${type} תקין',
        email: '${label} הוא לא ${type} תקין',
        url: '${label} הוא לא ${type} תקין',
        hex: '${label} הוא לא ${type} תקין',
      },
      string: {
        len: '${label} חייב להיות ${len} תווים',
        min: '${label} חייב להיות ${min} תווים',
        max: '${label} מקסימום ${max} תווים',
        range: '${label} חייב להיות בין ${min}-${max} תווים',
      },
      number: {
        len: '${label} חייב להיות שווה ל ${len}',
        min: '${label} ערך מינימלי הוא ${min}',
        max: '${label} ערך מקסימלי הוא ${max}',
        range: '${label} חייב להיות בין ${min}-${max}',
      },
      array: {
        len: 'חייב להיות ${len} ${label}',
        min: 'מינימום ${min} ${label}',
        max: 'מקסימום ${max} ${label}',
        range: 'הסכום של ${label} חייב להיות בין ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} לא תואם לתבנית ${pattern}',
      },
    },
  },
}

export default localeValues
