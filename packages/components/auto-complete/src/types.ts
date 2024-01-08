import type { FunctionalComponent } from 'vue'
import type { DefaultVcSelectOptionType } from '@antdv/vue-components'

export type OptGroupProps = Omit<DefaultVcSelectOptionType, 'options'>

export interface OptionGroupFC extends FunctionalComponent<OptGroupProps> {
  /** Legacy for check if is a Option Group */
  isSelectOptGroup: boolean
}

interface OptionProps extends Omit<DefaultVcSelectOptionType, 'label'> {
  /** Save for customize data */
  [prop: string]: any
}

export interface OptionFC extends FunctionalComponent<OptionProps> {
  /** Legacy for check if is a Option Group */
  isSelectOption: boolean
}
