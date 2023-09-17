import { computed, defineComponent, ref, watchEffect } from 'vue'
import VcTree from '../vc-tree'
import devWarning from '../vc-util/devWarning'
import { warning } from '../vc-util/warning'

// CSSINJS
import omit from '../_util/omit'
import { useConfigInject } from '../hooks'
import initDefaultProps from '../_util/props-util/initDefaultProps'
import { filterEmpty } from '../_util/props-util'
import classNames from '../_util/classNames'
import renderSwitcherIcon from './utils/iconUtil'
import dropIndicatorRender from './utils/dropIndicator'
import useStyle from './style'
import { treeProps } from './props'
import type { TreeProps } from './props'
import type { SwitcherIconProps } from './utils/iconUtil'
import type { ScrollTo } from '../vc-tree/interface'
import type { SlotsType } from 'vue'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATree',
  inheritAttrs: false,
  props: initDefaultProps(treeProps(), {
    checkable: false,
    selectable: true,
    showIcon: false,
    blockNode: false,
  }),

  slots: Object as SlotsType<{
    icon?: any
    title?: any
    switcherIcon?: any
    titleRender?: any
    default?: any
    leafIcon?: any
  }>,
  setup(props, { attrs, expose, emit, slots }) {
    warning(
      !(props.treeData === undefined && slots.default),
      '`children` of Tree is deprecated. Please use `treeData` instead.',
    )
    const { prefixCls, direction, virtual } = useConfigInject('tree', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const treeRef = ref()
    const scrollTo: ScrollTo = (scroll) => {
      treeRef.value?.scrollTo(scroll)
    }
    expose({
      treeRef,
      onNodeExpand: (...args) => {
        treeRef.value?.onNodeExpand(...args)
      },
      scrollTo,
      selectedKeys: computed(() => treeRef.value?.selectedKeys),
      checkedKeys: computed(() => treeRef.value?.checkedKeys),
      halfCheckedKeys: computed(() => treeRef.value?.halfCheckedKeys),
      loadedKeys: computed(() => treeRef.value?.loadedKeys),
      loadingKeys: computed(() => treeRef.value?.loadingKeys),
      expandedKeys: computed(() => treeRef.value?.expandedKeys),
    })

    watchEffect(() => {
      devWarning(
        props.replaceFields === undefined,
        'Tree',
        '`replaceFields` is deprecated, please use fieldNames instead',
      )
    })

    const handleCheck: TreeProps['onCheck'] = (checkedObjOrKeys, eventObj) => {
      emit('update:checkedKeys', checkedObjOrKeys)
      emit('check', checkedObjOrKeys, eventObj)
    }
    const handleExpand: TreeProps['onExpand'] = (expandedKeys, eventObj) => {
      emit('update:expandedKeys', expandedKeys)
      emit('expand', expandedKeys, eventObj)
    }
    const handleSelect: TreeProps['onSelect'] = (selectedKeys, eventObj) => {
      emit('update:selectedKeys', selectedKeys)
      emit('select', selectedKeys, eventObj)
    }
    return () => {
      const {
        showIcon,
        showLine,
        switcherIcon = slots.switcherIcon,
        icon = slots.icon,
        blockNode,
        checkable,
        selectable,
        fieldNames = props.replaceFields,
        motion = props.openAnimation,
        itemHeight = 28,
        onDoubleclick,
        onDblclick,
      } = props as TreeProps
      const newProps = {
        ...attrs,
        ...omit(props, [
          'onUpdate:checkedKeys',
          'onUpdate:expandedKeys',
          'onUpdate:selectedKeys',
          'onDoubleclick',
        ]),
        showLine: Boolean(showLine),
        dropIndicatorRender,
        fieldNames,
        icon,
        itemHeight,
      }
      const children = slots.default ? filterEmpty(slots.default()) : undefined
      return wrapSSR(
        <VcTree
          {...newProps}
          virtual={virtual.value}
          motion={motion}
          ref={treeRef}
          prefixCls={prefixCls.value}
          class={classNames(
            {
              [`${prefixCls.value}-icon-hide`]: !showIcon,
              [`${prefixCls.value}-block-node`]: blockNode,
              [`${prefixCls.value}-unselectable`]: !selectable,
              [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
            },
            attrs.class,
            hashId.value,
          )}
          direction={direction.value}
          checkable={checkable}
          selectable={selectable}
          switcherIcon={(nodeProps: SwitcherIconProps) =>
            renderSwitcherIcon(prefixCls.value, switcherIcon, nodeProps, slots.leafIcon, showLine)
          }
          onCheck={handleCheck}
          onExpand={handleExpand}
          onSelect={handleSelect}
          onDblclick={onDblclick || onDoubleclick}
          v-slots={{
            ...slots,
            checkable: () => <span class={`${prefixCls.value}-checkbox-inner`} />,
          }}
          children={children}
        ></VcTree>,
      )
    }
  },
})
