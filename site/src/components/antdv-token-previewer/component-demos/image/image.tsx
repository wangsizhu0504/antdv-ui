import { Image } from '@antdv/ui'

import type { ComponentDemo } from '../../interface'

function Demo() {
  return (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  )
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgMask'],
  key: 'default',
}

export default componentDemo
