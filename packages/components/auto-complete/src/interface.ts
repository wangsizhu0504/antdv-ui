import type { FunctionalComponent } from 'vue'
import type { VcSelectDefaultOptionType } from '@antdv/vue-components'

export type OptGroupProps = Omit<VcSelectDefaultOptionType, 'options'>

export interface OptionGroupFC extends FunctionalComponent<OptGroupProps> {
  /** Legacy for check if is a Option Group */
  isSelectOptGroup: boolean
}

interface OptionProps extends Omit<VcSelectDefaultOptionType, 'label'> {
  /** Save for customize data */
  [prop: string]: any
}

export interface OptionFC extends FunctionalComponent<OptionProps> {
  /** Legacy for check if is a Option Group */
  isSelectOption: boolean
}
