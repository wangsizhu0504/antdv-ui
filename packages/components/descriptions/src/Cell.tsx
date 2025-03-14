import type { FunctionalComponent } from 'vue';
import type { CellProps } from './interface';

function notEmpty(val: any) {
  return val !== undefined && val !== null;
}

const Cell: FunctionalComponent<CellProps> = (props) => {
  const {
    itemPrefixCls,
    component,
    span,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
  } = props;
  const Component = component as any;
  if (bordered) {
    return (
      <Component
        class={[
          {
            [`${itemPrefixCls}-item-label`]: notEmpty(label),
            [`${itemPrefixCls}-item-content`]: notEmpty(content),
          },
        ]}
        colSpan={span}
      >
        {notEmpty(label) && <span style={labelStyle}>{label}</span>}
        {notEmpty(content) && <span style={contentStyle}>{content}</span>}
      </Component>
    );
  }

  return (
    <Component class={[`${itemPrefixCls}-item`]} colSpan={span}>
      <div class={`${itemPrefixCls}-item-container`}>
        {(label || label === 0) && (
          <span
            class={[
              `${itemPrefixCls}-item-label`,
              {
                [`${itemPrefixCls}-item-no-colon`]: !colon,
              },
            ]}
            style={labelStyle}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span class={`${itemPrefixCls}-item-content`} style={contentStyle}>
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
