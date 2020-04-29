import Checkbox from './Checkbox.vue'
import FormField from 'C/VmcFormField/index.vue'
import { h } from 'vue'
import {formFieldDelegate} from 'C/functional-component-factory'

export default formFieldDelegate(Checkbox)
