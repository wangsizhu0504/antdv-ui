import { defineComponent } from 'vue'
import { Button, notification } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    const warning = () => {
      notification.warning({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      })
    }

    return () => <Button onClick={warning}>Warning</Button>
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
}

export default componentDemo
