import { computed, inject } from 'vue'
import Empty from '../../empty'
import { configProviderKey } from '../../constant'
import { defaultConfigProvider } from './context'
import type { RenderEmptyProps } from './types'
import type { VueNode } from '../../_utils/types'

export const DefaultRenderEmpty = (props: RenderEmptyProps) => {
  const configProvider = inject(configProviderKey, {
    ...defaultConfigProvider,
  })
  const prefixCls = computed(() => configProvider.getPrefixCls('empty', props.prefixCls))
  const renderHtml = (componentName?: string) => {
    switch (componentName) {
      case 'Table':
      case 'List':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefixCls.value}-small`} />
      default:
        return <Empty />
    }
  }
  return renderHtml(props.componentName)
}

function renderEmpty(componentName?: string): VueNode {
  return <DefaultRenderEmpty componentName={componentName} />
}

export default renderEmpty
