import type { ComponentDemo } from '../../interface'
import { Alert, Space } from '@antdv/ui'
import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <Alert message="Informational Notes" type="info" showIcon />
        <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
        />
      </Space>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo', 'colorInfoBorder', 'colorInfoBg'],
  key: 'info',
}

export default componentDemo
