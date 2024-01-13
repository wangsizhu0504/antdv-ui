import type { Plugin } from 'vue'

import { Affix } from '@antdv/components/affix'
import { Alert } from '@antdv/components/alert'
import { Anchor, AnchorLink } from '@antdv/components/anchor'
import { App } from '@antdv/components/app'
import { AutoComplete, AutoCompleteOptGroup, AutoCompleteOption } from '@antdv/components/auto-complete'
import { Avatar, AvatarGroup } from '@antdv/components/avatar'
import { Badge, BadgeRibbon } from '@antdv/components/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@antdv/components/breadcrumb'
import { Button, ButtonGroup } from '@antdv/components/button'
import { Calendar } from '@antdv/components/calendar'
import { Card, CardGrid, CardMeta } from '@antdv/components/card'
import { Carousel } from '@antdv/components/carousel'
import { Cascader } from '@antdv/components/cascader'
import { Checkbox, CheckboxGroup } from '@antdv/components/checkbox'
import { Collapse, CollapsePanel } from '@antdv/components/collapse'
import { Comment } from '@antdv/components/comment'
import { ConfigProvider } from '@antdv/components/config-provider'
import { DatePicker } from '@antdv/components/date-picker'
import { Descriptions, DescriptionsItem } from '@antdv/components/descriptions'
import { Divider } from '@antdv/components/divider'
import { Drawer } from '@antdv/components/drawer'
import { Dropdown, DropdownButton } from '@antdv/components/dropdown'
import { Empty } from '@antdv/components/empty'
import { Flex } from '@antdv/components/flex'
import { BackTop, FloatButton, FloatButtonGroup } from '@antdv/components/float-button'
import { Form, FormItem, FormItemRest } from '@antdv/components/form'
import { Col, Row } from '@antdv/components/grid'
import { Image, ImagePreviewGroup } from '@antdv/components/image'
import { Input, InputGroup, InputPassword, InputSearch, Textarea } from '@antdv/components/input'
import { InputNumber } from '@antdv/components/input-number'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '@antdv/components/layout'
import { List, ListItem, ListItemMeta } from '@antdv/components/list'
import { LocaleProvider } from '@antdv/components/locale-provider'
import { Mentions, MentionsOption } from '@antdv/components/mentions'
import {
  Item,
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemGroup,
  Submenu,
} from '@antdv/components/menu'

import { Modal } from '@antdv/components/modal'
import { PageHeader } from '@antdv/components/page-header'
import { Pagination } from '@antdv/components/pagination'
import { Popconfirm } from '@antdv/components/popconfirm'
import { Popover } from '@antdv/components/popover'
import { Progress } from '@antdv/components/progress'
import { QRCode } from '@antdv/components/qrcode'
import { Radio, RadioButton, RadioGroup } from '@antdv/components/radio'
import { Rate } from '@antdv/components/rate'
import { Result } from '@antdv/components/result'
import { Segmented } from '@antdv/components/segmented'
import { Select, SelectOptGroup, SelectOption } from '@antdv/components/select'
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage,
  SkeletonInput,
  SkeletonTitle,
} from '@antdv/components/skeleton'
import { Slider } from '@antdv/components/slider'
import { Compact, Space } from '@antdv/components/space'
import { Spin } from '@antdv/components/spin'
import { Statistic, StatisticCountdown } from '@antdv/components/statistic'
import { Step, Steps } from '@antdv/components/steps'
import { StyleProvider } from '@antdv/components/style-provider'
import { Switch } from '@antdv/components/switch'
import Table, { TableColumn, TableColumnGroup, TableSummary, TableSummaryCell } from '@antdv/components/table'
import { TabPane, Tabs } from '@antdv/components/tabs'
import { CheckableTag, Tag } from '@antdv/components/tag'
import { TimePicker, TimeRangePicker } from '@antdv/components/time-picker'
import { Timeline, TimelineItem } from '@antdv/components/timeline'
import { Tooltip } from '@antdv/components/tooltip'
import { Tour } from '@antdv/components/tour'
import { Transfer } from '@antdv/components/transfer'
import { DirectoryTree, Tree, TreeNode } from '@antdv/components/tree'
import { TreeSelect, TreeSelectNode } from '@antdv/components/tree-select'
import {
  Typography,
  TypographyLink,
  TypographyParagraph,
  TypographyText,
  TypographyTitle,
} from '@antdv/components/typography'
import { Upload, UploadDragger } from '@antdv/components/upload'
import { Watermark } from '@antdv/components/watermark'

export default [
  Affix,
  Alert,
  Anchor,
  AnchorLink,
  App,
  AutoComplete,
  AutoCompleteOption,
  AutoCompleteOptGroup,
  Avatar,
  AvatarGroup,
  Badge,
  BadgeRibbon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardMeta,
  CardGrid,
  Carousel,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePanel,
  Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Divider,
  Drawer,
  Dropdown,
  DropdownButton,
  Empty,
  Flex,
  FloatButton,
  FloatButtonGroup,
  BackTop,
  Form,
  FormItem,
  FormItemRest,
  Row,
  Col,
  Image,
  ImagePreviewGroup,
  Input,
  InputGroup,
  InputSearch,
  Textarea,
  InputPassword,
  InputNumber,
  Layout,
  LayoutHeader,
  LayoutFooter,
  LayoutSider,
  LayoutContent,
  List,
  ListItem,
  ListItemMeta,
  LocaleProvider,
  Mentions,
  MentionsOption,
  Menu,
  Item,
  Submenu,
  MenuItem,
  MenuItemGroup,
  MenuDivider,
  Modal,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  RadioGroup,
  RadioButton,
  Rate,
  Result,
  Segmented,
  Select,
  SelectOption,
  SelectOptGroup,
  Skeleton,
  SkeletonButton,
  SkeletonAvatar,
  SkeletonInput,
  SkeletonImage,
  SkeletonTitle,
  Slider,
  Space,
  Compact,
  Spin,
  Statistic,
  StatisticCountdown,
  Steps,
  Step,
  StyleProvider,
  Switch,
  Table,
  TableColumn,
  TableColumnGroup,
  TableSummary,
  TableSummaryCell,
  Tabs,
  TabPane,
  Tag,
  CheckableTag,
  TimePicker,
  TimeRangePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tour,
  Transfer,
  Tree,
  TreeNode,
  DirectoryTree,
  TreeSelect,
  TreeSelectNode,
  Typography,
  TypographyText,
  TypographyTitle,
  TypographyLink,
  TypographyParagraph,
  Upload,
  UploadDragger,
  Watermark,
] as Plugin[]
