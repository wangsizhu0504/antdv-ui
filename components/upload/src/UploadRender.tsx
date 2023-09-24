import { defineComponent, ref } from 'vue'
import { initDefaultProps } from '../../_utils/vue'
import AjaxUpload from './AjaxUploader'
import { uploadRenderProps } from './props'
import type { RcFile } from './interface'

function empty() {}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'UploadRender',
  inheritAttrs: false,
  props: initDefaultProps(uploadRenderProps(), {
    componentTag: 'span',
    prefixCls: 'rc-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onStart: empty,
    onError: empty,
    onSuccess: empty,
    multiple: false,
    beforeUpload: null,
    customRequest: null,
    withCredentials: false,
    openFileDialogOnClick: true,
  }),
  setup(props, { slots, attrs, expose }) {
    const uploader = ref()

    const abort = (file: RcFile) => {
      uploader.value?.abort(file)
    }
    expose({
      abort,
    })
    return () => {
      return <AjaxUpload {...props} {...attrs} v-slots={slots} ref={uploader} />
    }
  },
})
