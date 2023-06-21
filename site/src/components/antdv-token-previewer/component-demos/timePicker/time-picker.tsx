import { TimePicker } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <TimePicker />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
  key: 'default',
}

export default componentDemo
