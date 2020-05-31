import {onMounted, watchEffect, ref, onUnmounted} from 'vue'
import {MDCMenuSurface} from '@material/menu-surface';
import {Corner} from '@material/menu-surface/constants';

export default function (props, {emit}) {
  let menuSurface = null

  const surfaceRef = ref(null)

  onMounted(() => {
    menuSurface = new MDCMenuSurface(surfaceRef.value)
    menuSurface.listen('MDCMenuSurface:closed', () => emit('update:modelValue', false))
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
