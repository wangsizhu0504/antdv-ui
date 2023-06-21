import { Calendar } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <Calendar />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorPrimaryHover', 'colorBgContainer'],
  key: 'default',
}

export default componentDemo
