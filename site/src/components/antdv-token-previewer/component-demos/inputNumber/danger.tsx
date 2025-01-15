import type { ComponentDemo } from '../../interface'
import { InputNumber } from '@antdv/ui'
import { defineComponent } from 'vue'

function onChange() {}

const Demo = defineComponent({
  setup() {
    return () => (
      <InputNumber status="error" min={1} max={10} defaultValue={3} onChange={onChange} />
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorErrorBorder', 'colorErrorOutline', 'colorErrorHover', 'colorError'],
  key: 'danger',
}

export default componentDemo
