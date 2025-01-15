import { withInstall } from '@antdv/utils';
import ALocaleProvider from './src/LocaleProvider';

export const LocaleProvider = withInstall(ALocaleProvider);

export default LocaleProvider;

export * from './src/interface';
export * from './src/props';
export * from './src/useLocaleReceiver';
