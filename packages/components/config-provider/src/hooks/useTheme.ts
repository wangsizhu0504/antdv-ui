import type { Ref } from 'vue';
import type { ThemeConfig } from '../interface';
import { devWarning } from '@antdv/utils';
import { computed } from 'vue';
import { defaultConfig } from '../../../theme/internal';
import useThemeKey from './useThemeKey';

export default function useTheme(
  theme?: Ref<ThemeConfig>,
  parentTheme?: Ref<ThemeConfig>,
  config?: Ref<{
    prefixCls?: string;
  }>,
) {
  const themeConfig = computed((): ThemeConfig => theme?.value || {});
  const parentThemeConfig = computed<ThemeConfig>(() =>
    themeConfig.value.inherit === false || !parentTheme?.value
      ? {
          ...defaultConfig,
          hashed: parentTheme.value?.hashed ?? defaultConfig.hashed,
          cssVar: parentTheme.value?.cssVar,
        }
      : parentTheme.value,
  );
  const themeKey = useThemeKey();
  if (process.env.NODE_ENV !== 'production') {
    const cssVarEnabled = themeConfig.value.cssVar || parentThemeConfig.value.cssVar;
    const validKey = !!(
      (typeof themeConfig.value.cssVar === 'object' && themeConfig.value.cssVar?.key)
      || themeKey
    );
    devWarning(
      !cssVarEnabled || validKey,
      'breaking',
      'Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.',
    );
  }

  const mergedTheme = computed(() => {
    if (!theme?.value)
      return parentTheme?.value;

    // Override
    const mergedComponents = {
      ...parentThemeConfig.value.components,
    };

    Object.keys(theme.value.components || {}).forEach((componentName) => {
      mergedComponents[componentName] = {
        ...mergedComponents[componentName],
        ...theme.value.components![componentName],
      } as any;
    });

    const cssVarKey = `css-var-${themeKey.replace(/:/g, '')}`;
    const mergedCssVar = (themeConfig.value.cssVar ?? parentThemeConfig.value.cssVar) && {
      prefix: config.value?.prefixCls, // Same as prefixCls by default
      ...(typeof parentThemeConfig.value.cssVar === 'object' ? parentThemeConfig.value.cssVar : {}),
      ...(typeof themeConfig.value.cssVar === 'object' ? themeConfig.value.cssVar : {}),
      key: (typeof themeConfig.value.cssVar === 'object' && themeConfig.value.cssVar?.key) || cssVarKey,
    };

    // Base token
    return {
      ...parentThemeConfig.value,
      ...themeConfig.value,

      token: {
        ...parentThemeConfig.value.token,
        ...themeConfig.value.token,
      },
      components: mergedComponents,
      cssVar: mergedCssVar,
    };
  });

  return mergedTheme;
}
