import type { ComponentDemo } from '../../interface';
import { Button, message } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    const warning = () => {
      message.warning('This is an warning message');
    };

    return () => <Button onClick={warning}>Warning</Button>;
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning'],
  key: 'warning',
};

export default componentDemo;
