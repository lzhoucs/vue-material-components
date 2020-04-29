import Fab from './Fab.vue'
import {augmentIconLabel} from 'C/functional-component-factory'

export default augmentIconLabel(Fab, {
  iconClass: 'mdc-fab__icon',
  labelClass: 'mdc-fab__label'
})
