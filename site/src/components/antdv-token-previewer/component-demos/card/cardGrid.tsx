import type { CSSProperties } from 'vue';
import type { ComponentDemo } from '../../interface';

import { Card } from '@antdv/ui';
import { defineComponent } from 'vue';

const gridStyle: CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

const Demo = defineComponent({
  setup() {
    return () => (
      <Card title="Card Title">
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          Content
        </Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
      </Card>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBorderSecondary'],
  key: 'cardGrid',
};

export default componentDemo;
