import type { ComponentDemo } from '../../interface'
import { Tag } from '@antdv/ui'

const Demo = () => <Tag color="success">Success</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess', 'colorSuccessBg', 'colorSuccessBorder'],
  key: 'success',
}

export default componentDemo
