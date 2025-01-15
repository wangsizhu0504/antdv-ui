import type { CSSProperties, FunctionalComponent, VNode } from 'vue'
import type { CellConfig, DescRowProps } from './interface'
import { getClass, getSlot, getStyle } from '@antdv/utils'
import Cell from './Cell'
import { useProviderContext } from './useContext'

const Row: FunctionalComponent<DescRowProps> = (props) => {
  const renderCells = (
    items: VNode[],
    { colon, prefixCls, bordered },
    {
      component,
      type,
      showLabel,
      showContent,
      labelStyle: rootLabelStyle,
      contentStyle: rootContentStyle,
    }: CellConfig & { labelStyle?: CSSProperties, contentStyle?: CSSProperties },
  ) => {
    return items.map((item, index) => {
      const itemProps = item.props || {}
      const {
        prefixCls: itemPrefixCls = prefixCls,
        span = 1,
        labelStyle = itemProps['label-style'],
        contentStyle = itemProps['content-style'],
        label = (item.children as any)?.label?.(),
      } = itemProps
      const children = getSlot(item)
      const className = getClass(item)
      const style = getStyle(item)
      const { key } = item
      if (typeof component === 'string') {
        return (
          <Cell
            key={`${type}-${String(key) || index}`}
            class={className}
            style={style}
            labelStyle={{ ...rootLabelStyle, ...labelStyle }}
            contentStyle={{ ...rootContentStyle, ...contentStyle }}
            span={span}
            colon={colon}
            component={component}
            itemPrefixCls={itemPrefixCls}
            bordered={bordered}
            label={showLabel ? label : null}
            content={showContent ? children : null}
          />
        )
      }

      return [
        <Cell
          key={`label-${String(key) || index}`}
          class={className}
          style={{ ...rootLabelStyle, ...style, ...labelStyle }}
          span={1}
          colon={colon}
          component={component[0]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          label={label}
        />,
        <Cell
          key={`content-${String(key) || index}`}
          class={className}
          style={{ ...rootContentStyle, ...style, ...contentStyle }}
          span={span * 2 - 1}
          component={component[1]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          content={children}
        />,
      ]
    })
  }

  const { prefixCls, vertical, row, index, bordered } = props
  const { labelStyle, contentStyle } = useProviderContext()
  if (vertical) {
    return (
      <>
        <tr key={`label-${index}`} class={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'th',
            type: 'label',
            showLabel: true,
            labelStyle: labelStyle.value,
            contentStyle: contentStyle.value,
          })}
        </tr>
        <tr key={`content-${index}`} class={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
            labelStyle: labelStyle.value,
            contentStyle: contentStyle.value,
          })}
        </tr>
      </>
    )
  }

  return (
    <tr key={index} class={`${prefixCls}-row`}>
      {renderCells(row, props, {
        component: bordered ? ['th', 'td'] : 'td',
        type: 'item',
        showLabel: true,
        showContent: true,
        labelStyle: labelStyle.value,
        contentStyle: contentStyle.value,
      })}
    </tr>
  )
}

export default Row
