import type { ComponentDemo } from '../../interface';
import { Checkbox } from '@antdv/ui';

const Demo = () => <Checkbox disabled>Checkbox</Checkbox>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled', 'colorBgContainerDisabled'],
  key: 'disabled',
};

export default componentDemo;
