# custom date library

Starting from the V3 version, the momentjs library is replaced by dayjs by default. If you need to use the momentjs or date-fns date library, you can replace it as follows:

### 替换 DatePicker

```js
import antd from '@antdv/ui'
import Calendar from '@antdv/ui/es/calendar/moment'
// moment or date-fns
import DatePicker from '@antdv/ui/es/date-picker/moment'

import TimePicker from '@antdv/ui/es/time-picker/moment'
// import DatePicker from '@antdv/ui/es/date-picker/date-fns';
// import TimePicker from '@antdv/ui/es/time-picker/date-fns';
// import Calendar from '@antdv/ui/es/calendar/date-fns';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(DatePicker).use(TimePicker).use(Calendar).use(antd).mount('#app')
```

> Note: If you need to register the ant-design-vue component library globally, then `use(DatePicker)` `use(TimePicker)` `use(Calendar)` must be executed before `use(antd)`, otherwise the default cannot be overridden dayjs version.
