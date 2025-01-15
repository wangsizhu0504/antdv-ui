import type { ComponentDemo } from '../../interface';
import { Pagination, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <Pagination showQuickJumper defaultCurrent={2} total={500} />

        <Pagination simple />
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorPrimaryHover', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
