import Fab from './Fab.vue'
import {isIconComponent, mergeClasses} from '@/util'
import { h } from 'vue'

const fabIconClass = 'mdc-fab__icon'
const fabLabelClass = 'mdc-fab__label'

export default (props, {slots, attrs}) => {

    const children = slots.default()
    const oneIconOnly = children.length === 1 && isIconComponent(children[0])

  for (const [indx, vnode] of children.entries()) {
    if (isIconComponent(vnode)) mergeClasses(vnode, fabIconClass)
    else children[indx] = h('span', { class: fabLabelClass }, vnode)
  }
    return h(
      Fab,
      {
        ...attrs,
        extended: !oneIconOnly
      },
      () => children
    )
}
