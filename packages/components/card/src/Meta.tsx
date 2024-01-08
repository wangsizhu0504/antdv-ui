import { defineComponent } from 'vue'
import { getPropsSlot } from '@antdv/utils'
import type { CustomSlotsType } from '@antdv/types'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { cardMetaProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACardMeta',
  props: cardMetaProps(),
  slots: Object as CustomSlotsType<{
    title: any
    description: any
    avatar: any
    default: any
  }>,
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('card', props)
    return () => {
      const classString = {
        [`${prefixCls.value}-meta`]: true,
      }
      const avatar = getPropsSlot(slots, props, 'avatar')
      const title = getPropsSlot(slots, props, 'title')
      const description = getPropsSlot(slots, props, 'description')

      const avatarDom = avatar
        ? (
          <div class={`${prefixCls.value}-meta-avatar`}>{avatar}</div>
          )
        : null
      const titleDom = title ? <div class={`${prefixCls.value}-meta-title`}>{title}</div> : null
      const descriptionDom = description
        ? (
          <div class={`${prefixCls.value}-meta-description`}>{description}</div>
          )
        : null
      const MetaDetail
        = titleDom || descriptionDom
          ? (
            <div class={`${prefixCls.value}-meta-detail`}>
              {titleDom}
              {descriptionDom}
            </div>
            )
          : null
      return (
        <div class={classString}>
          {avatarDom}
          {MetaDetail}
        </div>
      )
    }
  },
})
