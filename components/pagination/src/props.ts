import { arrayType, booleanType, functionType, someType, stringType } from '../../_utils/vue'
import type { PaginationPosition } from './types'
import type { ExtractPropTypes } from 'vue'

export const paginationProps = () => ({
  'total': Number,
  'defaultCurrent': Number,
  'disabled': booleanType(),
  'current': Number,
  'defaultPageSize': Number,
  'pageSize': Number,
  'hideOnSinglePage': booleanType(),
  'showSizeChanger': booleanType(),
  'pageSizeOptions': arrayType<(string | number)[]>(),
  'buildOptionText': functionType<(opt: { value: any }) => any>(),
  'showQuickJumper': someType<boolean | { goButton?: any }>([Boolean, Object]),
  'showTotal': functionType<(total: number, range: [number, number]) => any>(),
  'size': stringType<'default' | 'small'>(),
  'simple': booleanType(),
  'locale': Object,
  'prefixCls': String,
  'selectPrefixCls': String,
  'totalBoundaryShowSizeChanger': Number,
  'selectComponentClass': String,
  'itemRender':
    functionType<
      (opt: {
        page: number
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'
        originalElement: any
      }) => any
    >(),
  'role': String,
  'responsive': Boolean,
  'showLessItems': booleanType(),
  'onChange': functionType<(page: number, pageSize: number) => void>(),
  'onShowSizeChange': functionType<(current: number, size: number) => void>(),
  'onUpdate:current': functionType<(current: number) => void>(),
  'onUpdate:pageSize': functionType<(size: number) => void>(),
})

export const paginationConfig = () => ({
  ...paginationProps(),
  position: stringType<PaginationPosition>(),
})

export type PaginationConfig = Partial<ExtractPropTypes<ReturnType<typeof paginationConfig>>>

export type PaginationProps = Partial<ExtractPropTypes<ReturnType<typeof paginationProps>>>
