<script lang="ts" setup>
import type { PropType } from 'vue'
import LoF from '@/utils/lof'
import type { DistinctionType, SpaceType, StepType } from '@/utils/lof'
import { ref, watch } from 'vue'
import Distinction from '@/components/Distinction.vue'

const props = defineProps({
  expression: {
    type: Object as PropType<DistinctionType>,
    required: true
  },
  operation: {
    type: Function,
    required: false
  }
})

const emits = defineEmits(['current-step', 'new-step'])

const step = ref<StepType>({ expression: props.expression })

watch(() => props.operation, (newValue) => {
  if (newValue) {
    step.value.operation = newValue
    step.value.name = newValue.name
  }
})

const execute = () => {
  if (step.value.operation && selectedExpression.value) {
    switch (step.value.operation.name) {
      case 'cross':
        step.value.result = step.value.operation(step.value.expression, selectedExpression.value)
        break
      case 'condensation':
        step.value.result = step.value.operation(selectedExpression.value)
        break
      case 'confirmation':
        step.value.result = step.value.operation(selectedExpression.value)
        break
      case 'cancelation':
        step.value.result = step.value.operation(selectedExpression.value)
        break
      case 'compensation':
        step.value.result = step.value.operation(selectedExpression.value)
        break
    }
  }
}

// Handles distinction selection
const selectedExpression = ref({} as DistinctionType)

const distinctionSelected = (expr: DistinctionType) => {
  // TODO: Need to keep only selected expressions

  
  selectedExpression.value = expr
}

const distinctionUnselected = (expr: DistinctionType) => {
  selectedExpression.value = {} as DistinctionType
}

const newStep = () => {
  emits('new-step', step.value.result)
}

</script>

<template lang="pug">
.step
  .expression
    Distinction(
      :expression="step?.expression"
      @distinction-selected="distinctionSelected"
    )
  .arrow
    h3 &#8640;
  .result
    Distinction(v-if="step?.result" :expression="step?.result")
  .operation
    .name {{ step?.name }}
  .execute(v-if="step.operation")
    button(@click="execute()") Execute
    button(v-if="step?.result" @click="newStep()") Next

pre {{ selectedExpression }}

</template>

<style scoped>
.step {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1em;
}
.expression, .result {
  flex-grow: 4;
}
.arrow, .execute {
  flex-grow: 2;
}
</style>