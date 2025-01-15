import type { ComponentDemo } from '../../interface'
import { Tag } from '@antdv/ui'

const Demo = () => <Tag color="processing">Info</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo', 'colorInfoBg', 'colorInfoBorder'],
  key: 'info',
}

export default componentDemo
