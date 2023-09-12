import { objectType } from '../_util/type'
import type { AppConfig } from './type'
import type { ExtractPropTypes } from 'vue'

export const appProps = () => {
  return {
    rootClassName: String,
    message: objectType<AppConfig['message']>(),
    notification: objectType<AppConfig['notification']>(),
  }
}

export type AppProps = Partial<ExtractPropTypes<typeof appProps>>
