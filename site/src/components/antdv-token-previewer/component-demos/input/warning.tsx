import type { ComponentDemo } from '../../interface'
import { Input } from '@antdv/ui'
import { defineComponent } from 'vue'

function onChange() {}

const Demo = defineComponent({
  setup() {
    return () => <Input status="warning" defaultValue={3} onChange={onChange} />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning', 'colorWarningBorder', 'colorWarningHover', 'colorWarningOutline'],
  key: 'warning',
}

export default componentDemo
