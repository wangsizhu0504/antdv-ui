import type { Ref, VNode } from 'vue';

export type {
  ComponentToken,
  ComponentTokenKey,
  GlobalToken,
  GlobalTokenWithComponent,
  OverrideTokenMap,
  TokenMap,
  TokenMapKey,
} from './components';

export type UseComponentStyleResult = [(node: VNode) => VNode, Ref<string>];
