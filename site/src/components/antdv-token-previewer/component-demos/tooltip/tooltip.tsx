import type { ComponentDemo } from '../../interface'
import { Tooltip } from '@antdv/ui'
import { defineComponent } from 'vue'

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Tooltip title="prompt text">
          <span>Tooltip will show on mouse enter.</span>
        </Tooltip>
      </div>
    )
  },
})
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgSpotlight', 'colorTextLightSolid'],
  key: 'default',
}

export default componentDemo
