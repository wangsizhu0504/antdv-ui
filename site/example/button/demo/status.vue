<docs>
---
order: 9
title:
  zh-CN: 危险按钮
  en-US: Danger Button
---

## zh-CN

在 2.2.0 之后，危险成为一种按钮属性而不是按钮类型。

## en-US

danger is a property of button after antd 2.2.0.

</docs>

<template>
  <a-space warp style="margin-top: 10px;">
    <a-button type="primary" danger>
      Primary
    </a-button>
    <a-button danger>
      Default
    </a-button>
    <a-button type="dashed" danger>
      Dashed
    </a-button>
    <a-button type="text" danger>
      Text
    </a-button>
    <a-button type="link" danger>
      Link
    </a-button>
  </a-space>
  <a-space warp style="margin-top: 10px;">
    <a-button type="primary" success>
      Primary
    </a-button>
    <a-button success>
      Default
    </a-button>
    <a-button type="dashed" success>
      Dashed
    </a-button>
    <a-button type="text" success>
      Text
    </a-button>
    <a-button type="link" success>
      Link
    </a-button>
  </a-space>
  <a-space warp style="margin-top: 10px;">
    <a-button type="primary" warning>
      Primary
    </a-button>
    <a-button warning>
      Default
    </a-button>
    <a-button type="dashed" warning>
      Dashed
    </a-button>
    <a-button type="text" warning>
      Text
    </a-button>
    <a-button type="link" warning>
      Link
    </a-button>
  </a-space>
</template>
