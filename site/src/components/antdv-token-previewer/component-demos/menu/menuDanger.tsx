import type { MenuProps } from '@antdv/ui';
import type { ComponentDemo } from '../../interface';

import { Menu } from '@antdv/ui';

const items: MenuProps['items'] = [
  {
    key: '0',
    danger: true,
    label: '危险',
  },
  {
    key: '1',
    danger: true,
    label: '危险选中',
  },
  {
    key: '2',
    danger: true,
    disabled: true,
    label: '危险禁用',
  },
];

function Demo() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return <Menu onClick={onClick} style={{ width: '256px' }} selectedKeys={['1']} items={items} />;
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover', 'colorErrorOutline'],
  key: 'danger',
};

export default componentDemo;
