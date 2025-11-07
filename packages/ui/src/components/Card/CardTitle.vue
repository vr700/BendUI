<template><div :class="cx('font-semibold tracking-tight', $attrs.class as string)" v-bind="$attrs"><slot/></div></template>
<script setup lang="ts">import { cx } from '../../utils/classes'; defineOptions({ inheritAttrs:false });</script>
