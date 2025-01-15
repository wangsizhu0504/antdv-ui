import type { ComponentDemo } from '../../interface'
import { Alert, Space } from '@antdv/ui'
import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <Alert message="Success Tips" type="success" showIcon />
        <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        />
      </Space>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess', 'colorSuccessBorder', 'colorSuccessBg'],
  key: 'success',
}

export default componentDemo
