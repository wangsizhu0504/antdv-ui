import type { ComponentDemo } from '../../interface';
import { TreeSelect } from '@antdv/ui';
import { defineComponent, ref } from 'vue';

const { TreeNode } = TreeSelect;

const Demo = defineComponent({
  setup() {
    const treeValue = ref<any>(undefined);
    const onChange = (value) => {
      treeValue.value = value;
    };
    return () => {
      return (
        <TreeSelect
          disabled
          showSearch
          style={{ width: '100%' }}
          value={treeValue.value}
          dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={onChange}
        >
          <TreeNode value="parent 1" title="parent 1">
            <TreeNode value="parent 1-0" title="parent 1-0">
              <TreeNode value="leaf1" title="leaf1" />
              <TreeNode value="leaf2" title="leaf2" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1">
              <TreeNode value="leaf3" title="leaf3" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      );
    };
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled', 'colorBgContainerDisabled'],
  key: 'disabled',
};

export default componentDemo;
