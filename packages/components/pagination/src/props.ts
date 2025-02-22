import type { ExtractPropTypes } from 'vue';
import type { PaginationPosition } from './interface';
import { arrayType, booleanType, functionType, someType, stringType } from '@antdv/utils';

export function paginationProps() {
  return {
    'total': Number,
    'defaultCurrent': Number,
    'disabled': booleanType(),
    'current': Number,
    'defaultPageSize': Number,
    'pageSize': Number,
    'hideOnSinglePage': booleanType(),
    'showSizeChanger': booleanType(),
    'pageSizeOptions': arrayType<Array<string | number>>(),
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
  };
}

export function paginationConfig() {
  return {
    ...paginationProps(),
    position: stringType<PaginationPosition>(),
  };
}

export type PaginationConfig = Partial<ExtractPropTypes<ReturnType<typeof paginationConfig>>>;

export type PaginationProps = Partial<ExtractPropTypes<ReturnType<typeof paginationProps>>>;
