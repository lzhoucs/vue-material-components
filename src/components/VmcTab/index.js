import Tab from './Tab.vue'
import {augmentIconLabel} from 'C/functional-component-factory'

export default augmentIconLabel(Tab, {
  iconClass: 'mdc-tab__icon',
  labelClass: 'mdc-tab__text-label'
})
