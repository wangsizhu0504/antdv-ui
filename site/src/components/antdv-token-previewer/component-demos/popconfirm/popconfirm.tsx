import type { ComponentDemo } from '../../interface';
import { message, Popconfirm } from '@antdv/ui';
import { defineComponent } from 'vue';

function confirm() {
  message.success('Click on Yes');
}
function cancel() {
  message.error('Click on No');
}
const Demo = defineComponent({
  setup() {
    return () => (
      <div
        style={{
          width: '260px',
          paddingTop: '80px',
        }}
      >
        <Popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          onConfirm={confirm}
          onCancel={cancel}
          placement="topLeft"
          getPopupContainer={(node) => {
            if (node)
              return node.parentNode as HTMLElement;

            return document.body;
          }}
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </div>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated', 'colorWarning'],
  key: 'default',
};

export default componentDemo;
