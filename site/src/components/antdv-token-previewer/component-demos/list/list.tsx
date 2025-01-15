import type { ComponentDemo } from '../../interface'
import { Avatar, List, ListItem, ListItemMeta } from '@antdv/ui'
import { defineComponent } from 'vue'

const data = [
  { title: 'Ant Design Vue Title 1' },
  { title: 'Ant Design Vue Title 2' },
  { title: 'Ant Design Vue Title 3' },
  { title: 'Ant Design Vue Title 4' },
]
const Demo = defineComponent({
  setup() {
    return () => (
      <List
        itemLayout="horizontal"
        dataSource={data}
        v-slots={{
          renderItem: ({ item }: any) => (
            <ListItem>
              <ListItemMeta
                v-slots={{
                  avatar: () => <Avatar src="https://joeschmoe.io/api/v1/random" />,
                  title: () => <a href="https://www.@antdv/ui.com">{item.title}</a>,
                }}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </ListItem>
          ),
        }}
      />
    )
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'default',
}

export default componentDemo
