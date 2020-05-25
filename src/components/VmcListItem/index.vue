<template>
  <li class="mdc-list-item"
    :class="selected && !$slots.prefix && 'mdc-list-item--selected'"
    @click="$emit('selected', selected)"
    v-ripple.noSurface>

    <vmc-icon class="mdc-list-item__graphic" v-if="prefixIcon">{{prefixIcon}}</vmc-icon>
    <slot v-else name="prefix"></slot>

    <span v-if="title && subtitle" class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">{{title}}</span>
      <span class="mdc-list-item__secondary-text">{{subtitle}}</span>
    </span>
    <span v-else-if="title" class="mdc-list-item__text">{{title}}</span>
  </li>
</template>

<script>
import ripple from 'D/ripple'
import VmcIcon from 'C/VmcIcon/index.vue'

export default {
  name: 'VmcListItem',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    selected: Boolean,
    prefixIcon: String
  },
  directives: {
    ripple
  },
  components: {
    VmcIcon
  }
}
</script>
