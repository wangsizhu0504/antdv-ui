import { defineComponent } from 'vue'
import { Button, message } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    const success = () => {
      message.success('This is an success message')
    }

    return () => <Button onClick={success}>Success</Button>
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
  key: 'success',
}

export default componentDemo
