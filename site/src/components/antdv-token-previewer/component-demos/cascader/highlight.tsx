import type { ComponentDemo } from '../../interface'
import { Cascader } from '@antdv/ui'

import options from './data'

function Demo() {
  return (
    <Cascader options={options} placeholder="Please select" searchValue="jiang" showSearch />
  )
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorHighlight'],
  key: 'highlight',
}

export default componentDemo
