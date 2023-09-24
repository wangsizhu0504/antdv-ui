import { objectType } from '../../_utils/vue'
import type { AppConfig } from './types'
import type { ExtractPropTypes } from 'vue'

export const appProps = () => {
  return {
    rootClassName: String,
    message: objectType<AppConfig['message']>(),
    notification: objectType<AppConfig['notification']>(),
  }
}

export type AppProps = Partial<ExtractPropTypes<typeof appProps>>
