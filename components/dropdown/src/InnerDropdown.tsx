import { Fragment, computed, defineComponent, ref, watch } from 'vue'
import Trigger from '../../_internal/trigger'
import { classNames, cloneElement } from '../../_utils/dom'
import { skipFlattenKey } from '../../constant'
import { innerDropdownProps } from './props'
import placements from './placements'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'InnerDropdown',
  props: innerDropdownProps(),
  emits: ['visibleChange', 'overlayClick'],
  setup(props, { slots, emit, expose }) {
    const triggerVisible = ref(!!props.visible)
    watch(
      () => props.visible,
      (val) => {
        if (val !== undefined)
          triggerVisible.value = val
      },
    )
    const triggerRef = ref()

    expose({
      triggerRef,
    })

    const onClick = (e: MouseEvent) => {
      if (props.visible === undefined)
        triggerVisible.value = false

      emit('overlayClick', e)
    }

    const onVisibleChange = (visible: boolean) => {
      if (props.visible === undefined)
        triggerVisible.value = visible

      emit('visibleChange', visible)
    }

    const getMenuElement = () => {
      const overlayElement = slots.overlay?.()
      const extraOverlayProps = {
        prefixCls: `${props.prefixCls}-menu`,
        onClick,
      }
      return (
        <Fragment key={skipFlattenKey}>
          {props.arrow && <div class={`${props.prefixCls}-arrow`} />}
          {cloneElement(overlayElement, extraOverlayProps, false)}
        </Fragment>
      )
    }

    const minOverlayWidthMatchTrigger = computed(() => {
      const { minOverlayWidthMatchTrigger: matchTrigger = !props.alignPoint } = props
      return matchTrigger
    })

    const renderChildren = () => {
      const children = slots.default?.()
      return (triggerVisible.value && children)
        ? cloneElement(
          children[0],
          { class: props.openClassName || `${props.prefixCls}-open` },
          false,
        )
        : children
    }

    const triggerHideAction = computed(() => {
      if (!props.hideAction && props.trigger.includes('contextmenu'))
        return ['click']

      return props.hideAction
    })
    return () => {
      const {
        prefixCls,
        arrow,
        showAction,
        overlayStyle,
        trigger,
        placement,
        align,
        getPopupContainer,
        transitionName,
        animation,
        overlayClassName,
        ...otherProps
      } = props
      return (
        <Trigger
          {...otherProps}
          prefixCls={prefixCls}
          ref={triggerRef}
          popupClassName={classNames(overlayClassName, {
            [`${prefixCls}-show-arrow`]: arrow,
          })}
          popupStyle={overlayStyle}
          builtinPlacements={placements}
          action={trigger}
          showAction={showAction}
          hideAction={triggerHideAction.value || []}
          popupPlacement={placement}
          popupAlign={align}
          popupTransitionName={transitionName}
          popupAnimation={animation}
          popupVisible={triggerVisible.value}
          stretch={minOverlayWidthMatchTrigger.value ? 'minWidth' : ''}
          onPopupVisibleChange={onVisibleChange}
          getPopupContainer={getPopupContainer}
          v-slots={{ popup: getMenuElement, default: renderChildren }}
        ></Trigger>
      )
    }
  },
})
