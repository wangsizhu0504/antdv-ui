import { objectType } from '@antdv/utils'
import type { ExtractPropTypes } from 'vue'
import type { AppConfig } from './types'

export function appProps() {
  return {
    rootClassName: String,
    message: objectType<AppConfig['message']>(),
    notification: objectType<AppConfig['notification']>(),
  }
}

export type AppProps = Partial<ExtractPropTypes<typeof appProps>>
