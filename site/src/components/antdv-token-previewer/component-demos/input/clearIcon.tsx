import type { ComponentDemo } from '../../interface'
import { Input } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => <Input placeholder="Basic usage" value="右侧的图标就是 colorIcon" allowClear />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorIcon', 'colorIconHover'],
  key: 'clearIcon',
}
export default componentDemo
