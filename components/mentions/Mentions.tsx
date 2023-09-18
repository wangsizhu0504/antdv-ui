import { computed, defineComponent, shallowRef, watch } from 'vue'
import classNames from '../_util/classNames'
import VcMentions from '../vc-mentions'
import { useConfigInject } from '../hooks'
import { flattenChildren, getOptionProps } from '../_util/props-util'
import { FormItemInputContext, useInjectFormItemContext } from '../form/FormItemContext'
import omit from '../_util/omit'
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils'
import { useProvideOverride } from '../menu/src/OverrideContext'
import warning from '../_util/warning'
import Spin from '../spin'
import devWarning from '../vc-util/devWarning'
import useStyle from './style'
import { mentionsProps } from './props'
import type { MentionsOptionProps } from './types'
import type { CustomSlotsType } from '../_util/type'

function loadingFilterOption() {
  return true
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AMentions',
  inheritAttrs: false,
  props: mentionsProps(),
  slots: Object as CustomSlotsType<{
    notFoundContent?: any
    option?: any
    default?: any
  }>,
  setup(props, { slots, emit, attrs, expose }) {
    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        !flattenChildren(slots.default?.() || []).length,
        'Mentions',
        '`Mentions.Option` is deprecated. Please use `options` instead.',
      )
    }
    const { prefixCls, renderEmpty, direction } = useConfigInject('mentions', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const focused = shallowRef(false)
    const vcMentions = shallowRef(null)
    const value = shallowRef(props.value ?? props.defaultValue ?? '')
    const formItemContext = useInjectFormItemContext()
    const formItemInputContext = FormItemInputContext.useInject()
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status))
    useProvideOverride({
      prefixCls: computed(() => `${prefixCls.value}-menu`),
      mode: computed(() => 'vertical'),
      selectable: computed(() => false),
      onClick: () => {},
      validator: ({ mode }) => {
        // Warning if use other mode
        warning(
          !mode || mode === 'vertical',
          'Mentions',
          `mode="${mode}" is not supported for Mentions's Menu.`,
        )
      },
    })
    watch(
      () => props.value,
      (val) => {
        value.value = val
      },
    )
    const handleFocus = (e: FocusEvent) => {
      focused.value = true
      emit('focus', e)
    }

    const handleBlur = (e: FocusEvent) => {
      focused.value = false
      emit('blur', e)
      formItemContext.onFieldBlur()
    }

    const handleSelect = (...args: [MentionsOptionProps, string]) => {
      emit('select', ...args)
      focused.value = true
    }

    const handleChange = (val: string) => {
      if (props.value === undefined)
        value.value = val

      emit('update:value', val)
      emit('change', val)
      formItemContext.onFieldChange()
    }

    const getNotFoundContent = () => {
      const notFoundContent = props.notFoundContent
      if (notFoundContent !== undefined)
        return notFoundContent

      if (slots.notFoundContent)
        return slots.notFoundContent()

      return renderEmpty('Select')
    }

    const getOptions = () => {
      return flattenChildren(slots.default?.() || []).map((item) => {
        return { ...getOptionProps(item), label: (item.children as any)?.default?.() }
      })
    }

    const focus = () => {
      (vcMentions.value as HTMLTextAreaElement).focus()
    }

    const blur = () => {
      (vcMentions.value as HTMLTextAreaElement).blur()
    }

    expose({ focus, blur })
    const mentionsfilterOption = computed(() =>
      props.loading ? loadingFilterOption : props.filterOption,
    )
    return () => {
      const {
        disabled,
        getPopupContainer,
        rows = 1,
        id = formItemContext.id.value,
        ...restProps
      } = props
      const { hasFeedback, feedbackIcon } = formItemInputContext
      const { class: className, ...otherAttrs } = attrs
      const otherProps = omit(restProps, ['defaultValue', 'onUpdate:value', 'prefixCls'])

      const mergedClassName = classNames(
        {
          [`${prefixCls.value}-disabled`]: disabled,
          [`${prefixCls.value}-focused`]: focused.value,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        getStatusClassNames(prefixCls.value, mergedStatus.value),
        !hasFeedback && className,
        hashId.value,
      )

      const mentionsProps = {
        prefixCls: prefixCls.value,
        ...otherProps,
        disabled,
        direction: direction.value,
        filterOption: mentionsfilterOption.value,
        getPopupContainer,
        options: props.loading
          ? [
              {
                value: 'ANTDV_SEARCHING',
                disabled: true,
                label: <Spin size="small" />,
              },
            ]
          : props.options || getOptions(),
        class: mergedClassName,
        ...otherAttrs,
        rows,
        onChange: handleChange,
        onSelect: handleSelect,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ref: vcMentions,
        value: value.value,
        id,
      }
      const mentions = (
        <VcMentions
          {...mentionsProps}
          dropdownClassName={hashId.value}
          v-slots={{ notFoundContent: getNotFoundContent, option: slots.option }}
        ></VcMentions>
      )
      if (hasFeedback) {
        return wrapSSR(
          <div
            class={classNames(
              `${prefixCls.value}-affix-wrapper`,
              getStatusClassNames(
                `${prefixCls.value}-affix-wrapper`,
                mergedStatus.value,
                hasFeedback,
              ),
              className,
              hashId.value,
            )}
          >
            {mentions}
            <span class={`${prefixCls.value}-suffix`}>{feedbackIcon}</span>
          </div>,
        )
      }
      return wrapSSR(mentions)
    }
  },
})
