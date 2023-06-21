import { Tag } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <Tag color="error">Error</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorBg', 'colorErrorBorder'],
  key: 'error',
}

export default componentDemo
