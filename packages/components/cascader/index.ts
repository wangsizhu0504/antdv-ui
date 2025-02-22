import { withInstall } from '@antdv/utils';
import { SHOW_CHILD, SHOW_PARENT } from '@antdv/vue-components/vc-cascader/src/Cascader';
import ACascader from './src/Cascader';

export const Cascader = withInstall<
  typeof ACascader & {
    SHOW_PARENT: typeof SHOW_PARENT
    SHOW_CHILD: typeof SHOW_CHILD
  }
>(
  Object.assign(ACascader, {
    SHOW_CHILD,
    SHOW_PARENT,
  } as any),
);

export * from './src/interface';
export * from './src/props';

export default Cascader;
