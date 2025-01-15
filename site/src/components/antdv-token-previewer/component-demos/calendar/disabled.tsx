import type { ComponentDemo } from '../../interface'
import { Calendar } from '@antdv/ui'

const Demo = () => <Calendar disabledDate={() => true} />

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled', 'colorTextDisabled'],
  key: 'disabled',
}

export default componentDemo
