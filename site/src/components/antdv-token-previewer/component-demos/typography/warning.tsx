import { Typography } from '@antdv/ui'
import { defineComponent } from 'vue'
import type { ComponentDemo } from '../../interface'

const { Title, Text } = Typography

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Title type="warning" level={4}>
          Error Title
        </Title>
        <Text type="warning">error Text</Text>
      </div>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
}

export default componentDemo
