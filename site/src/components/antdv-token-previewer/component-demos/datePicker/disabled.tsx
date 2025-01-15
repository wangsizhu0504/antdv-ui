import type { ComponentDemo } from '../../interface';
import { DatePicker, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <DatePicker disabled />
        <DatePicker disabled picker="week" />
        <DatePicker disabled picker="month" />
        <DatePicker disabled picker="quarter" />
        <DatePicker disabled picker="year" />
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled', 'colorTextDisabled'],
  key: 'disabled',
};

export default componentDemo;
