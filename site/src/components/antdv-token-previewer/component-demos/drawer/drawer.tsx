import type { ComponentDemo } from '../../interface';
import { Button, Drawer } from '@antdv/ui';
import { defineComponent, ref } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => {
      const visible = ref<any>(false);

      const showDrawer = () => {
        visible.value = true;
      };

      const onClose = () => {
        visible.value = false;
      };

      return (
        <>
          <Button type="primary" onClick={showDrawer}>
            Open
          </Button>
          <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={visible.value}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </>
      );
    };
  },
});
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgMask', 'colorBgElevated'],
  key: 'default',
};

export default componentDemo;
