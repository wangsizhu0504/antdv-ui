import type { ComponentDemo } from '../../interface'

import { Rate } from '@antdv/ui'

const Demo = () => <Rate />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillContent'],
  key: 'default',
}

export default componentDemo
