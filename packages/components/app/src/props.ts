import type { ExtractPropTypes } from 'vue';
import type { AppConfig } from './interface';
import { objectType } from '@antdv/utils';

export function appProps() {
  return {
    rootClassName: String,
    message: objectType<AppConfig['message']>(),
    notification: objectType<AppConfig['notification']>(),
  };
}

export type AppProps = Partial<ExtractPropTypes<typeof appProps>>;
