export interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

export interface MentionsOptionProps {
  value: string;
  disabled?: boolean;
  label?: string | number | ((o: MentionsOptionProps) => any);
  [key: string]: any;
}

export interface MentionsEntity {
  prefix: string;
  value: string;
}

export type MentionPlacement = 'top' | 'bottom'
