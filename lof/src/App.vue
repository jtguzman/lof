<script setup lang="ts">
import Distinction from './components/Distinction.vue'
</script>

<template lang="pug">
.content
  .state
    h3 State
  .calculator
    h3 Calc
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100vh;
}
.state {
  flex-grow: 1;
  padding: 1em;
  border-right: 1px solid;
}
.calculator {
  flex-grow: 6;
  padding: 1em;
}
</style>
