<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DistinctionType } from '@/utils/lof'
import LoF from '@/utils/lof'
import Distinction from '@/components/Distinction.vue'


const props = defineProps({
  expression: {
    type: Object as PropType<DistinctionType>,
    required: true
  }
})

console.log('expression', props.expression)

</script>

<template lang="pug">
.distinction
  .name {{ expression?.name }}
  .space(v-if="Array.isArray(expression?.space)")
    Distinction(v-for="e in expression?.space" :key="e.name" :expression="e")
  .space(v-if="typeof expression?.space === 'object' && expression?.space !== null && Object.keys(expression?.space).length > 0")
    Distinction(:expression="expression?.space")
</template>

<style scoped>
.distinction {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid #e1e1e1;
  border-right: 1px solid #e1e1e1;
  margin: 5px 5px 0 0;
}
.name {
  align-self: flex-start;
  padding: 0 5px 0 0;
}
</style>