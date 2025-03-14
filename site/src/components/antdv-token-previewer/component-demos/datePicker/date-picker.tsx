import type { ComponentDemo } from '../../interface';
import { DatePicker, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <DatePicker picker="week" />
        <DatePicker picker="month" />
        <DatePicker picker="quarter" />
        <DatePicker picker="year" />
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorPrimary',
    'colorPrimaryBorder',
    'colorPrimaryHover',
    'controlOutline',
    'colorBgElevated',
    'colorBgContainer',
  ],
  key: 'default',
};

export default componentDemo;
