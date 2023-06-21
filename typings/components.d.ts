/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module 'vue' {
  export interface GlobalComponents {
    AAffix: typeof import('../components/components')['Affix'];

    AAlert: typeof import('../components/components')['Alert'];

    AAnchor: typeof import('../components/components')['Anchor'];

    AAnchorLink: typeof import('../components/components')['AnchorLink'];

    AAutoComplete: typeof import('../components/components')['AutoComplete'];

    AAutoCompleteOptGroup: typeof import('../components/components')['AutoCompleteOptGroup'];

    AAutoCompleteOption: typeof import('../components/components')['AutoCompleteOption'];

    AAvatar: typeof import('../components/components')['Avatar'];

    AAvatarGroup: typeof import('../components/components')['AvatarGroup'];

    ABadge: typeof import('../components/components')['Badge'];

    ABadgeRibbon: typeof import('../components/components')['BadgeRibbon'];

    ABreadcrumb: typeof import('../components/components')['Breadcrumb'];

    ABreadcrumbItem: typeof import('../components/components')['BreadcrumbItem'];

    ABreadcrumbSeparator: typeof import('../components/components')['BreadcrumbSeparator'];

    AButton: typeof import('../components/components')['Button'];

    AButtonGroup: typeof import('../components/components')['ButtonGroup'];

    ACalendar: typeof import('../components/components')['Calendar'];

    ACard: typeof import('../components/components')['Card'];

    ACardGrid: typeof import('../components/components')['CardGrid'];

    ACardMeta: typeof import('../components/components')['CardMeta'];

    ACarousel: typeof import('../components/components')['Carousel'];

    ACascader: typeof import('../components/components')['Cascader'];

    ACheckableTag: typeof import('../components/components')['CheckableTag'];

    ACheckbox: typeof import('../components/components')['Checkbox'];

    ACheckboxGroup: typeof import('../components/components')['CheckboxGroup'];

    ACol: typeof import('../components/components')['Col'];

    ACollapse: typeof import('../components/components')['Collapse'];

    ACollapsePanel: typeof import('../components/components')['CollapsePanel'];

    AComment: typeof import('../components/components')['Comment'];

    AConfigProvider: typeof import('../components/components')['ConfigProvider'];

    AStyleProvider: typeof import('../components/components')['StyleProvider'];

    ADatePicker: typeof import('../components/components')['DatePicker'];

    ADescriptions: typeof import('../components/components')['Descriptions'];

    ADescriptionsItem: typeof import('../components/components')['DescriptionsItem'];

    ADirectoryTree: typeof import('../components/components')['DirectoryTree'];

    ADivider: typeof import('../components/components')['Divider'];

    ADrawer: typeof import('../components/components')['Drawer'];

    ADropdown: typeof import('../components/components')['Dropdown'];

    ADropdownButton: typeof import('../components/components')['DropdownButton'];

    AEmpty: typeof import('../components/components')['Empty'];

    AForm: typeof import('../components/components')['Form'];

    AFormItem: typeof import('../components/components')['FormItem'];

    AFormItemRest: typeof import('../components/components')['FormItemRest'];

    AImage: typeof import('../components/components')['Image'];

    AImagePreviewGroup: typeof import('../components/components')['ImagePreviewGroup'];

    AInput: typeof import('../components/components')['Input'];

    AInputGroup: typeof import('../components/components')['InputGroup'];

    AInputNumber: typeof import('../components/components')['InputNumber'];

    AInputPassword: typeof import('../components/components')['InputPassword'];

    AInputSearch: typeof import('../components/components')['InputSearch'];

    ALayout: typeof import('../components/components')['Layout'];

    ALayoutContent: typeof import('../components/components')['LayoutContent'];

    ALayoutFooter: typeof import('../components/components')['LayoutFooter'];

    ALayoutHeader: typeof import('../components/components')['LayoutHeader'];

    ALayoutSider: typeof import('../components/components')['LayoutSider'];

    AList: typeof import('../components/components')['List'];

    AListItem: typeof import('../components/components')['ListItem'];

    AListItemMeta: typeof import('../components/components')['ListItemMeta'];

    ALocaleProvider: typeof import('../components/components')['LocaleProvider'];

    AMentions: typeof import('../components/components')['Mentions'];

    AMentionsOption: typeof import('../components/components')['MentionsOption'];

    AMenu: typeof import('../components/components')['Menu'];

    AMenuDivider: typeof import('../components/components')['MenuDivider'];

    AMenuItem: typeof import('../components/components')['MenuItem'];

    AMenuItemGroup: typeof import('../components/components')['MenuItemGroup'];

    AModal: typeof import('../components/components')['Modal'];

    AMonthPicker: typeof import('../components/components')['MonthPicker'];

    APageHeader: typeof import('../components/components')['PageHeader'];

    APagination: typeof import('../components/components')['Pagination'];

    APopconfirm: typeof import('../components/components')['Popconfirm'];

    APopover: typeof import('../components/components')['Popover'];

    AProgress: typeof import('../components/components')['Progress'];

    AQuarterPicker: typeof import('../components/components')['QuarterPicker'];

    ARadio: typeof import('../components/components')['Radio'];

    ARadioButton: typeof import('../components/components')['RadioButton'];

    ARadioGroup: typeof import('../components/components')['RadioGroup'];

    ARangePicker: typeof import('../components/components')['RangePicker'];

    ARate: typeof import('../components/components')['Rate'];

    AResult: typeof import('../components/components')['Result'];

    ARow: typeof import('../components/components')['Row'];

    ASelect: typeof import('../components/components')['Select'];

    ASegmented: typeof import('../components/components')['Segmented'];

    ASelectOptGroup: typeof import('../components/components')['SelectOptGroup'];

    ASelectOption: typeof import('../components/components')['SelectOption'];

    ASkeleton: typeof import('../components/components')['Skeleton'];

    ASkeletonAvatar: typeof import('../components/components')['SkeletonAvatar'];

    ASkeletonButton: typeof import('../components/components')['SkeletonButton'];

    ASkeletonImage: typeof import('../components/components')['SkeletonImage'];

    ASkeletonInput: typeof import('../components/components')['SkeletonInput'];

    ASlider: typeof import('../components/components')['Slider'];

    ASpace: typeof import('../components/components')['Space'];

    ASpin: typeof import('../components/components')['Spin'];

    AStatistic: typeof import('../components/components')['Statistic'];

    AStatisticCountdown: typeof import('../components/components')['StatisticCountdown'];

    AStep: typeof import('../components/components')['Step'];

    ASteps: typeof import('../components/components')['Steps'];

    ASubMenu: typeof import('../components/components')['SubMenu'];

    ASwitch: typeof import('../components/components')['Switch'];

    ATabPane: typeof import('../components/components')['TabPane'];

    ATable: typeof import('../components/components')['Table'];

    ATableColumn: typeof import('../components/components')['TableColumn'];

    ATableColumnGroup: typeof import('../components/components')['TableColumnGroup'];

    ATableSummary: typeof import('../components/components')['TableSummary'];

    ATableSummaryCell: typeof import('../components/components')['TableSummaryCell'];

    ATableSummaryRow: typeof import('../components/components')['TableSummaryRow'];

    ATabs: typeof import('../components/components')['Tabs'];

    ATag: typeof import('../components/components')['Tag'];

    ATextarea: typeof import('../components/components')['Textarea'];

    ATimePicker: typeof import('../components/components')['TimePicker'];

    ATimeRangePicker: typeof import('../components/components')['TimeRangePicker'];

    ATimeline: typeof import('../components/components')['Timeline'];

    ATimelineItem: typeof import('../components/components')['TimelineItem'];

    ATooltip: typeof import('../components/components')['Tooltip'];

    ATransfer: typeof import('../components/components')['Transfer'];

    ATree: typeof import('../components/components')['Tree'];

    ATreeNode: typeof import('../components/components')['TreeNode'];

    ATreeSelect: typeof import('../components/components')['TreeSelect'];

    ATreeSelectNode: typeof import('../components/components')['TreeSelectNode'];

    ATypography: typeof import('../components/components')['Typography'];

    ATypographyLink: typeof import('../components/components')['TypographyLink'];

    ATypographyParagraph: typeof import('../components/components')['TypographyParagraph'];

    ATypographyText: typeof import('../components/components')['TypographyText'];

    ATypographyTitle: typeof import('../components/components')['TypographyTitle'];

    AUpload: typeof import('../components/components')['Upload'];

    AUploadDragger: typeof import('../components/components')['UploadDragger'];

    AWeekPicker: typeof import('../components/components')['WeekPicker'];

    AQRCode: typeof import('../components/components')['QRCode'];

    ATour: typeof import('../components/components')['Tour'];

    AFloatButton: typeof import('../components/components')['FloatButton'];

    AFloatButtonGroup: typeof import('../components/components')['FloatButtonGroup'];

    ABackTop: typeof import('../components/components')['BackTop'];

    AWatermark: typeof import('../components/components')['Watermark'];
  }
}
export {};
