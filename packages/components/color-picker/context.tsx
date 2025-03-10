import type { ComputedRef } from 'vue';
import type { PanelPickerProps } from './components/PanelPicker';
import type { PanelPresetsProps } from './components/PanelPresets';
import { inject } from 'vue';

export const PanelPickerContext = Symbol('PanelPickerContext');

export function usePanelPickerContext() {
  return inject<ComputedRef<PanelPickerProps>>(PanelPickerContext);
}

export const PanelPresetsContext = Symbol('PanelPresetsContext');

export function usePanelPresetsContext() {
  return inject<ComputedRef<PanelPresetsProps>>(PanelPresetsContext);
}
