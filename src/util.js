// import merge from 'lodash/merge'

// is there  an easier way to do this from vue 3 library?
export const mergeClasses = (vnode, classes) => {
  vnode.props = vnode.props || {}
  vnode.props.class = vnode.props.class || ''
  vnode.props.class += ` ${classes}`
}

let _uid = 1;
export const uid = () => _uid++

export const isIconComponent = node => node.type && node.type.name === 'VmcIcon'
