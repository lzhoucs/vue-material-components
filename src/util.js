import merge from 'lodash/merge'

// TODO which import below is better?
// import { mergeProps as vueMergeProps } from '@vue/runtime-core'
import { mergeProps as vueMergeProps } from 'vue'

// is there  an easier way to do this from vue 3 library?
// TODO found one from @vue/runtime-core, to be refactored
export const mergeClasses = (vnode, classes) => {
  vnode.props = vnode.props || {}
  vnode.props.class = vnode.props.class || ''
  vnode.props.class += ` ${classes}`
}

// note, don't use mergeProps for merging classes, it overrides existing ones since class isn't an object but a string
export const mergeProps = (vnode, props) => {
  vnode.props = vueMergeProps(vnode.props, props)
}

let _uid = 1;
export const uid = () => _uid++

export const isIconComponent = node => node.type && node.type.name === 'VmcIcon'
export const isTabComponent = node => node.type && node.type._name === 'VmcTab'
export const isListChildren = node => node.type && ['VmcListItem', 'VmcListItemDivider'].includes(node.type.name)
export const isListItemComponent = node => node.type && ['VmcListItem'].includes(node.type.name)

export const noChildren = slots => {
  if (!slots.default) return true;
  const children = slots.default()

  if (!children || !children.length) return true;

  if (children.length === 1 && children[0].children === 'v-if') return true;

  return false
}

export const addOrRemove = (arry, item, isAdd = true) => isAdd ?
  ( arry || [] ).concat(item) :
  ( arry || [] ).filter(_item => _item !== item)
