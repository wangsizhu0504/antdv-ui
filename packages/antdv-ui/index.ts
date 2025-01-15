import installer from './install';

export * from '@antdv/components';
export { useConfigContextInject as useAntdContext } from '@antdv/components';
export * from '@antdv/constants';
export * from '@antdv/hooks';
export { theme } from '@antdv/theme';
export * from '@antdv/types';

export const install = installer.install;
export const version = installer.version;
export default installer;
export { default as dayjs } from 'dayjs';
