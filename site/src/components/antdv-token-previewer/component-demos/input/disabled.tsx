import type { ComponentDemo } from '../../interface'
import { Input } from '@antdv/ui'

const Demo = () => <Input placeholder="Basic usage" disabled />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled'],
  key: 'disabled',
}

export default componentDemo
