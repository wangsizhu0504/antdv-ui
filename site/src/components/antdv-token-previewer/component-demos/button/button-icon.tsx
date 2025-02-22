import type { ComponentDemo } from '../../interface';
import { SearchOutlined } from '@ant-design/icons-vue';
import { Button, Space, Tooltip } from '@antdv/ui';

import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space>
        <Button type="primary">Primary Button</Button>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="primary" shape="circle">
          A
        </Button>
        <Button type="primary" ghost icon={<SearchOutlined />}>
          Search
        </Button>
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
  key: 'button-icon',
};

export default componentDemo;
