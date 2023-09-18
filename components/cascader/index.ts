import { withInstall } from '../_util/type'
import {
  SHOW_CHILD,
  SHOW_PARENT,
} from '../vc-cascader'
import cascader from './Cascader'

export const Cascader = withInstall<
  typeof cascader & {
    SHOW_PARENT: typeof SHOW_PARENT
    SHOW_CHILD: typeof SHOW_CHILD
  }
>(
  Object.assign(cascader, {
    SHOW_CHILD,
    SHOW_PARENT,
  } as any),
)

export * from './types'
export * from './props'

export default Cascader