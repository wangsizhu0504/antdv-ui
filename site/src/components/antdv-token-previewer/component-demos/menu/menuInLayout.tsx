import { defineComponent } from 'vue'
import { Menu, theme } from '@antdv/ui'

import type { ComponentDemo } from '../../interface'
import items from './data'

const Demo = defineComponent({
  setup() {
    const { token } = theme.useToken()

    return () => {
      return (
        <div style={{ background: token.value.colorBorderSecondary, padding: '12px' }}>
          <Menu
            style={{ width: '256px' }}
            selectedKeys={['1']}
            openKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
      )
    }
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSplit'],
  key: 'menuInLayout',
}

export default componentDemo
