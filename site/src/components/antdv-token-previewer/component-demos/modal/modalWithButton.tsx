import { Button, Modal } from '@antdv/ui'
import { defineComponent, ref } from 'vue'
import type { ComponentDemo } from '../../interface'

const Demo = defineComponent({
  setup() {
    const isModalVisible = ref<any>(false)
    const showModal = () => {
      isModalVisible.value = true
    }
    const handleOk = () => {
      isModalVisible.value = false
    }
    const handleCancel = () => {
      isModalVisible.value = false
    }

    return () => {
      return (
        <>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalVisible.value}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            {' '}
            <p>Some contents...</p>
            {' '}
            <p>Some contents...</p>
          </Modal>
        </>
      )
    }
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgMask'],
  key: 'modalWithButton',
}
export default componentDemo
