import type { ComponentDemo } from '../../interface'

import { Button } from '@antdv/ui'

const Demo = () => <Button>default</Button>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainer'],
  key: 'defaultButton',
}

export default componentDemo
