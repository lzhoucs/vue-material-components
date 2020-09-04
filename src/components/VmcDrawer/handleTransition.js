
export default function (rootRef, state) {
  const handleTransitionEnd = evt => {
    if (evt.target !== rootRef.value) return;

    if (state.value === 'opening') state.value = "opened"
    else if (state.value === 'closing') state.value = "closed"
  }

  return handleTransitionEnd
}
