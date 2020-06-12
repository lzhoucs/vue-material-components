<template>
  <header class="mdc-top-app-bar" ref="rootRef" :style="{'top': topOffset}"
    :class="[
      fixedFlag && 'mdc-top-app-bar--fixed'
      ]"
  >
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <component :is="navigation"/>
        <span class="mdc-top-app-bar__title">{{title}}</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <component :is="actions"/>
      </section>
    </div>
  </header>
</template>

<script>
import useScrollHandler from './useScrollHandler'
import {mergeClasses} from '@/util'
// import {strings} from '@material/top-app-bar/constants'

export default {
  name: "VmcAppBar",
  props: {
    title: String,
    fixed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {slots}) {
    const {rootRef, topOffset, fixedFlag } = useScrollHandler(...arguments)

    const createNavigationVNode = () => {
      const [navigationVNode] = slots.navigation()

      mergeClasses(navigationVNode, 'mdc-top-app-bar__navigation-icon')
      return navigationVNode
    }

    const createActionVNodes = () => {
      const vnodes = slots.actions()

      vnodes.forEach(vnode => mergeClasses(vnode, 'mdc-top-app-bar__action-item'))
      return vnodes
    }

    return {
      rootRef,
      topOffset,
      fixedFlag,
      navigation: () => createNavigationVNode(),
      actions: () => createActionVNodes()
    }
  }

}
</script>

<style lang="sass">
  @use "@material/top-app-bar/mdc-top-app-bar"
</style>
