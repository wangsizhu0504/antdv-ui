import { Card, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

import Alert from '../component-demos/alert/warning';
import Badge from '../component-demos/badge/warning';
import Input from '../component-demos/input/warning';
import Message from '../component-demos/message/warning';
import Modal from '../component-demos/modal/warning';
import Notification from '../component-demos/notification/warning';
import Popconfirm from '../component-demos/popconfirm/popconfirm';
import Result from '../component-demos/result/warning';
import Tag from '../component-demos/tag/warning';
import Text from '../component-demos/typography/warningText';
import Title from '../component-demos/typography/warningTitle';

export const Warning = defineComponent({
  name: 'Warning',
  setup() {
    return () => {
      return (
        <Card size="small">
          <Space align="start" size="large">
            <Space direction="vertical" size="large">
              <Space size="large">
                <div style={{ width: '200px' }}>{Title.demo}</div>
                <div style={{ width: '100%' }}>{Input.demo}</div>
              </Space>
              {Alert.demo}
            </Space>
            <Space direction="vertical" align="center" size="large">
              {Message.demo}
              {Popconfirm.demo}
              <Space size="large">
                {Badge.demo}
                {Tag.demo}
                {Text.demo}
              </Space>
            </Space>
          </Space>
          <Space size="large" style={{ marginTop: '32px' }}>
            <div>{Notification.demo}</div>
            <div>{Modal.demo}</div>
          </Space>
          {Result.demo}
        </Card>
      );
    };
  },
});
