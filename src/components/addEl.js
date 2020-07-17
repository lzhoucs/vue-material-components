import {onMounted} from 'vue'

export const addAdjacentElWithClass = (className, refEl) => {
    onMounted(() => {
      const _refEl = refEl.value || refEl
      const parent = _refEl.parentElement;

      if (parent.getElementsByClassName(className).length > 0) return;

      const el = document.createElement('div')
      el.classList.add(className);
      parent.insertBefore(el, _refEl)
    })

}
