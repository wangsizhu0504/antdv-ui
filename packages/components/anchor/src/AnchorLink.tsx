import { defineComponent, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { classNames } from '@antdv/utils'
import type { SlotsType } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useInjectAnchor } from './context'
import { anchorLinkProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAnchorLink',
  inheritAttrs: false,
  props: anchorLinkProps(),
  slots: Object as SlotsType<{
    title: any
    default: any
    customTitle: any
  }>,
  setup(props, { slots, attrs }) {
    let mergedTitle = null
    const {
      handleClick: contextHandleClick,
      scrollTo,
      unregisterLink,
      registerLink,
      activeLink,
    } = useInjectAnchor()
    const { prefixCls } = useConfigInject('anchor', props)

    const handleClick = (e: Event) => {
      const { href } = props
      contextHandleClick(e, { title: mergedTitle, href })
      scrollTo(href)
    }

    watch(
      () => props.href,
      (val, oldVal) => {
        nextTick(() => {
          unregisterLink(oldVal)
          registerLink(val)
        })
      },
    )

    onMounted(() => {
      registerLink(props.href)
    })

    onBeforeUnmount(() => {
      unregisterLink(props.href)
    })

    return () => {
      const { href, target, title = slots.title, customTitleProps = {} } = props
      const pre = prefixCls.value
      mergedTitle = typeof title === 'function' ? title(customTitleProps) : title
      const active = activeLink.value === href
      const wrapperClassName = classNames(
        `${pre}-link`,
        {
          [`${pre}-link-active`]: active,
        },
        attrs.class,
      )
      const titleClassName = classNames(`${pre}-link-title`, {
        [`${pre}-link-title-active`]: active,
      })
      return (
        <div {...attrs} class={wrapperClassName}>
          <a
            class={titleClassName}
            href={href}
            title={typeof mergedTitle === 'string' ? mergedTitle : ''}
            target={target}
            onClick={handleClick}
          >
            {slots.customTitle ? slots.customTitle(customTitleProps) : mergedTitle}
          </a>
          {slots.default?.()}
        </div>
      )
    }
  },
})
