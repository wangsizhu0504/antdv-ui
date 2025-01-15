import type { ComponentDemo } from '../../interface'
import { TimePicker } from '@antdv/ui'

const Demo = () => <TimePicker />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
  key: 'default',
}

export default componentDemo
