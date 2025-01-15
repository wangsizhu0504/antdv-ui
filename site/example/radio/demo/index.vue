<script>
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Disabled from './disabled.vue'
  import RadioButton from './radioButton.vue'
  import RadioButtonSolid from './radioButton-solid.vue'
  import RadioGroup from './radioGroup.vue'
  import RadioGroupMore from './radioGroup-more.vue'
  import RadioGroupOptions from './radioGroup-options.vue'
  import RadioGroupWithName from './radioGroup-with-name.vue'
  import Size from './size.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Disabled,
      RadioButton,
      RadioButtonSolid,
      RadioGroupMore,
      RadioGroupOptions,
      RadioGroupWithName,
      RadioGroup,
      Size,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Disabled />
    <RadioButton />
    <RadioButtonSolid />
    <RadioGroupMore />
    <RadioGroupOptions />
    <RadioGroupWithName />
    <RadioGroup />
    <Size />
  </demo-sort>
</template>
