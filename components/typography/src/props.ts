import { omit } from 'lodash-es'
import { tupleNum } from '../../_utils/vue'
import type { Direction } from '../../config-provider'
import type { AnchorHTMLAttributes, ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import type { BaseType, EllipsisConfig, InternalBlockProps } from './types'
import type { AutoSizeType } from '../../input'

export const baseProps = () => ({
  'editable': {
    type: [Boolean, Object] as PropType<InternalBlockProps['editable']>,
    default: undefined as InternalBlockProps['editable'],
  },
  'copyable': {
    type: [Boolean, Object] as PropType<InternalBlockProps['copyable']>,
    default: undefined as InternalBlockProps['copyable'],
  },
  'prefixCls': String,
  'component': String,
  'type': String as PropType<BaseType>,
  'disabled': { type: Boolean, default: undefined },
  'ellipsis': {
    type: [Boolean, Object] as PropType<InternalBlockProps['ellipsis']>,
    default: undefined as InternalBlockProps['ellipsis'],
  },
  'code': { type: Boolean, default: undefined },
  'mark': { type: Boolean, default: undefined },
  'underline': { type: Boolean, default: undefined },
  'delete': { type: Boolean, default: undefined },
  'strong': { type: Boolean, default: undefined },
  'keyboard': { type: Boolean, default: undefined },
  'content': String,
  'onUpdate:content': Function as PropType<(content: string) => void>,
})

export const editableProps = () => ({
  prefixCls: String,
  value: String,
  maxlength: Number,
  autoSize: { type: [Boolean, Object] as PropType<boolean | AutoSizeType> },
  onSave: Function as PropType<(val: string) => void>,
  onCancel: Function as PropType<() => void>,
  onEnd: Function as PropType<() => void>,
  onChange: Function as PropType<(val: string) => void>,
  originContent: String,
  direction: String as PropType<Direction>,
  component: String,
})

export const linkProps = () => omit({ ...baseProps(), ellipsis: { type: Boolean, default: undefined } }, ['component'])

export const paragraphProps = () => omit(baseProps(), ['component'])

export const textProps = () => ({
  ...omit(baseProps(), ['component']),
  ellipsis: {
    type: [Boolean, Object] as PropType<
      boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>
    >,
    default: undefined as boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>,
  },
})
export const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5)
export const titleProps = () => ({
  ...omit(baseProps(), ['component', 'strong']),
  level: Number as PropType<(typeof TITLE_ELE_LIST)[number]>,
})

export type TitleProps = Partial<ExtractPropTypes<ReturnType<typeof titleProps>>>

export type TextProps = Partial<ExtractPropTypes<ReturnType<typeof textProps>>>

export type ParagraphProps = Partial<ExtractPropTypes<ReturnType<typeof paragraphProps>>>

export type LinkProps = Partial<ExtractPropTypes<ReturnType<typeof linkProps>>> & AnchorHTMLAttributes

export type EditableProps = Partial<ExtractPropTypes<ReturnType<typeof editableProps>>>

export interface TypographyProps extends HTMLAttributes {
  direction?: Direction
  prefixCls?: string
}

export interface InternalTypographyProps extends TypographyProps {
  component?: string
}
export const typographyProps = () => ({
  prefixCls: String,
  direction: String as PropType<Direction>,
  // Form Internal use
  component: String,
})
