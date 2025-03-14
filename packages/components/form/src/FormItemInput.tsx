import type { CustomSlotsType } from '@antdv/types';
import type { HTMLAttributes } from 'vue';
import type { ColProps } from '../../grid';
import { classNames, filterEmpty } from '@antdv/utils';
import { computed, defineComponent } from 'vue';
import { Col } from '../../grid';
import { useInjectForm, useProvideForm, useProvideFormItemPrefix } from './context';
import ErrorList from './ErrorList';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FormItemInput',
  slots: Object as CustomSlotsType<{
    help: any
    errors: any
    extra: any
    default: any
  }>,
  inheritAttrs: false,
  props: [
    'prefixCls',
    'errors',
    'hasFeedback',
    'onDomErrorVisibleChange',
    'wrapperCol',
    'help',
    'extra',
    'status',
    'marginBottom',
    'onErrorVisibleChanged',
  ],
  setup(props, { slots }) {
    const formContext = useInjectForm();
    const { wrapperCol: contextWrapperCol } = formContext;

    // Pass to sub FormItem should not with col info
    const subFormContext = { ...formContext };
    delete subFormContext.labelCol;
    delete subFormContext.wrapperCol;
    useProvideForm(subFormContext);
    useProvideFormItemPrefix({
      prefixCls: computed(() => props.prefixCls),
      status: computed(() => props.status),
    });

    return () => {
      const {
        prefixCls,
        wrapperCol,
        marginBottom,
        onErrorVisibleChanged,
        help = slots.help?.(),
        errors = filterEmpty(slots.errors?.()),
        // hasFeedback,
        // status,
        extra = slots.extra?.(),
      } = props;
      const baseClassName = `${prefixCls}-item`;

      const mergedWrapperCol: ColProps & HTMLAttributes
        = wrapperCol || contextWrapperCol?.value || {};

      const className = classNames(`${baseClassName}-control`, mergedWrapperCol.class);

      // Should provides additional icon if `hasFeedback`
      // const IconNode = status && iconMap[status];
      return (
        <Col
          {...mergedWrapperCol}
          class={className}
          v-slots={{
            default: () => (
              <>
                <div class={`${baseClassName}-control-input`}>
                  <div class={`${baseClassName}-control-input-content`}>{slots.default?.()}</div>
                </div>
                {marginBottom !== null || errors.length
                  ? (
                      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <ErrorList
                          errors={errors}
                          help={help}
                          class={`${baseClassName}-explain-connected`}
                          onErrorVisibleChanged={onErrorVisibleChanged}
                        />
                        {!!marginBottom && <div style={{ width: 0, height: `${marginBottom}px` }} />}
                      </div>
                    )
                  : null}
                {extra ? <div class={`${baseClassName}-extra`}>{extra}</div> : null}
              </>
            ),
          }}
        >
        </Col>
      );
    };
  },
});
