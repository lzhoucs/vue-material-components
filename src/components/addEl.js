import {onMounted} from 'vue'

const insert = (className, refEl, before = true) => {
    onMounted(() => {
      const _refEl = refEl.value || refEl
      const parent = _refEl.parentElement;

      if (parent.getElementsByClassName(className).length > 0) return;

      const el = document.createElement('div')
      el.classList.add(className);
      if (before) parent.insertBefore(el, _refEl)
      else _refEl.nextElementSibling ? parent.insertBefore(el, _refEl.nextElementSibling) : parent.append(el)
    })
}
export const insertBefore = (className, refEl) => insert(className, refEl, true)
export const insertAfter = (className, refEl) => insert(className, refEl, false)
