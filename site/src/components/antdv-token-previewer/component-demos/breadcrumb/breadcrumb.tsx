import type { ComponentDemo } from '../../interface'
import { Breadcrumb } from '@antdv/ui'
import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorText', 'colorPrimary', 'colorPrimaryActive', 'colorPrimaryHover'],
  key: 'breadcrumb',
}

export default componentDemo
