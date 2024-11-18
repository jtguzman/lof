<script lang="ts" setup>
import { ref } from 'vue'
import Step from '@/components/Step.vue'
import LoF from '@/utils/lof'
import type { DistinctionType, StepType } from '@/utils/lof'

const steps = ref<StepType[]>([])

const currentStep = (s: StepType) => {
  console.log('currentStep', s)
}

const newStep = (s: DistinctionType) => {
  steps.value.push({
    expression: s
  })
}

const mark = () => {
  steps.value.push({
    expression: LoF.mark(''),
    name: 'form'
  })
}

const cross = () => {
  if (steps.value.length > 0) {
    steps.value[steps.value.length - 1].operation = LoF.cross
  }
}

const condensation = () => {
  if (steps.value.length > 0) {
    steps.value[steps.value.length - 1].operation = LoF.condensation
  }
}

const confirmation = () => {
  if (steps.value.length > 0) {
    steps.value[steps.value.length - 1].operation = LoF.confirmation
  }
}

const cancelation = () => {
  if (steps.value.length > 0) {
    steps.value[steps.value.length - 1].operation = LoF.cancelation
  }
}

const compensation = () => {
  if (steps.value.length > 0) {
    steps.value[steps.value.length - 1].operation = LoF.compensation
  }
}

</script>

<template lang="pug">
h3 Calculator
.operations
  button(@click="mark()") Mark
  button(@click="cross()") Cross
  button(@click="condensation()") Condensate
  button(@click="confirmation()") Confirm
  button(@click="cancelation()") Cancel
  button(@click="compensation()") Compensate
.steps
  Step(
    v-for="step, index in steps" 
    :key="index" 
    :expression="step.expression"
    :operation="step.operation"
    @current-step="currentStep"
    @new-step="newStep"
)
</template>

<style scoped>
.operations {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>