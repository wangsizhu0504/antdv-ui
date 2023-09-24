import type { DefaultOptionType } from '../../_internal/select/Select'
import type { FunctionalComponent } from 'vue'

export type OptGroupProps = Omit<DefaultOptionType, 'options'>

export interface OptionGroupFC extends FunctionalComponent<OptGroupProps> {
  /** Legacy for check if is a Option Group */
  isSelectOptGroup: boolean
}

interface OptionProps extends Omit<DefaultOptionType, 'label'> {
  /** Save for customize data */
  [prop: string]: any
}

export interface OptionFC extends FunctionalComponent<OptionProps> {
  /** Legacy for check if is a Option Group */
  isSelectOption: boolean
}
