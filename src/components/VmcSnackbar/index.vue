<template>
<div class="mdc-snackbar" :class="[
                            open ? css.OPENING : css.CLOSING
                            ]">
  <div class="mdc-snackbar__surface">
    <div class="mdc-snackbar__label"
         role="status"
         aria-live="polite">
      Can't send photo. Retry in 5 seconds.
    </div>
    <div class="mdc-snackbar__actions">
      <button type="button" class="mdc-button mdc-snackbar__action">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">Retry</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {cssClasses as css} from '@material/snackbar/constants'

export default {
  name: "VmcSnackbar",
  props: {
    open: Boolean
  },
  setup() {
    return {
      css
    }
  }
}
</script>

<style lang="sass">
  @use "@material/snackbar/mdc-snackbar"
</style>
