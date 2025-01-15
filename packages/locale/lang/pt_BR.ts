import type { Locale } from '../type';

const localeValues: Locale = {
  locale: 'pt-br',
  Pagination: {
    items_per_page: '/ página',
    jump_to: 'Vá até',
    jump_to_confirm: 'confirme',
    page: '',
    prev_page: 'Página anterior',
    next_page: 'Próxima página',
    prev_5: '5 páginas anteriores',
    next_5: '5 próximas páginas',
    prev_3: '3 páginas anteriores',
    next_3: '3 próximas páginas',
  },
  DatePicker: {
    lang: {
      placeholder: 'Selecionar data',
      rangePlaceholder: [
        'Data inicial',
        'Data final',
      ],
      locale: 'pt_BR',
      today: 'Hoje',
      now: 'Agora',
      backToToday: 'Voltar para hoje',
      ok: 'Ok',
      clear: 'Limpar',
      month: 'Mês',
      year: 'Ano',
      timeSelect: 'Selecionar hora',
      dateSelect: 'Selecionar data',
      monthSelect: 'Escolher mês',
      yearSelect: 'Escolher ano',
      decadeSelect: 'Escolher década',
      yearFormat: 'YYYY',
      dateFormat: 'D/M/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'D/M/YYYY HH:mm:ss',
      monthBeforeYear: false,
      previousMonth: 'Mês anterior (PageUp)',
      nextMonth: 'Próximo mês (PageDown)',
      previousYear: 'Ano anterior (Control + esquerda)',
      nextYear: 'Próximo ano (Control + direita)',
      previousDecade: 'Década anterior',
      nextDecade: 'Próxima década',
      previousCentury: 'Século anterior',
      nextCentury: 'Próximo século',
      shortWeekDays: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sáb',
      ],
      shortMonths: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    },
    timePickerLocale: {
      placeholder: 'Hora',
    },
  },
  TimePicker: {
    placeholder: 'Hora',
  },
  Calendar: {
    lang: {
      placeholder: 'Selecionar data',
      rangePlaceholder: [
        'Data inicial',
        'Data final',
      ],
      locale: 'pt_BR',
      today: 'Hoje',
      now: 'Agora',
      backToToday: 'Voltar para hoje',
      ok: 'Ok',
      clear: 'Limpar',
      month: 'Mês',
      year: 'Ano',
      timeSelect: 'Selecionar hora',
      dateSelect: 'Selecionar data',
      monthSelect: 'Escolher mês',
      yearSelect: 'Escolher ano',
      decadeSelect: 'Escolher década',
      yearFormat: 'YYYY',
      dateFormat: 'D/M/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'D/M/YYYY HH:mm:ss',
      monthBeforeYear: false,
      previousMonth: 'Mês anterior (PageUp)',
      nextMonth: 'Próximo mês (PageDown)',
      previousYear: 'Ano anterior (Control + esquerda)',
      nextYear: 'Próximo ano (Control + direita)',
      previousDecade: 'Década anterior',
      nextDecade: 'Próxima década',
      previousCentury: 'Século anterior',
      nextCentury: 'Próximo século',
      shortWeekDays: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sáb',
      ],
      shortMonths: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    },
    timePickerLocale: {
      placeholder: 'Hora',
    },
  },
  global: {
    placeholder: 'Por favor escolha',
  },
  Table: {
    filterTitle: 'Menu de Filtro',
    filterConfirm: 'OK',
    filterReset: 'Resetar',
    filterEmptyText: 'Sem filtros',
    emptyText: 'Sem conteúdo',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
    selectNone: 'Apagar todo o conteúdo',
    selectionAll: 'Selecionar todo o conteúdo',
    sortTitle: 'Ordenar título',
    expand: 'Expandir linha',
    collapse: 'Colapsar linha',
    triggerDesc: 'Clique organiza por descendente',
    triggerAsc: 'Clique organiza por ascendente',
    cancelSort: 'Clique para cancelar organização',
  },
  Tour: {
    Next: 'Próximo',
    Previous: 'Anterior',
    Finish: 'Finalizar',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar',
  },
  Transfer: {
    titles: [
      '',
      '',
    ],
    searchPlaceholder: 'Procurar',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Remover',
    selectCurrent: 'Selecionar página atual',
    removeCurrent: 'Remover página atual',
    selectAll: 'Selecionar todos',
    removeAll: 'Remover todos',
    selectInvert: 'Inverter seleção atual',
  },
  Upload: {
    uploading: 'Enviando...',
    removeFile: 'Remover arquivo',
    uploadError: 'Erro no envio',
    previewFile: 'Visualizar arquivo',
    downloadFile: 'Baixar arquivo',
  },
  Empty: {
    description: 'Não há dados',
  },
  Icon: {
    icon: 'ícone',
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiado',
    expand: 'expandir',
  },
  PageHeader: {
    back: 'Retornar',
  },
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Erro ${label} na validação de campo',
      required: 'Por favor, insira ${label}',
      enum: '${label} deve ser um dos seguinte: [${enum}]',
      whitespace: '${label} não pode ser um carácter vazio',
      date: {
        format: ' O formato de data ${label} é inválido',
        parse: '${label} não pode ser convertido para uma data',
        invalid: '${label} é uma data inválida',
      },
      types: {
        string: '${label} não é um ${type} válido',
        method: '${label} não é um ${type} válido',
        array: '${label} não é um ${type} válido',
        object: '${label} não é um ${type} válido',
        number: '${label} não é um ${type} válido',
        date: '${label} não é um ${type} válido',
        boolean: '${label} não é um ${type} válido',
        integer: '${label} não é um ${type} válido',
        float: '${label} não é um ${type} válido',
        regexp: '${label} não é um ${type} válido',
        email: '${label} não é um ${type} válido',
        url: '${label} não é um ${type} válido',
        hex: '${label} não é um ${type} válido',
      },
      string: {
        len: '${label} deve possuir ${len} caracteres',
        min: '${label} deve possuir ao menos ${min} caracteres',
        max: '${label} deve possuir no máximo ${max} caracteres',
        range: '${label} deve possuir entre ${min} e ${max} caracteres',
      },
      number: {
        len: '${label} deve ser igual à ${len}',
        min: 'O valor mínimo de ${label} é ${min}',
        max: 'O valor máximo de ${label} é ${max}',
        range: '${label} deve estar entre ${min} e ${max}',
      },
      array: {
        len: 'Deve ser ${len} ${label}',
        min: 'No mínimo ${min} ${label}',
        max: 'No máximo ${max} ${label}',
        range: 'A quantidade de ${label} deve estar entre ${min} e ${max}',
      },
      pattern: {
        mismatch: '${label} não se encaixa no padrão ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Pré-visualização',
  },
};

export default localeValues;
