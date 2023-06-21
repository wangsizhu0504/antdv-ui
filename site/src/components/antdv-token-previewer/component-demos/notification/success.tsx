import { defineComponent } from 'vue'
import { Button, notification } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    const success = () => {
      notification.success({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
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
