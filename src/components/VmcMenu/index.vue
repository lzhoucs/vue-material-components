<template>
  <div class="mdc-menu-surface--anchor">
    <component :is="activator" />

    <div class="mdc-menu mdc-menu-surface"
      :class="[
        modelValue && 'mdc-menu-surface--open'
        ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mergeProps } from '@/util'
export default {
  name: 'VmcMenu',

  props: {
    modelValue: Boolean
  },

  setup(props, {slots, emit}) {
    if (!slots.activator) {
      console.error("No activator slot found, menu can't be initialized")
      return;
    }

    const [activatorVnode] = slots.activator()

    mergeProps(activatorVnode, {
      onClick: () => {
        emit("update:modelValue", !props.modelValue);
      }
    })

    return {
      activator: () => activatorVnode
    }
  }

}
</script>

<style lang="sass">
@use "@material/menu-surface/mdc-menu-surface"
@use "@material/menu/mdc-menu"
</style>
