<template><label :class="cx('text-sm font-medium', $attrs.class as string)" v-bind="$attrs"><slot/></label></template>
<script setup lang="ts">import { cx } from '../../utils/classes'; defineOptions({ inheritAttrs:false });</script>
