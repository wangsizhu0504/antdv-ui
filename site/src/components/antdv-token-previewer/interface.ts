import type { VueNode } from '@antdv/ui/es/_utils/types';
import type { ThemeConfig } from '@antdv/ui/es/config-provider';

export interface Theme {
  name: string
  key: string
  config: ThemeConfig
}

export type AliasToken = Exclude<ThemeConfig['token'], undefined>;
export type TokenValue = string | number | string[] | number[] | boolean;
export type TokenName = keyof AliasToken;

// 修改线  以上都是改过的
export interface ComponentDemo {
  tokens?: TokenName[]
  demo: VueNode
  key: string
}

export interface MutableTheme extends Theme {
  onThemeChange?: (newTheme: ThemeConfig, path: string[]) => void
  onReset?: (path: string[]) => void
  getCanReset?: (path: string[]) => boolean
}

export interface PreviewerProps {
  onSave?: (themeConfig: ThemeConfig) => void
  showTheme?: boolean
  theme?: Theme
  onThemeChange?: (config: ThemeConfig) => void
}

export interface SelectedToken {
  seed?: string[]
  map?: string[]
  alias?: string[]
}
