import { computed, defineComponent, ref, watchEffect } from 'vue'
import { classNames, devWarning, filterEmpty, initDefaultProps, omit } from '@antdv/utils'
import type { SlotsType } from 'vue'

import { VcTree } from '@antdv/vue-components'
import type { ScrollTo } from '@antdv/vue-components/vc-virtual-list/src/List'
import type { DraggableConfig } from '@antdv/vue-components/vc-tree/src/Tree'
import { HolderOutlined } from '@ant-design/icons-vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import renderSwitcherIcon from './utils/iconUtil'
import dropIndicatorRender from './utils/dropIndicator'
import { treeProps } from './props'
import type { TreeProps } from './props'
import type { SwitcherIconProps } from './utils/iconUtil'

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
    devWarning(
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
        draggable,
      } = props as TreeProps
      const newProps = {
        ...attrs,
        ...omit(props, [
          'onUpdate:checkedKeys',
          'onUpdate:expandedKeys',
          'onUpdate:selectedKeys',
          'onDoubleclick',
          'draggable',
        ]),
        showLine: Boolean(showLine),
        dropIndicatorRender,
        fieldNames,
        icon,
        itemHeight,
      }
      const children = slots.default ? filterEmpty(slots.default()) : undefined
      const draggableConfigFunc = () => {
        if (!draggable)
          return false

        let mergedDraggable: DraggableConfig = {}
        switch (typeof draggable) {
          case 'function':
            mergedDraggable.nodeDraggable = draggable
            break
          case 'object':
            mergedDraggable = { ...(draggable as DraggableConfig) }
            break
          default:
            break
          // Do nothing
        }

        if (mergedDraggable.icon !== false)
          mergedDraggable.icon = mergedDraggable.icon || <HolderOutlined />

        return mergedDraggable
      }
      const draggableConfig = draggableConfigFunc()
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
          draggable={draggableConfig}
          direction={direction.value}
          checkable={checkable}
          selectable={selectable}
          switcherIcon={(nodeProps: SwitcherIconProps) =>
            renderSwitcherIcon(prefixCls.value, switcherIcon, nodeProps, slots.leafIcon, showLine)}
          onCheck={handleCheck}
          onExpand={handleExpand}
          onSelect={handleSelect}
          onDblclick={onDblclick || onDoubleclick}
          v-slots={{
            ...slots,
            checkable: () => <span class={`${prefixCls.value}-checkbox-inner`} />,
          }}
          children={children}
        >
        </VcTree>,
      )
    }
  },
})
