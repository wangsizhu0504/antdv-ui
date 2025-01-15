import type { ComponentDemo } from '../../interface'
import { Tag } from '@antdv/ui'

const Demo = () => <Tag color="warning">Warning</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning', 'colorWarningBg', 'colorWarningBorder'],
  key: 'warning',
}

export default componentDemo
