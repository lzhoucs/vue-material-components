<template>
	<div class="mdc-radio"
    v-ripple.noSurface.unbounded
  >
    <input :checked="checked" v-bind="inputAttrsBinding" class="mdc-radio__native-control" type="radio">
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
    <div class="mdc-radio__ripple"></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import ripple from 'D/ripple'
export default {
  name: 'Radio',
  props: {
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const inputAttrsBinding = computed(() => ({
      ...(props.id && { id: props.id }),
      ...(props.name && { name: props.name })
    }) )
    return { inputAttrsBinding }
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/radio/mdc-radio"
</style>
