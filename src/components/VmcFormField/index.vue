<template>
  <div class="mdc-form-field">
    <template v-if="label">
      <slot :id="instanceId"></slot>
      <label :for="instanceId">{{label}}</label>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script>
import {uid} from '@/util'
export default {
  name: "VmcFormField",
  props: {
    label: {
      type: String,
      required: false
    }
  },
  setup() {
    return {
      instanceId: `formfield-${uid()}`
    }
  }
}
</script>

<style lang="sass">
@use "@material/form-field/mdc-form-field"
</style>
