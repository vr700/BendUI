<template><div :class="cx('p-6 pt-0', $attrs.class as string)" v-bind="$attrs"><slot/></div></template>
<script setup lang="ts">import { cx } from '../../utils/classes'; defineOptions({ inheritAttrs:false });</script>
