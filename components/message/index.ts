import Message from './Message'
import useMessage from './useMessage'

export const message = Object.assign(Message, {
  useMessage,
})

export default message

export * from './types'
export * from './props'

export { default as useMessage } from './useMessage'
