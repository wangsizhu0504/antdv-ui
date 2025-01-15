import type { ComponentDemo } from '../../interface'
import { DatePicker } from '@antdv/ui'

const Demo = () => <DatePicker status="warning" />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning', 'colorWarningBorder', 'colorWarningHover', 'colorWarningOutline'],
  key: 'warning',
}

export default componentDemo
