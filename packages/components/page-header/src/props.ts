import { PropTypes, objectType, vNodeType } from '@antdv/utils'
import type { MouseEventHandler } from '@antdv/types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { AvatarProps } from '../../avatar'

export function pageHeaderProps() {
  return {
    backIcon: vNodeType(),
    prefixCls: String,
    title: vNodeType(),
    subTitle: vNodeType(),
    breadcrumb: PropTypes.object,
    tags: vNodeType(),
    footer: vNodeType(),
    extra: vNodeType(),
    avatar: objectType<AvatarProps>(),
    ghost: { type: Boolean, default: undefined },
    onBack: Function as PropType<MouseEventHandler>,
  }
}

export type PageHeaderProps = Partial<ExtractPropTypes<ReturnType<typeof pageHeaderProps>>>
