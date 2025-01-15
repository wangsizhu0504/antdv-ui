import type { ComponentDemo } from '../../interface';
import { Button, Popover } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    const content = () => (
      <div>
        <p>Content</p>
        {' '}
        <p>Content</p>
      </div>
    );

    return () => {
      return (
        <div>
          <Popover v-slots={{ content }} title="Title">
            <Button type="primary">Hover me</Button>
          </Popover>
        </div>
      );
    };
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated'],
  key: 'default',
};

export default componentDemo;
