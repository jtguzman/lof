<script setup lang="ts">
import LoF from '@/utils/lof'
import Distinction from './components/Distinction.vue'
import Step from './components/Step.vue'

let expression = LoF.mark('expression')
//expression = LoF.cross(expression, expression)

</script>

<template lang="pug">
.content
  #state
    h3 State
  #calculator
    h3 Calc
    Distinction(:expression="expression")
    Step(:expression="expression")
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100vh;
}
#state {
  flex-grow: 1;
  padding: 1em;
  border-right: 1px solid;
}
#calculator {
  flex-grow: 6;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  padding: 1em;
}
</style>
