import Tab from './Tab.vue'
import {augmentIconLabel} from 'C/functional-component-factory'

const fn = augmentIconLabel(Tab, {
  iconClass: 'mdc-tab__icon',
  labelClass: 'mdc-tab__text-label'
})
fn._name = "VmcTab"
export default fn
