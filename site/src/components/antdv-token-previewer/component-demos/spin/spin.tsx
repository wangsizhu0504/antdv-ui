import { Spin } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <Spin />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorBgContainer'],
  key: 'default',
}

export default componentDemo
