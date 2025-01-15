import type { ComponentDemo } from '../../interface'
import { Button, Modal } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    const info = () => {
      Modal.info({
        title: 'This is a info message',
        content: () => (
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        ),
        onOk() {
          console.log('i am ok')
        },
      })
    }

    return () => <Button onClick={info}>info</Button>
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo'],
  key: 'info',
}
export default componentDemo
