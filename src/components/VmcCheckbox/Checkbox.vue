<template>
  <div class="mdc-checkbox"
    :class="_checked && 'mdc-checkbox--selected'"
    v-ripple.noSurface.unbounded
  >
                    <input v-bind="idBinding" type="checkbox"
                           class="mdc-checkbox__native-control"
                      :checked="_checked"
                      @change="updateChecked($event.target.checked)"
                      v-model="_checked"
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
import { computed, ref, watchEffect } from 'vue'
import ripple from 'D/ripple'
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      required: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {

    // TODO reusable
    const _checked = ref(false)
    watchEffect(() => _checked.value = props.checked)

    const updateChecked = val => {
      _checked.value = val
      emit('update:checked', val)
    }

    const idBinding = computed(() => props.id && { id: props.id } )
    return { idBinding, _checked, updateChecked }
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/checkbox/mdc-checkbox"
</style>
