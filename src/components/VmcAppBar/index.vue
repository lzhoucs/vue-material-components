<template>
  <header class="mdc-top-app-bar" ref="rootRef" :style="{'top': topOffset}"
    :class="[
      absolute && 'absolute-top-app-bar',
      fixed && 'mdc-top-app-bar--fixed',
      fixedScrolled && 'mdc-top-app-bar--fixed-scrolled',

      (short || shortCollapsed) && 'mdc-top-app-bar--short',
      (short || shortCollapsed) && hasActions && 'mdc-top-app-bar--short-has-action-item',
      (shortCollapsed || collapsed) && 'mdc-top-app-bar--short-collapsed',

      dense && 'mdc-top-app-bar--dense',
      prominent && 'mdc-top-app-bar--prominent'
      ]"
  >
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <component :is="navigation"/>
        <span class="mdc-top-app-bar__title">{{title}}</span>
      </section>
      <section v-if="hasActions" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <component :is="actions"/>
      </section>
    </div>
  </header>
</template>

<script>
import useScrollHandler from './useScrollHandler'
import {mergeClasses} from '@/util'
import {addAdjacentElWithClass} from 'C/addEl'
import {onMounted} from 'vue'

export default {
  name: "VmcAppBar",
  props: {
    title: String,

    // add position: absolute and disable scroll behavor
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    short: {
      type: Boolean,
      default: false
    },
    shortCollapsed: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    prominent: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {slots}) {
    if (props.short && props.shortCollapsed) {
      console.warn('short and shortCollapsed should not be used at the same time')
    }

    const actionsCount = slots.actions ? slots.actions().length : 0
    if ((props.short || props.shortCollapsed) && actionsCount > 1) {
      console.warn('short top app bars should be used with no more than 1 action item')
    }

    const {rootRef, topOffset, fixedScrolled, collapsed} = useScrollHandler(...arguments)

    // maybge we can be a bit smarter, but for now let's assume immediate parent has position: relative/absolute
    // we also not worry about the specified class by props for now
    addAdjacentElWithClass('mdc-top-app-bar--fixed-adjust', rootRef)

    const createNavigationVNode = () => {
      if (slots.navigation) {
        const [navigationVNode] = slots.navigation()
        mergeClasses(navigationVNode, 'mdc-top-app-bar__navigation-icon')
        return navigationVNode
      }
      return null
    }

    const createActionVNodes = () => {
      const vnodes = slots.actions()

      vnodes.forEach(vnode => mergeClasses(vnode, 'mdc-top-app-bar__action-item'))
      return vnodes
    }

    return {
      rootRef,
      topOffset,
      fixedScrolled,
      collapsed,
      navigation: () => createNavigationVNode(),
      actions: () => createActionVNodes(),
      hasActions: actionsCount > 0
    }
  }

}
</script>

<style lang="sass" scoped>
.absolute-top-app-bar
  position: absolute
</style>
<style lang="sass">
  @use "@material/top-app-bar/mdc-top-app-bar"
</style>
