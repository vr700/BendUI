<template><div :class="cx('text-sm text-neutral-400', $attrs.class as string)" v-bind="$attrs"><slot/></div></template>
<script setup lang="ts">import { cx } from '../../utils/classes'; defineOptions({ inheritAttrs:false });</script>
