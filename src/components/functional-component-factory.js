import FormField from 'C/VmcFormField/index.vue'
import { h } from 'vue'
import {isIconComponent, mergeClasses} from '@/util'

export const formFieldDelegate = component => (props, {slots, attrs}) => {
  if (slots.default) {
    // it means we have a label
    return h(
      FormField, {
        // TODO this doesn't look right, however it works. All I wanted is pass default slot content as `label` prop
        label: slots.default()[0].children
      },
      ({id}) => h(component, {
        ...attrs,
        id })
    )
  } else {
    return h(component, attrs)
  }
}



export const augmentIconLabel = (component, {iconClass, labelClass, complexProp}) => (props, {slots, attrs}) => {
    const children = slots.default()
    const oneIconOnly = children.length === 1 && isIconComponent(children[0])

  for (const [indx, vnode] of children.entries()) {
    if (isIconComponent(vnode)) mergeClasses(vnode, iconClass)
    else children[indx] = h('span', { class: labelClass }, vnode)
  }
    return h(
      component,
      {
        ...attrs,
        ...(!oneIconOnly && complexProp)
      },
      () => children
    )
}
