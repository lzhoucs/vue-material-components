<template>
  <!-- we are adding this root solely for the warning:
Extraneous non-emits event listeners (update:modelValue) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.
  at <VmcSwitch modelValue=true onUpdate:modelValue=fn >
  -->
  <div class="vmc-switch-root">
  <div class="mdc-switch"
    :class="modelValue && 'mdc-switch--checked'"
  >
                <div class="mdc-switch__track"></div>
                <div class="mdc-switch__thumb-underlay"
                  v-ripple.noSurface.unbounded
                >
                    <div class="mdc-switch__thumb"></div>
                    <input type="checkbox" :id="instanceId" :checked="modelValue" class="mdc-switch__native-control" @change="$emit('update:modelValue', $event.target.checked)">
                </div>
            </div>
            <label v-if="$slots.default" :for="instanceId"><slot></slot></label>

  </div>
</template>

<script>
import {uid} from '@/util'
import ripple from 'D/ripple'
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  name: 'VmcSwitch',
  setup() {
    return {
      instanceId: `vmc-switch-${uid()}`
    }
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/switch/mdc-switch"
</style>

<style lang="sass" scoped>
.vmc-switch-root
  display: inline-block
label
  margin-left: .75rem
</style>
