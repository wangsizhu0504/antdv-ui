import { objectType, vNodeType } from '../_util/type'
import PropTypes from '../_util/vue-types'
import type { MouseEventHandler } from '../_util/EventInterface'
import type { AvatarProps } from '../avatar'
import type { ExtractPropTypes, PropType } from 'vue'

export const pageHeaderProps = () => ({
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
})

export type PageHeaderProps = Partial<ExtractPropTypes<ReturnType<typeof pageHeaderProps>>>
