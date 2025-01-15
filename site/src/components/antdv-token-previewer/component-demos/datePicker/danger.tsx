import type { ComponentDemo } from '../../interface';
import { DatePicker } from '@antdv/ui';

const Demo = () => <DatePicker status="error" />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorBorder', 'colorErrorHover', 'colorErrorOutline'],
  key: 'danger',
};

export default componentDemo;
