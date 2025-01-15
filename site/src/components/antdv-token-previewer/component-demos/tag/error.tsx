import type { ComponentDemo } from '../../interface'
import { Tag } from '@antdv/ui'

const Demo = () => <Tag color="error">Error</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorBg', 'colorErrorBorder'],
  key: 'error',
}

export default componentDemo
