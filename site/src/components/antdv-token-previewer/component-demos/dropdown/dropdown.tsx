import type { ComponentDemo } from '../../interface';
import { DownOutlined } from '@ant-design/icons-vue';
import { Dropdown } from '@antdv/ui';

import { defineComponent } from 'vue';
import menu from './menu';

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Dropdown
          v-slots={{
            overlay: () => menu,
          }}
        >
          <a class="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Hover me
            {' '}
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorError', 'colorErrorHover', 'colorBgElevated'],
  key: 'default',
};

export default componentDemo;
