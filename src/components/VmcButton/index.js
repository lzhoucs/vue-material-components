import RegularButton from './Button.vue'
import IconButton from './IconButton.vue'
import {mergeClasses} from '@/util'
import { h } from 'vue'

const buttonIconClass = "mdc-button__icon"
const iconButtonIconClass = "mdc-icon-button__icon"

export default (props, {slots, attrs}) => {
  const children = slots.default()
  const component =
        (children.length === 1 || children.length === 2)
        && children.every(child => isIconComponent(child)) ? IconButton : RegularButton

  if (IconButton === component) {
    children.forEach((vnode, indx) => mergeClasses(vnode, iconButtonIconClass + (indx ===0 && children.length === 2 ? ` ${iconButtonIconClass}--on` : '')))
  } else {
    children.filter(vnode => isIconComponent)
            .forEach(vnode => mergeClasses(vnode, buttonIconClass))
   
  }
    return h(
      component,
      attrs,
      children
    )
}

const isIconComponent = node => node.type && node.type.name === 'VmcIcon'
