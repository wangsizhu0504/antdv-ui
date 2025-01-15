import { Card, Space } from '@antdv/ui'
import { defineComponent } from 'vue'

import Button from '../component-demos/button/button-icon'
import Checkbox from '../component-demos/checkbox/checkbox'
import Menu from '../component-demos/menu/menu'
import Pagination from '../component-demos/pagination/outline'
import Popconfirm from '../component-demos/popconfirm/popconfirm'
import RadioButton from '../component-demos/radio/button'
import Radio from '../component-demos/radio/radio'
import SelectTag from '../component-demos/select/selectTag'
import Steps from '../component-demos/steps/steps'
import Switch from '../component-demos/switch/switch'
import Table from '../component-demos/table/table'
import Tabs from '../component-demos/tabs/tabs'
import Timeline from '../component-demos/timeline/timeline'

export const Primary = defineComponent({
  name: 'Primary',
  setup() {
    return () => {
      return (
        <Card size="small">
          <Space direction="vertical">
            <Space align="start" size="large">
              {Menu.demo}
              <Space direction="vertical" size="large">
                <Space size="large" align="start">
                  <Space direction="vertical" size="large">
                    <div>{Button.demo}</div>
                    <div>
                      <span>{Radio.demo}</span>
                      {Checkbox.demo}
                      {Switch.demo}
                    </div>
                    <div>{RadioButton.demo}</div>
                    {Tabs.demo}
                  </Space>
                  {SelectTag.demo}
                </Space>
                {Pagination.demo}
                <div style={{ padding: '12px' }}>{Steps.demo}</div>
                <Space size="large" align="start">
                  {Popconfirm.demo}
                  {Timeline.demo}
                </Space>
              </Space>
            </Space>
            {Table.demo}
          </Space>
        </Card>
      )
    }
  },
})
