import type { ComponentDemo } from '../../interface'
import { Pagination, Space } from '@antdv/ui'

import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <Pagination showQuickJumper pageSize={1} defaultCurrent={2} total={10} />
      </Space>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'controlOutline', 'colorPrimaryHover', 'colorBgContainer'],
  key: 'outline',
}

export default componentDemo
