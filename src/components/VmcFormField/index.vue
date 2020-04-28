<template>
  <div class="mdc-form-field">
    <template v-if="label">
      <!-- this results in the following bad verbose usage. It would be really nice if there's a way to touch the slot root element directly
      <vmc-form-field label="with explicit form field">
        <template v-slot:default="{id}">
          <vmc-checkbox :id="id"></vmc-checkbox>
        </template>
      </vmc-form-field>
      -->

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
      instanceId: `vmc-formfield-${uid()}`
    }
  }
}
</script>

<style lang="sass">
@use "@material/form-field/mdc-form-field"
</style>
