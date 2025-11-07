<template><div :class="cx('flex flex-col gap-1.5 p-6', $attrs.class as string)" v-bind="$attrs"><slot/></div></template>
<script setup lang="ts">import { cx } from '../../utils/classes'; defineOptions({ inheritAttrs:false });</script>
