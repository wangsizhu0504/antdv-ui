import type { CustomSlotsType } from '@antdv/types';
import type { FormItemStatusContextProps } from './FormItemContext';
import type { Rule, RuleError, RuleObject, ValidateOptions } from './interface';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons-vue';
import { classNames, filterEmpty, toArray, warning } from '@antdv/utils';
import { cloneDeep, find } from 'lodash-es';
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  shallowRef,
  toRaw,
  watch,
  watchEffect,
} from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { Row } from '../../grid';
import useStyle from '../style';
import { useInjectForm } from './context';
import { FormItemInputContext, useProvideFormItemContext } from './FormItemContext';
import FormItemInput from './FormItemInput';
import FormItemLabel from './FormItemLabel';
import { formItemProps } from './props';
import useDebounce from './utils/useDebounce';
import { validateRules as validateRulesUtil } from './utils/validateUtil';
import { getNamePath } from './utils/valueUtil';

const iconMap: { [key: string]: any } = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

function getPropByPath(obj: any, namePathList: any, strict?: boolean) {
  let tempObj = obj;

  const keyArr = namePathList;
  let i = 0;
  try {
    for (let len = keyArr.length; i < len - 1; ++i) {
      if (!tempObj && !strict) break;
      const key = keyArr[i];
      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        if (strict)
          throw new Error('please transfer a valid name path to form item!');

        break;
      }
    }
    if (strict && !tempObj)
      throw new Error('please transfer a valid name path to form item!');
  } catch (error) {
    console.error('please transfer a valid name path to form item!');
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : undefined,
  };
}

let indexGuid = 0;

// default form item id prefix.
const defaultItemNamePrefixCls = 'form_item';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AFormItem',
  inheritAttrs: false,
  __ANT_NEW_FORM_ITEM: true,
  props: formItemProps(),
  slots: Object as CustomSlotsType<{
    help: any
    label: any
    extra: any
    default: any
    tooltip: any
  }>,
  setup(props, { slots, attrs, expose }) {
    warning(props.prop === undefined, '`prop` is deprecated. Please use `name` instead.');
    const eventKey = `form-item-${++indexGuid}`;
    const { prefixCls } = useConfigInject('form', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const itemRef = shallowRef<HTMLDivElement>();
    const formContext = useInjectForm();
    const fieldName = computed(() => props.name || props.prop);
    const errors = shallowRef([]);
    const validateDisabled = shallowRef(false);
    const inputRef = shallowRef();
    const namePath = computed(() => {
      const val = fieldName.value;
      return getNamePath(val);
    });

    const fieldId = computed(() => {
      if (!namePath.value.length) {
        return undefined;
      } else {
        const formName = formContext.name.value;
        const mergedId = namePath.value.join('_');
        return formName ? `${formName}_${mergedId}` : `${defaultItemNamePrefixCls}_${mergedId}`;
      }
    });
    const getNewFieldValue = () => {
      const model = formContext.model.value;
      if (model && fieldName.value)
        return getPropByPath(model, namePath.value, true).v;
    };
    const fieldValue = computed(() => getNewFieldValue());

    const initialValue = shallowRef(cloneDeep(fieldValue.value));
    const mergedValidateTrigger = computed(() => {
      let validateTrigger
        = props.validateTrigger !== undefined
          ? props.validateTrigger
          : formContext.validateTrigger.value;
      validateTrigger = validateTrigger === undefined ? 'change' : validateTrigger;
      return toArray(validateTrigger);
    });
    const rulesRef = computed<Rule[]>(() => {
      let formRules = formContext.rules.value;
      const selfRules = props.rules;
      const requiredRule
        = props.required !== undefined
          ? { required: !!props.required, trigger: mergedValidateTrigger.value }
          : [];
      const prop = getPropByPath(formRules, namePath.value);
      formRules = formRules ? (prop.o[prop.k] || prop.v) : [];
      const rules = [].concat(selfRules || formRules || []);
      if (find(rules, rule => rule.required))
        return rules;
      else
        return rules.concat(requiredRule);
    });
    const getIsRequired = computed(() => {
      const rules = rulesRef.value;
      let isRequired = false;
      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired || props.required;
    });

    const validateState = shallowRef();
    watchEffect(() => {
      validateState.value = props.validateStatus;
    });
    const messageVariables = computed(() => {
      let variables: Record<string, string> = {};
      if (typeof props.label === 'string')
        variables.label = props.label;
      else if (props.name)
        variables.label = String(props.name);

      if (props.messageVariables)
        variables = { ...variables, ...props.messageVariables };

      return variables;
    });
    const validateRules = (options: ValidateOptions) => {
      // no name, no value, so the validate result is incorrect
      if (namePath.value.length === 0)
        return;

      const { validateFirst = false } = props;
      const { triggerName } = options || {};

      let filteredRules = rulesRef.value;
      if (triggerName) {
        filteredRules = filteredRules.filter((rule) => {
          const { trigger } = rule;
          if (!trigger && !mergedValidateTrigger.value.length)
            return true;

          const triggerList = toArray(trigger || mergedValidateTrigger.value);
          return triggerList.includes(triggerName);
        });
      }
      if (!filteredRules.length)
        return Promise.resolve();

      const promise = validateRulesUtil(
        namePath.value,
        fieldValue.value,
        filteredRules as RuleObject[],
        {
          validateMessages: formContext.validateMessages.value,
          ...options,
        },
        validateFirst,
        messageVariables.value,
      );
      validateState.value = 'validating';
      errors.value = [];

      promise
        .catch(e => e)
        .then((results: RuleError[] = []) => {
          if (validateState.value === 'validating') {
            const res = results.filter(result => result && result.errors.length);
            validateState.value = res.length ? 'error' : 'success';

            errors.value = res.map(r => r.errors);

            formContext.onValidate(
              fieldName.value,
              !errors.value.length,
              errors.value.length ? toRaw(errors.value[0]) : null,
            );
          }
        });

      return promise;
    };

    const onFieldBlur = () => {
      validateRules({ triggerName: 'blur' });
    };
    const onFieldChange = () => {
      if (validateDisabled.value) {
        validateDisabled.value = false;
        return;
      }
      validateRules({ triggerName: 'change' });
    };
    const clearValidate = () => {
      validateState.value = props.validateStatus;
      validateDisabled.value = false;
      errors.value = [];
    };

    const resetField = () => {
      validateState.value = props.validateStatus;
      validateDisabled.value = true;
      errors.value = [];
      const model = formContext.model.value || {};
      const value = fieldValue.value;
      const prop = getPropByPath(model, namePath.value, true);
      if (Array.isArray(value))
        prop.o[prop.k] = [].concat(initialValue.value ?? []);
      else
        prop.o[prop.k] = initialValue.value;

      // reset validateDisabled after onFieldChange triggered
      nextTick(() => {
        validateDisabled.value = false;
      });
    };
    const htmlFor = computed(() => {
      return props.htmlFor === undefined ? fieldId.value : props.htmlFor;
    });
    const onLabelClick = () => {
      const id = htmlFor.value;
      if (!id || !inputRef.value)
        return;

      const control = inputRef.value.$el.querySelector(`[id="${id}"]`);
      if (control && control.focus)
        control.focus();
    };
    expose({
      onFieldBlur,
      onFieldChange,
      clearValidate,
      resetField,
    });

    useProvideFormItemContext(
      {
        id: fieldId,
        onFieldBlur: () => {
          if (props.autoLink)
            onFieldBlur();
        },
        onFieldChange: () => {
          if (props.autoLink)
            onFieldChange();
        },
        clearValidate,
      },
      computed(() => {
        return !!(props.autoLink && formContext.model.value && fieldName.value);
      }),
    );
    let registered = false;
    watch(
      fieldName,
      (val) => {
        if (val) {
          if (!registered) {
            registered = true;
            formContext.addField(eventKey, {
              fieldValue,
              fieldId,
              fieldName,
              resetField,
              clearValidate,
              namePath,
              validateRules,
              rules: rulesRef,
            });
          }
        } else {
          registered = false;
          formContext.removeField(eventKey);
        }
      },
      { immediate: true },
    );
    onBeforeUnmount(() => {
      formContext.removeField(eventKey);
    });
    const debounceErrors = useDebounce(errors);
    const mergedValidateStatus = computed(() => {
      if (props.validateStatus !== undefined)
        return props.validateStatus;
      else if (debounceErrors.value.length)
        return 'error';

      return validateState.value;
    });
    const itemClassName = computed(() => ({
      [`${prefixCls.value}-item`]: true,
      [hashId.value]: true,
      // Status
      [`${prefixCls.value}-item-has-feedback`]: mergedValidateStatus.value && props.hasFeedback,
      [`${prefixCls.value}-item-has-success`]: mergedValidateStatus.value === 'success',
      [`${prefixCls.value}-item-has-warning`]: mergedValidateStatus.value === 'warning',
      [`${prefixCls.value}-item-has-error`]: mergedValidateStatus.value === 'error',
      [`${prefixCls.value}-item-is-validating`]: mergedValidateStatus.value === 'validating',
      [`${prefixCls.value}-item-hidden`]: props.hidden,
    }));
    const formItemInputContext = reactive<FormItemStatusContextProps>({});
    FormItemInputContext.useProvide(formItemInputContext);
    watchEffect(() => {
      let feedbackIcon: any;
      if (props.hasFeedback) {
        const IconNode = mergedValidateStatus.value && iconMap[mergedValidateStatus.value];
        feedbackIcon = IconNode
          ? (
              <span
                class={classNames(
                  `${prefixCls.value}-item-feedback-icon`,
                  `${prefixCls.value}-item-feedback-icon-${mergedValidateStatus.value}`,
                )}
              >
                <IconNode />
              </span>
            )
          : null;
      }
      Object.assign(formItemInputContext, {
        status: mergedValidateStatus.value,
        hasFeedback: props.hasFeedback,
        feedbackIcon,
        isFormItemInput: true,
      });
    });

    const marginBottom = shallowRef<number>(null);
    const showMarginOffset = shallowRef(false);
    const updateMarginBottom = () => {
      if (itemRef.value) {
        const itemStyle = getComputedStyle(itemRef.value);
        marginBottom.value = Number.parseInt(itemStyle.marginBottom, 10);
      }
    };
    onMounted(() => {
      watch(
        showMarginOffset,
        () => {
          if (showMarginOffset.value)
            updateMarginBottom();
        },
        { flush: 'post', immediate: true },
      );
    });

    const onErrorVisibleChanged = (nextVisible: boolean) => {
      if (!nextVisible)
        marginBottom.value = null;
    };
    return () => {
      if (props.noStyle) return slots.default?.();
      const help = props.help ?? (slots.help ? filterEmpty(slots.help()) : null);
      const withHelp = !!(
        (help !== undefined && help !== null && Array.isArray(help) && help.length)
        || debounceErrors.value.length
      );
      showMarginOffset.value = withHelp;
      return wrapSSR(
        <div
          class={[
            itemClassName.value,
            withHelp ? `${prefixCls.value}-item-with-help` : '',
            attrs.class,
          ]}
          ref={itemRef}
        >
          <Row
            {...attrs}
            class={`${prefixCls.value}-item-row`}
            key="row"
            v-slots={{
              default: () => (
                <>
                  {/* Label */}
                  <FormItemLabel
                    {...props}
                    htmlFor={htmlFor.value}
                    required={getIsRequired.value}
                    requiredMark={formContext.requiredMark.value}
                    prefixCls={prefixCls.value}
                    onClick={onLabelClick}
                    label={props.label}
                    v-slots={{ label: slots.label, tooltip: slots.tooltip }}
                  />
                  {/* Input Group */}
                  <FormItemInput
                    {...props}
                    errors={
                      (help !== undefined && help !== null) ? toArray(help) : debounceErrors.value
                    }
                    marginBottom={marginBottom.value}
                    prefixCls={prefixCls.value}
                    status={mergedValidateStatus.value}
                    ref={inputRef}
                    help={help}
                    extra={props.extra ?? slots.extra?.()}
                    v-slots={{ default: slots.default }}
                    onErrorVisibleChanged={onErrorVisibleChanged}
                  >
                  </FormItemInput>
                </>
              ),
            }}
          >
          </Row>
          {!!marginBottom.value && (
            <div
              class={`${prefixCls.value}-margin-offset`}
              style={{
                marginBottom: `-${marginBottom.value}px`,
              }}
            />
          )}
        </div>,
      );
    };
  },
});
