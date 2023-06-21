import { defineComponent } from 'vue'
import { Typography } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const { Title } = Typography

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Title type={'warning'} level={4}>
          Warning Text
        </Title>
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
