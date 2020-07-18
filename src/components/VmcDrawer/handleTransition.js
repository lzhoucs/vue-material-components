import { ref, watch } from 'vue'

export default function (rootRef, props) {
  const state = ref(null)

  watch(() => props.open, open => {
    if (props.dismissible || props.modal) {
      if (open) {
        requestAnimationFrame(() => {
          setTimeout(() => state.value = "opening", 0)
        })
      } else {
        state.value = "closing"
      }
    }

  })

  const handleTransitionEnd = evt => {
    if (evt.target !== rootRef.value) return;

    if (state.value === 'opening') state.value = "opened"
    else if (state.value === 'closing') state.value = "closed"
  }

  return { state, handleTransitionEnd }
}
