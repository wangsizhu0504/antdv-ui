import type { ComponentDemo } from '../../interface'
import { Result } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => <Result status="info" title="Demo示意" subTitle="status 为info" />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo'],
  key: 'info',
}

export default componentDemo
