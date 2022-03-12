<template>
<div class="mdc-snackbar" :class="[
                            open ? css.OPENING : css.CLOSING,
                            state === 'opening' && css.OPEN
                            ]">
  <div class="mdc-snackbar__surface">
    <div class="mdc-snackbar__label"
         role="status"
         aria-live="polite">
      Can't send photo. Retry in 5 seconds.
    </div>
    <div class="mdc-snackbar__actions">
      <vmc-button class="mdc-snackbar__action">
        {{ actionButtonText }}
      </vmc-button>
    </div>
  </div>
</div>
</template>

<script>
import {cssClasses as css} from '@material/snackbar/constants'
import useState from 'C/use-state'
import { ref } from 'vue'
import VmcButton from "C/VmcButton"

export default {
  name: "VmcSnackbar",
  props: {
    open: Boolean,
    actionButtonText: {
      type: String,
      default: 'OK'
    }
  },
  setup() {
    const state = ref(null)

    useState(state, null, ...arguments)
    return {
      css,
      state
    }
  },
  components: {
    VmcButton
  }
}
</script>

<style lang="sass">
  @use "@material/snackbar/mdc-snackbar"
</style>
