import { useId } from '@antdv/hooks';

const useEmptyId = () => '';

const useThemeKey = typeof useId === 'undefined' ? useEmptyId : useId;

export default useThemeKey;
