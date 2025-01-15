import type { ComponentDemo } from '../../interface'
import { Result } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => <Result status="error" title="Demo示意" subTitle="status 为 error" />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
  key: 'danger',
}

export default componentDemo
