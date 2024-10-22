import { defineComponent } from 'vue'
import { Space } from '@antdv/ui'
import { HomeOutlined, LoadingOutlined, SettingFilled, SmileOutlined, SyncOutlined } from '@ant-design/icons-vue'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    return () => (
      <Space>
        <HomeOutlined />
        {' '}
        <SettingFilled />
        {' '}
        <SmileOutlined />
        {' '}
        <SyncOutlined spin />
        <SmileOutlined rotate={180} />
        {' '}
        <LoadingOutlined />
      </Space>
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  key: 'default',
}

export default componentDemo
