import {onMounted, watchEffect, ref, onUnmounted} from 'vue'
import {MDCMenuSurface} from '@material/menu-surface';
import {Corner, strings} from '@material/menu-surface/constants';

export default function (props, {emit}) {
  let menuSurface = null

  const surfaceRef = ref(null)

  onMounted(() => {
    menuSurface = new MDCMenuSurface(surfaceRef.value)
    menuSurface.listen(strings.CLOSED_EVENT, () => emit('update:modelValue', false))
    // assuming first child is the list
    menuSurface.listen(strings.OPENED_EVENT, () => surfaceRef.value.firstElementChild.focus())
    props.corner && menuSurface.setAnchorCorner(Corner[props.corner])
  })

  onUnmounted(() => {
    menuSurface.destroy()
    menuSurface = null
  })

  watchEffect(() => {
    const open = props.modelValue
    if (menuSurface && open) {
      menuSurface.open()
    } else if (menuSurface && !open) {
      menuSurface.close()
    }
  })

  return {
    surfaceRef
  }
}
