<template>
  <div class="mdc-checkbox"
    v-ripple:no-surface&unbounded
  >
                    <input v-bind="idBinding" type="checkbox"
                           class="mdc-checkbox__native-control"
                           />
                    <div class="mdc-checkbox__background">
                        <svg class="mdc-checkbox__checkmark"
                             viewBox="0 0 24 24">
                            <path class="mdc-checkbox__checkmark-path"
                                  fill="none"
                                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                        </svg>
                        <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                    <div class="mdc-checkbox__ripple"></div>
                </div>
</template>

<script>
import { computed } from 'vue'
import ripple from 'D/ripple'
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const idBinding = computed(() => props.id && { id: props.id } )
    return { idBinding }
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/checkbox/mdc-checkbox"
</style>
