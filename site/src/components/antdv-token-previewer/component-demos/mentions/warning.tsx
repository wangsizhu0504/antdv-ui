import type { ComponentDemo } from '../../interface';
import { Mentions } from '@antdv/ui';
import { defineComponent } from 'vue';

function onChange() {}
function onSelect() {}

const Demo = defineComponent({
  setup() {
    const options = [
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ];
    return () => (
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        status="warning"
        defaultValue="@afc163"
        options={options}
      >
      </Mentions>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning', 'colorWarningBorder', 'colorWarningHover', 'colorWarningOutline'],
  key: 'warning',
};

export default componentDemo;
