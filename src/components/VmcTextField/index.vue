<template>
	<label class="mdc-text-field"
    :class="[
      `mdc-text-field--${mode}`,
      isFocused && 'mdc-text-field--focused',
      shouldFloat && 'mdc-text-field--label-floating',
      !label && 'mdc-text-field--no-label',
      prefixIcon && 'mdc-text-field--with-leading-icon',
      suffixIcon && 'mdc-text-field--with-trailing-icon'
      ]"
    v-ripple:input.noSurface="hasRipple"
  >
  <span class="mdc-text-field__ripple" v-if="hasRipple"></span>

  <vmc-icon class="mdc-text-field__icon mdc-text-field__icon--leading" v-if="prefixIcon">{{prefixIcon}}</vmc-icon>
  <span class="mdc-text-field__affix mdc-text-field__affix--prefix" v-if="prefix">{{prefix}}</span>
  <input @focus="isFocused = true" @blur="isFocused = false" @mousedown="updateTransformOriginXCoordinate" class="mdc-text-field__input" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  <span class="mdc-text-field__affix mdc-text-field__affix--suffix" v-if="suffix">{{suffix}}</span>
  <vmc-icon class="mdc-text-field__icon mdc-text-field__icon--trailing" v-if="suffixIcon">{{suffixIcon}}</vmc-icon>

  <template v-if="mode === 'filled'">
    <vmc-floating-label v-if="label" :float="!!shouldFloat">{{label}}</vmc-floating-label>
    <vmc-line-ripple :transform-origin-x="transformOriginXCoordinate" :active="isFocused"/>
  </template>

  <vmc-notched-outline v-else-if="mode === 'outlined'" :notch-width="notchWidth">
    <vmc-floating-label ref="labelRef" v-if="label" :float="!!shouldFloat">{{label}}</vmc-floating-label>
  </vmc-notched-outline>

</label>

</template>

<script>
import { ref, computed } from 'vue'
import VmcFloatingLabel from 'C/VmcFloatingLabel/index.vue'
import VmcNotchedOutline from 'C/VmcNotchedOutline/index.vue'
import VmcLineRipple from 'C/VmcLineRipple/index.vue'
import VmcIcon from 'C/VmcIcon/index.vue'
import ripple from 'D/ripple'

export default {
  props: {
    mode: {
      type: String,
      default: 'filled'
    },
    label: String,
    modelValue: String,
    prefix: String,
    suffix: String,
    prefixIcon: String,
    suffixIcon: String
  },
  name: 'VmcTextField',
  setup(props) {
    const isFocused = ref(false)

    const shouldFloat = computed(() =>
      props.label && (isFocused.value || props.modelValue
        // || this.isBadInput_()
    ))

    const shouldShake = computed(() =>
      false
      // !this.isFocused_ && !this.isValid() && !!this.getValue()
    )

    const hasRipple = computed(() => props.mode === 'filled')

    const labelRef = ref(null)

    const notchWidth = computed(() =>
      shouldFloat.value && props.mode === 'outlined' ? labelRef.value.getWidth() * 0.75 : null)

    const transformOriginXCoordinate = ref(null)

    const updateTransformOriginXCoordinate = evt => {
      const targetClientRect = evt.target.getBoundingClientRect();
      transformOriginXCoordinate.value = evt.clientX - targetClientRect.left;
    }

    return {
      shouldFloat,
      isFocused, hasRipple,
      transformOriginXCoordinate, updateTransformOriginXCoordinate,
      labelRef, notchWidth
    }
  },
  components: {
    VmcFloatingLabel,
    VmcLineRipple,
    VmcNotchedOutline,
    VmcIcon
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/textfield/mdc-text-field"
// we don't have a separate component for this yet, mostly because no logic is needed at this point
@use "@material/textfield/icon/mdc-text-field-icon"
</style>
