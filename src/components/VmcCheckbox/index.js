import Checkbox from './Checkbox.vue'
import FormField from 'C/VmcFormField/index.vue'
import { h } from 'vue'

export default (props, {slots, attrs}) => {
  if (slots.default) {
    // it means we have a label
    return h(
      FormField, {
        // TODO this doesn't look right, however it works. All I wanted is pass default slot content as `label` prop
        label: slots.default()[0].children
      },
      ({id}) => h(Checkbox, { id })
    )
  } else {
    return h(Checkbox, attrs)
  }
}
