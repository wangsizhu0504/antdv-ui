import { defineComponent } from 'vue'
import { Button, message } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    const info = () => {
      message.info('Hello, Ant Design Vue!')
    }

    return () => <Button onClick={info}>Info</Button>
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorText', 'colorBgElevated'],
  key: 'message',
}

export default componentDemo
