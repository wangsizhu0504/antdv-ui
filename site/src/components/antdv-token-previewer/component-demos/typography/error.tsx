import type { ComponentDemo } from '../../interface'
import { Typography } from '@antdv/ui'
import { defineComponent } from 'vue'

const { Title, Text } = Typography

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Title type="danger" level={4}>
          Error Title
        </Title>
        <Text type="danger">error Text</Text>
      </div>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover', 'colorErrorActive'],
  key: 'error',
}

export default componentDemo
