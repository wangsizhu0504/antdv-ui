import { PropTypes, objectType, vNodeType } from '../../_utils/vue'
import type { MouseEventHandler } from '../../_utils/types'
import type { AvatarProps } from '../../avatar'
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
