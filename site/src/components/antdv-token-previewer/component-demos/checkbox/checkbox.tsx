import type { ComponentDemo } from '../../interface'
import { Checkbox, Space } from '@antdv/ui'

function Demo(props: any) {
  return (
    <Space>
      <Checkbox {...props}>Checkbox</Checkbox>
      <Checkbox {...props} checked>
        选中态
      </Checkbox>
    </Space>
  )
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorText', 'colorBgContainer'],
  key: 'default',
}

export default componentDemo
