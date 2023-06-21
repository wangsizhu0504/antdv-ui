import { Checkbox } from '@antdv/ui'
import type { ComponentDemo } from '../../interface'

const Demo = () => <Checkbox disabled>Checkbox</Checkbox>

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled', 'colorBgContainerDisabled'],
  key: 'disabled',
}

export default componentDemo
