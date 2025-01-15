import type { Locale } from '../type';

const localeValues: Locale = {
  locale: 'ja',
  Pagination: {
    items_per_page: '件 / ページ',
    jump_to: '移動',
    jump_to_confirm: '確認する',
    page: 'ページ',
    prev_page: '前のページ',
    next_page: '次のページ',
    prev_5: '前 5ページ',
    next_5: '次 5ページ',
    prev_3: '前 3ページ',
    next_3: '次 3ページ',
  },
  DatePicker: {
    lang: {
      placeholder: '日付を選択',
      rangePlaceholder: [
        '開始日付',
        '終了日付',
      ],
      locale: 'ja_JP',
      today: '今日',
      now: '現在時刻',
      backToToday: '今日に戻る',
      ok: '決定',
      timeSelect: '時間を選択',
      dateSelect: '日時を選択',
      weekSelect: '週を選択',
      clear: 'クリア',
      month: '月',
      year: '年',
      previousMonth: '前月 (ページアップキー)',
      nextMonth: '翌月 (ページダウンキー)',
      monthSelect: '月を選択',
      yearSelect: '年を選択',
      decadeSelect: '年代を選択',
      yearFormat: 'YYYY年',
      dayFormat: 'D日',
      dateFormat: 'YYYY年M月D日',
      dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
      previousYear: '前年 (Controlを押しながら左キー)',
      nextYear: '翌年 (Controlを押しながら右キー)',
      previousDecade: '前の年代',
      nextDecade: '次の年代',
      previousCentury: '前の世紀',
      nextCentury: '次の世紀',
    },
    timePickerLocale: {
      placeholder: '時間を選択',
      rangePlaceholder: [
        '開始時間',
        '終了時間',
      ],
    },
  },
  TimePicker: {
    placeholder: '時間を選択',
    rangePlaceholder: [
      '開始時間',
      '終了時間',
    ],
  },
  Calendar: {
    lang: {
      placeholder: '日付を選択',
      rangePlaceholder: [
        '開始日付',
        '終了日付',
      ],
      locale: 'ja_JP',
      today: '今日',
      now: '現在時刻',
      backToToday: '今日に戻る',
      ok: '決定',
      timeSelect: '時間を選択',
      dateSelect: '日時を選択',
      weekSelect: '週を選択',
      clear: 'クリア',
      month: '月',
      year: '年',
      previousMonth: '前月 (ページアップキー)',
      nextMonth: '翌月 (ページダウンキー)',
      monthSelect: '月を選択',
      yearSelect: '年を選択',
      decadeSelect: '年代を選択',
      yearFormat: 'YYYY年',
      dayFormat: 'D日',
      dateFormat: 'YYYY年M月D日',
      dateTimeFormat: 'YYYY年M月D日 HH時mm分ss秒',
      previousYear: '前年 (Controlを押しながら左キー)',
      nextYear: '翌年 (Controlを押しながら右キー)',
      previousDecade: '前の年代',
      nextDecade: '次の年代',
      previousCentury: '前の世紀',
      nextCentury: '次の世紀',
    },
    timePickerLocale: {
      placeholder: '時間を選択',
      rangePlaceholder: [
        '開始時間',
        '終了時間',
      ],
    },
  },
  Table: {
    filterTitle: 'フィルター',
    filterConfirm: 'OK',
    filterReset: 'リセット',
    filterEmptyText: 'フィルターなし',
    selectAll: 'ページ単位で選択',
    selectInvert: 'ページ単位で反転',
    selectionAll: 'すべてを選択',
    sortTitle: 'ソート',
    expand: '展開する',
    collapse: '折り畳む',
    triggerDesc: 'クリックで降順にソート',
    triggerAsc: 'クリックで昇順にソート',
    cancelSort: 'ソートをキャンセル',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },
  Transfer: {
    searchPlaceholder: 'ここを検索',
    itemUnit: 'アイテム',
    itemsUnit: 'アイテム',
  },
  Upload: {
    uploading: 'アップロード中...',
    removeFile: 'ファイルを削除',
    uploadError: 'アップロードエラー',
    previewFile: 'ファイルをプレビュー',
    downloadFile: 'ダウンロードファイル',
  },
  Empty: {
    description: 'データがありません',
  },
  Form: {
    defaultValidateMessages: {
      default: '${label}のフィールド検証エラー',
      required: '${label}を入力してください',
      enum: '${label}は[${enum}]のいずれかである必要があります',
      whitespace: '${label}は空白文字にすることはできません',
      date: {
        format: '${label}の日付形式は不正です',
        parse: '${label}は日付に変換できません',
        invalid: '${label}は不正な日付です',
      },
      types: {
        string: '${label}は有効な${type}ではありません',
        method: '${label}は有効な${type}ではありません',
        array: '${label}は有効な${type}ではありません',
        object: '${label}は有効な${type}ではありません',
        number: '${label}は有効な${type}ではありません',
        date: '${label}は有効な${type}ではありません',
        boolean: '${label}は有効な${type}ではありません',
        integer: '${label}は有効な${type}ではありません',
        float: '${label}は有効な${type}ではありません',
        regexp: '${label}は有効な${type}ではありません',
        email: '${label}は有効な${type}ではありません',
        url: '${label}は有効な${type}ではありません',
        hex: '${label}は有効な${type}ではありません',
      },
      string: {
        len: '${label}は${len}文字である必要があります',
        min: '${label}は${min}文字以上である必要があります',
        max: '${label}は${max}文字以下である必要があります',
        range: '${label}は${min}-${max}文字の範囲である必要があります',
      },
      number: {
        len: '${label}は${len}と等しい必要があります',
        min: '${label}の最小値は${min}です',
        max: '${label}の最大値は${max}です',
        range: '${label}は${min}-${max}の範囲である必要があります',
      },
      array: {
        len: '${label}は${len}である必要があります',
        min: '${label}の最小は${min}です',
        max: '${label}の最大は${max}です',
        range: '${label}の合計は${min}-${max}の範囲である必要があります',
      },
      pattern: {
        mismatch: '${label}はパターン${pattern}と一致しません',
      },
    },
  },
};

export default localeValues;
