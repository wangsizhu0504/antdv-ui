import type { PanelMode, PanelSharedProps } from '../../interface';
import useMergeProps from '../../hooks/useMergeProps';
import { createKeydownHandler } from '../../utils/uiUtil';
import { YEAR_DECADE_COUNT } from './constant';
import YearBody, { YEAR_COL_COUNT } from './YearBody';
import YearHeader from './YearHeader';

export type YearPanelProps<DateType> = {
  sourceMode: PanelMode;
} & PanelSharedProps<DateType>;

function YearPanel<DateType>(_props: YearPanelProps<DateType>) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    sourceMode,
    onSelect,
    onPanelChange,
  } = props;

  const panelPrefixCls = `${prefixCls}-year-panel`;

  // ======================= Keyboard =======================
  operationRef.value = {
    onKeydown: (event: KeyboardEvent) =>
      createKeydownHandler(event, {
        onLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_DECADE_COUNT), 'key');
        },
        onUpDown: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_COL_COUNT), 'key');
        },
        onEnter: () => {
          onPanelChange(sourceMode === 'date' ? 'date' : 'month', value || viewDate);
        },
      }),
  };

  // ==================== View Operation ====================
  const onDecadeChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff * 10);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return (
    <div class={panelPrefixCls}>
      <YearHeader
        {...props}
        prefixCls={prefixCls}
        onPrevDecade={() => {
          onDecadeChange(-1);
        }}
        onNextDecade={() => {
          onDecadeChange(1);
        }}
        onDecadeClick={() => {
          onPanelChange('decade', viewDate);
        }}
      />
      <YearBody
        {...props}
        prefixCls={prefixCls}
        onSelect={(date) => {
          onPanelChange(sourceMode === 'date' ? 'date' : 'month', date);
          onSelect(date, 'mouse');
        }}
      />
    </div>
  );
}

YearPanel.displayName = 'YearPanel';
YearPanel.inheritAttrs = false;

export default YearPanel;
