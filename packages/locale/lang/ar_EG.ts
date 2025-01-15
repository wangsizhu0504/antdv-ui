import type { Locale } from '../type';

const localeValues: Locale = {
  locale: 'ar',
  Pagination: {
    items_per_page: '/ الصفحة',
    jump_to: 'الذهاب إلى',
    jump_to_confirm: 'تأكيد',
    page: '',
    prev_page: 'الصفحة السابقة',
    next_page: 'الصفحة التالية',
    prev_5: 'خمس صفحات سابقة',
    next_5: 'خمس صفحات تالية',
    prev_3: 'ثلاث صفحات سابقة',
    next_3: 'ثلاث صفحات تالية',
  },
  DatePicker: {
    lang: {
      placeholder: 'اختيار التاريخ',
      rangePlaceholder: [
        'البداية',
        'النهاية',
      ],
      locale: 'ar_EG',
      today: 'اليوم',
      now: 'الأن',
      backToToday: 'العودة إلى اليوم',
      ok: 'تأكيد',
      clear: 'مسح',
      month: 'الشهر',
      year: 'السنة',
      timeSelect: 'اختيار الوقت',
      dateSelect: 'اختيار التاريخ',
      monthSelect: 'اختيار الشهر',
      yearSelect: 'اختيار السنة',
      decadeSelect: 'اختيار العقد',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthBeforeYear: true,
      previousMonth: 'الشهر السابق (PageUp)',
      nextMonth: 'الشهر التالى(PageDown)',
      previousYear: 'العام السابق (Control + left)',
      nextYear: 'العام التالى (Control + right)',
      previousDecade: 'العقد السابق',
      nextDecade: 'العقد التالى',
      previousCentury: 'القرن السابق',
      nextCentury: 'القرن التالى',
    },
    timePickerLocale: {
      placeholder: 'اختيار الوقت',
    },
    dateFormat: 'DD-MM-YYYY',
    monthFormat: 'MM-YYYY',
    dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
    weekFormat: 'wo-YYYY',
  },
  TimePicker: {
    placeholder: 'اختيار الوقت',
  },
  Calendar: {
    lang: {
      placeholder: 'اختيار التاريخ',
      rangePlaceholder: [
        'البداية',
        'النهاية',
      ],
      locale: 'ar_EG',
      today: 'اليوم',
      now: 'الأن',
      backToToday: 'العودة إلى اليوم',
      ok: 'تأكيد',
      clear: 'مسح',
      month: 'الشهر',
      year: 'السنة',
      timeSelect: 'اختيار الوقت',
      dateSelect: 'اختيار التاريخ',
      monthSelect: 'اختيار الشهر',
      yearSelect: 'اختيار السنة',
      decadeSelect: 'اختيار العقد',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthBeforeYear: true,
      previousMonth: 'الشهر السابق (PageUp)',
      nextMonth: 'الشهر التالى(PageDown)',
      previousYear: 'العام السابق (Control + left)',
      nextYear: 'العام التالى (Control + right)',
      previousDecade: 'العقد السابق',
      nextDecade: 'العقد التالى',
      previousCentury: 'القرن السابق',
      nextCentury: 'القرن التالى',
    },
    timePickerLocale: {
      placeholder: 'اختيار الوقت',
    },
    dateFormat: 'DD-MM-YYYY',
    monthFormat: 'MM-YYYY',
    dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
    weekFormat: 'wo-YYYY',
  },
  global: {
    placeholder: 'يرجى التحديد',
  },
  Table: {
    filterTitle: 'الفلاتر',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة ضبط',
    selectAll: 'اختيار الكل',
    selectInvert: 'إلغاء الاختيار',
    selectionAll: 'حدد جميع البيانات',
    sortTitle: 'رتب',
    expand: 'توسيع الصف',
    collapse: 'طي الصف',
    triggerDesc: 'ترتيب تنازلي',
    triggerAsc: 'ترتيب تصاعدي',
    cancelSort: 'إلغاء الترتيب',
  },
  Modal: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
    justOkText: 'تأكيد',
  },
  Popconfirm: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
  },
  Transfer: {
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر',
  },
  Upload: {
    uploading: 'جاري الرفع...',
    removeFile: 'احذف الملف',
    uploadError: 'مشكلة فى الرفع',
    previewFile: 'استعرض الملف',
    downloadFile: 'تحميل الملف',
  },
  Empty: {
    description: 'لا توجد بيانات',
  },
  Icon: {
    icon: 'أيقونة',
  },
  Text: {
    edit: 'تعديل',
    copy: 'نسخ',
    copied: 'نقل',
    expand: 'وسع',
  },
  PageHeader: {
    back: 'عودة',
  },
  Form: {
    defaultValidateMessages: {
      default: 'خطأ في حقل الإدخال ${label}',
      required: 'يرجى إدخال ${label}',
      enum: '${label} يجب أن يكون واحدا من [${enum}]',
      whitespace: '${label} لا يمكن أن يكون حرفًا فارغًا',
      date: {
        format: '${label} تنسيق التاريخ غير صحيح',
        parse: '${label} لا يمكن تحويلها إلى تاريخ',
        invalid: 'تاريخ ${label} غير صحيح',
      },
      types: {
        string: 'ليس ${label} من نوع ${type} صالحًا',
        method: 'ليس ${label} من نوع ${type} صالحًا',
        array: 'ليس ${label} من نوع ${type} صالحًا',
        object: 'ليس ${label} من نوع ${type} صالحًا',
        number: 'ليس ${label} من نوع ${type} صالحًا',
        date: 'ليس ${label} من نوع ${type} صالحًا',
        boolean: 'ليس ${label} من نوع ${type} صالحًا',
        integer: 'ليس ${label} من نوع ${type} صالحًا',
        float: 'ليس ${label} من نوع ${type} صالحًا',
        regexp: 'ليس ${label} من نوع ${type} صالحًا',
        email: 'ليس ${label} من نوع ${type} صالحًا',
        url: 'ليس ${label} من نوع ${type} صالحًا',
        hex: 'ليس ${label} من نوع ${type} صالحًا',
      },
      string: {
        len: 'يجب ${label} ان يكون ${len} أحرف',
        min: '${label} على الأقل ${min} أحرف',
        max: '${label} يصل إلى ${max} أحرف',
        range: 'يجب ${label} ان يكون مابين ${min}-${max} أحرف',
      },
      number: {
        len: '${len} ان يساوي ${label} يجب',
        min: '${min} الأدنى هو ${label} حد',
        max: '${max} الأقصى هو ${label} حد',
        range: '${max}-${min} ان يكون مابين ${label} يجب',
      },
      array: {
        len: 'يجب أن يكون ${label} طوله ${len}',
        min: 'يجب أن يكون ${label} طوله الأدنى ${min}',
        max: 'يجب أن يكون ${label} طوله الأقصى ${max}',
        range: 'يجب أن يكون ${label} طوله مابين ${min}-${max}',
      },
      pattern: {
        mismatch: 'لا يتطابق ${label} مع ${pattern}',
      },
    },
  },
};

export default localeValues;
