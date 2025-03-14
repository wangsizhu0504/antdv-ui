import type { ComponentDemo } from '../../interface';
import { Transfer } from '@antdv/ui';

import { defineComponent, ref } from 'vue';

const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

const Demo = defineComponent({
  setup() {
    const targetKeys = ref<any>(initialTargetKeys);
    const selectedKeys = ref<string[]>([]);
    const onScroll = () => {};

    return () => {
      return (
        <Transfer
          dataSource={mockData}
          titles={['Source', 'Target']}
          targetKeys={targetKeys.value}
          status="warning"
          selectedKeys={selectedKeys.value}
          onChange={(nextTargetKeys) => {
            targetKeys.value = nextTargetKeys;
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            selectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
          }}
          onScroll={onScroll}
          render={item => item.title}
        />
      );
    };
  },
});
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
};

export default componentDemo;
