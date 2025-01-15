import type { ComponentDemo } from '../../interface'
import { Button, Modal } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    const success = () => {
      Modal.success({
        title: 'This is a success message',
        content: () => (
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        ),
      })
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
