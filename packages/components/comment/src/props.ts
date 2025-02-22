import type { ExtractPropTypes } from 'vue';
import { PropTypes } from '@antdv/utils';

export function commentProps() {
  return {
    actions: Array,
    /** The element to display as the comment author. */
    author: PropTypes.any,
    /** The element to display as the comment avatar - generally an antd Avatar */
    avatar: PropTypes.any,
    /** The main content of the comment */
    content: PropTypes.any,
    /** Comment prefix defaults to '.ant-comment' */
    prefixCls: String,
    /** A datetime element containing the time to be displayed */
    datetime: PropTypes.any,
  };
}

export type CommentProps = Partial<ExtractPropTypes<ReturnType<typeof commentProps>>>;
