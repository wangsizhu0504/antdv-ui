import type { Plugin } from 'vue';
import type { setGlobalConfig } from './src/ConfigProvider';
import { withInstall } from '@antdv/utils';
import AConfigProvider from './src/ConfigProvider';

export const ConfigProvider = withInstall(AConfigProvider);

export default ConfigProvider as typeof ConfigProvider & Plugin & {
  readonly config: typeof setGlobalConfig
};

export { globalConfigForApi } from './src/config';
export * from './src/context';
export { default as useAntdContext } from './src/hooks/useConfigInject';
export * from './src/interface';
export * from './src/props';
