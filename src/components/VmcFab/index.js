import Fab from './Fab.vue'
import {isIconComponent, mergeClasses} from '@/util'
import { h } from 'vue'

const fabIconClass = 'mdc-fab__icon'

export default (props, {slots, attrs}) => {

    const children = slots.default()
    const oneIconOnly = children.length === 1 && isIconComponent(children[0])
    children.forEach(vnode => isIconComponent(vnode) && mergeClasses(vnode, fabIconClass))

    return h(
      Fab,
      {
        ...attrs,
        extended: !oneIconOnly
      },
      () => children
    )
}
