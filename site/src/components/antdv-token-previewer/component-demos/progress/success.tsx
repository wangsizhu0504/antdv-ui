import { Progress, Space } from '@antdv/ui'

import type { ComponentDemo } from '../../interface'

function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Progress percent={70} status="success" type="dashboard" />
        <Progress percent={80} status="success" type="circle" />
      </Space>
      <Progress percent={50} status="success" />
    </Space>
  )
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
  key: 'success',
}

export default componentDemo
