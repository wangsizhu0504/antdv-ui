import Message from './src/Message'
import useMessage from './src/useMessage'

export const message = Object.assign(Message, {
  useMessage,
})

export default message

export * from './src/types'
export * from './src/props'

export { default as useMessage } from './src/useMessage'
