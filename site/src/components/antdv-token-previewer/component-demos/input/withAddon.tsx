import type { ComponentDemo } from '../../interface'
import { Input } from '@antdv/ui'
import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillAlter'],
  key: 'withAddon',
}

export default componentDemo
