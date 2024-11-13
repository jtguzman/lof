<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DistinctionType, SpaceType, StepType } from '@/utils/lof'
import { ref } from 'vue'
import LoF from '@/utils/lof'
import Distinction from '@/components/Distinction.vue'

const props = defineProps({
  expression: {
    type: [Object as PropType<DistinctionType>, Array as PropType<SpaceType>],
    required: true
  }
})

const step = ref({ expression: props.expression } as StepType)

const mark = () => {
  step.value.operation = LoF.mark
  step.value.result = step.value.expression.concat(step.value.operation('form'))
}
</script>

<template lang="pug">
button(@click="mark()") Mark
.step
  Distinction(:expression="step?.expression")
  Distinction(v-if="expression.result" :expression="step?.result")
  //.name {{ step?.name }}

pre {{ step }}

</template>

<style scoped>

</style>