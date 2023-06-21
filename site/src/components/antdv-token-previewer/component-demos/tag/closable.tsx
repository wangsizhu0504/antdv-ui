import { Tag } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <Tag closable>Error</Tag>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillAlter', 'colorIcon', 'colorIconHover'],
  key: 'closable',
}

export default componentDemo
