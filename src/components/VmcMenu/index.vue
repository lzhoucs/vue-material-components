<template>
  <div class="mdc-menu-surface--anchor">
    <component :is="activator" />

    <div ref="surfaceRef" class="mdc-menu mdc-menu-surface">
      <component :is="list" />
    </div>
  </div>
</template>

<script>
import {mergeProps } from '@/util'
import {ref} from 'vue'
import useMenuSurface from './useMenuSurface'
import {strings} from '@material/list/constants';

export default {
  name: 'VmcMenu',

  props: {
    modelValue: Boolean,
    corner: String
  },

  setup(props, {slots, emit}) {
    const {surfaceRef} = useMenuSurface(...arguments)

    // activator
    if (!slots.activator) {
      console.error("No activator slot found, menu can't be initialized")
      return;
    }

    const [activatorVnode] = slots.activator()

    mergeProps(activatorVnode, {
      onClick: () => {
        if (!props.modelValue) {
          emit("update:modelValue", true);
        }
      }
    })

    // default
    if (!slots.default) {
      console.error("No default slot found for menu content list, menu can't be initialized")
      return;
    }

    // might be a good pattern
    const createListVNode = () => {
      const [menuListVNode] = slots.default()

      mergeProps(menuListVNode, {
        [`on${strings.ACTION_EVENT}`]: () => {
          emit("update:modelValue", false);
        }
      })
      return menuListVNode
    }

    return {
      activator: () => activatorVnode,
      list: () => createListVNode(),
      surfaceRef
    }
  }

}

</script>

<style lang="sass">
@use "@material/menu-surface/mdc-menu-surface"
@use "@material/menu/mdc-menu"
</style>
