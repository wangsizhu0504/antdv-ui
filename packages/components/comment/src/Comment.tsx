import type { CustomSlotsType, VueNode } from '@antdv/types'
import { flattenChildren } from '@antdv/utils'
import { defineComponent } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import { commentProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AComment',
  inheritAttrs: false,
  props: commentProps(),
  slots: Object as CustomSlotsType<{
    actions: any
    author: any
    avatar: any
    content: any
    datetime: any
    default: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('comment', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const renderNested = (prefix: string, children: VueNode) => {
      return <div class={`${prefix}-nested`}>{children}</div>
    }
    const getAction = (actions: VueNode[]) => {
      if (!actions || !actions.length)
        return null

      const actionList = actions.map((action, index) => <li key={`action-${index}`}>{action}</li>)
      return actionList
    }
    return () => {
      const pre = prefixCls.value

      const actions: any[] = props.actions ?? slots.actions?.()
      const author = props.author ?? slots.author?.()
      const avatar = props.avatar ?? slots.avatar?.()
      const content = props.content ?? slots.content?.()
      const datetime = props.datetime ?? slots.datetime?.()

      const avatarDom = (
        <div class={`${pre}-avatar`}>
          {typeof avatar === 'string' ? <img src={avatar} alt="comment-avatar" /> : avatar}
        </div>
      )

      const actionDom = actions
        ? (
            <ul class={`${pre}-actions`}>{getAction(Array.isArray(actions) ? actions : [actions])}</ul>
          )
        : null

      const authorContent = (
        <div class={`${pre}-content-author`}>
          {author && <span class={`${pre}-content-author-name`}>{author}</span>}
          {datetime && <span class={`${pre}-content-author-time`}>{datetime}</span>}
        </div>
      )

      const contentDom = (
        <div class={`${pre}-content`}>
          {authorContent}
          <div class={`${pre}-content-detail`}>{content}</div>
          {actionDom}
        </div>
      )

      const comment = (
        <div class={`${pre}-inner`}>
          {avatarDom}
          {contentDom}
        </div>
      )
      const children = flattenChildren(slots.default?.())
      return wrapSSR(
        <div
          {...attrs}
          class={[
            pre,
            {
              [`${pre}-rtl`]: direction.value === 'rtl',
            },
            attrs.class,
            hashId.value,
          ]}
        >
          {comment}
          {children && children.length ? renderNested(pre, children) : null}
        </div>,
      )
    }
  },
})
