<template>
  <li class="mdc-list-item"
    :class="selected && 'mdc-list-item--selected'"
    @click="$emit('selected', selected)"
    v-ripple.noSurface>
    <span v-if="title && subtitle" class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">{{title}}</span>
      <span class="mdc-list-item__secondary-text">{{subtitle}}</span>
    </span>
    <span v-else-if="title" class="mdc-list-item__text">{{title}}</span>
  </li>
</template>

<script>
import ripple from 'D/ripple'

export default {
  name: 'VmcListItem',
  props: {
    title: String,
    subtitle: String,
    selected: Boolean
  },
  directives: {
    ripple
  }
}
</script>
