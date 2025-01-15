import type { ComponentDemo } from '../../interface'
import { Cascader } from '@antdv/ui'

import { defineComponent } from 'vue'
import options from './data'

const Demo = defineComponent({
  setup() {
    return () => <Cascader options={options} open disabled placeholder="Please select" />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled'],
  key: 'disabled',
}

export default componentDemo
