import { Button } from '@antdv/ui'

import type { ComponentDemo } from '../../interface'

const Demo = () => <Button>default</Button>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainer'],
  key: 'defaultButton',
}

export default componentDemo
