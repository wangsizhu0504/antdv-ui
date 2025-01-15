import type { ComponentDemo } from '../../interface';
import { DatePicker } from '@antdv/ui';

const Demo = () => <DatePicker />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorIcon', 'colorIconHover'],
  key: 'icon',
};

export default componentDemo;
