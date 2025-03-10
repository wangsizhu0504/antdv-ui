export type {
  ComponentToken,
  ComponentTokenKey,
  GlobalToken,
  GlobalTokenWithComponent,
  OverrideTokenMap,
  TokenMap,
  TokenMapKey,
} from './interface';

export { default as genStyleUtils } from './util/genStyleUtils';
export type {
  CSSUtil,
  FullToken,
  GenStyleFn,
  GetDefaultToken,
  GetDefaultTokenFn,
  TokenWithCommonCls,
} from './util/genStyleUtils';
export { merge as mergeToken, statistic, default as statisticToken } from './util/statistic';
