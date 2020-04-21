import RegularButton from './Button.vue'
import IconButton from './IconButton.vue'
import { h } from 'vue'

export default (props, {slots, attrs}) => {
  const children = slots.default()
  const component = children.length === 1 && isIconComponent(children[0]) ? IconButton : RegularButton

    return h(
      component,
      attrs,
      children
    )
}

const isIconComponent = node => node.type && node.type.name === 'VmcIcon'
