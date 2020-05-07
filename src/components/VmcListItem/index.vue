<template>
  <li class="mdc-list-item"
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
    subtitle: String
  },
  directives: {
    ripple
  }
}
</script>
