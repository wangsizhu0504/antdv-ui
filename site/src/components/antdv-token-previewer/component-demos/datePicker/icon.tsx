import { DatePicker } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <DatePicker />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorIcon', 'colorIconHover'],
  key: 'icon',
}

export default componentDemo
