import { warningFn } from '../../../_utils/log'
import { toArray } from './valueUtil'
import type { TreeSelectProps } from '../TreeSelect'

function warningProps(props: TreeSelectProps & { searchPlaceholder?: string }) {
  const { searchPlaceholder, treeCheckStrictly, treeCheckable, labelInValue, value, multiple }
    = props

  warningFn(
    !searchPlaceholder,
    '`searchPlaceholder` has been removed, please use `placeholder` instead',
  )

  if (treeCheckStrictly && labelInValue === false)
    warningFn(false, '`treeCheckStrictly` will force set `labelInValue` to `true`.')

  if (labelInValue || treeCheckStrictly) {
    warningFn(
      toArray(value).every(val => val && typeof val === 'object' && 'value' in val),
      'Invalid prop `value` supplied to `TreeSelect`. You should use { label: string, value: string | number } or [{ label: string, value: string | number }] instead.',
    )
  }

  if (treeCheckStrictly || multiple || treeCheckable) {
    warningFn(
      !value || Array.isArray(value),
      '`value` should be an array when `TreeSelect` is checkable or multiple.',
    )
  } else {
    warningFn(!Array.isArray(value), '`value` should not be array when `TreeSelect` is single mode.')
  }
}

export default warningProps
