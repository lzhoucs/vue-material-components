import { watch } from 'vue'


export default function (state, conditionFn, props) {
  watch(() => props.open, open => {
    if (!conditionFn || conditionFn()) {
      if (open) {
        requestAnimationFrame(() => {
          setTimeout(() => state.value = "opening", 0)
        })
      } else {
        state.value = "closing"
      }

    }
  })
}
