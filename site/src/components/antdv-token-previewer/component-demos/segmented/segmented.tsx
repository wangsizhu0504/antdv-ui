import type { ComponentDemo } from '../../interface'
import { Segmented } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <Segmented value="Daily" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  key: 'default',
  tokens: [],
}

export default componentDemo
