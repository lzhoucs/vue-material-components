import {numbers, strings, cssClasses} from '@material/ripple/constants'
import {getNormalizedEventCoords} from '@material/ripple/util';
import {applyPassive} from '@material/dom/events';
import {mergeClasses} from '@/util'
import './index.sass';

const MDC_RIPPLE_CLASS = 'mdc-ripple-surface'

const ACTIVATION_EVENT_TYPES = [
  // only mousedown for now
  'mousedown'
  // 'touchstart',
  // 'pointerdown',
  // 'keydown'
];

const POINTER_DEACTIVATION_EVENT_TYPES = [
  // only mouseup for now
  'mouseup'
  // 'touchend',
  // 'pointerup',
  // 'contextmenu'
];

const getWindowPageOffset = () => ({x: window.pageXOffset, y: window.pageYOffset})

const deactivate = evt => {
  const el = evt.currentTarget
  el.removeEventListener('keyup', deactivate)
  requestAnimationFrame(() => {
    removeClass(el, cssClasses.FG_ACTIVATION)
    addClass(el, cssClasses.FG_DEACTIVATION)
    setTimeout(() => {
      removeClass(el, cssClasses.FG_DEACTIVATION);
    }, numbers.FG_DEACTIVATION_MS);
    deleteUIState(el)
  })
}

const isUnbounded = el => containsClass(el, cssClasses.UNBOUNDED)

// calculate and set sizes in states, update css variables
const layout = el => {
  const { width, height } = el.getBoundingClientRect();
  const maxDim = Math.max(width, height);
  const unbounded = isUnbounded(el)
  let maxRadius;

  if (unbounded) {
    maxRadius = maxDim
  } else {
      const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    maxRadius = hypotenuse + numbers.PADDING;
  }

  let initialSize = Math.floor(maxDim * numbers.INITIAL_ORIGIN_SCALE);
  if (unbounded && initialSize % 2 !== 0) {
     initialSize -= 1;
  }

  el.style.setProperty(strings.VAR_FG_SIZE, `${initialSize}px`);
  el.style.setProperty(strings.VAR_FG_SCALE, `${maxRadius / initialSize}`);

  if (unbounded) {
    const left = Math.round((width / 2) - (initialSize / 2));
    const top = Math.round((height / 2) - (initialSize / 2));

    el.style.setProperty(strings.VAR_LEFT, `${left}px`);
    el.style.setProperty(strings.VAR_TOP, `${top}px`);
  }

  updateUIState(el, { initialSize, width, height })
}

const activate = evt => {
  const el = evt.currentTarget._rootEl || evt.currentTarget

  POINTER_DEACTIVATION_EVENT_TYPES.forEach(evtType => addEventListener(el, evtType, deactivate));
  // this sets initialSize in _state
  layout(el)
  const {initialSize, width, height } = getUIState(el)
  const unbounded = isUnbounded(el)

  // animateActivation
  if (!unbounded) {

    let startPoint = getNormalizedEventCoords(evt, getWindowPageOffset(), el.getBoundingClientRect());

    startPoint = {
      x: startPoint.x - (initialSize / 2),
      y: startPoint.y - (initialSize / 2),
    };

    const endPoint = {
      x: (width / 2) - (initialSize / 2),
      y: (height / 2) - (initialSize / 2),
    };
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

    el.style.setProperty(strings.VAR_FG_TRANSLATE_START, translateStart);
    el.style.setProperty(strings.VAR_FG_TRANSLATE_END, translateEnd);
  }

  addClass(el, cssClasses.FG_ACTIVATION);
}

export default {
  // can't use beforeMount because listenerTarget may be a child of el which is not available in beforeMount
    mounted: function (el, {arg, value, modifiers}, vnode ) {
      if (value === false) {
        console.log('Skip ripple for el', el)
        return;
      }

      initState(el)
      addClass(el, cssClasses.ROOT)

      if (!modifiers.noSurface) addClass(el, MDC_RIPPLE_CLASS)
      if (modifiers.unbounded) {
        addClass(el, cssClasses.UNBOUNDED);
      }

      const listenerTarget = arg ? el.querySelector(arg) : el
      if (listenerTarget !== el) listenerTarget._rootEl = el

      ACTIVATION_EVENT_TYPES.forEach(evtType => addEventListener(listenerTarget, evtType, activate));

      addEventListener(listenerTarget, 'focus', () => addClass(el, cssClasses.BG_FOCUSED));
      addEventListener(listenerTarget, 'blur', () => removeClass(el, cssClasses.BG_FOCUSED));

      if (modifiers.unbounded) {
        requestAnimationFrame(() => layout(el))
      }
    },
  updated(el, {value}) {
      if (value === false) {
        console.log('Skip ripple for el', el)
        return;
      }
    el._state.class.forEach(clazz => el.classList.add(clazz))
  }

  }

const initState = el => {
  el._state = {
    class: new Set(),
    uiState: {}
  }
}
const getUIState = el => el._state.uiState
const updateUIState = (el, uiState) => el._state.uiState = uiState
const deleteUIState = el => el._state.uiState = {}

const addClass = (el, clazz) => {
  el._state.class.add(clazz)
  el.classList.add(clazz)
}

const removeClass = (el, clazz) => {
  el._state.class.delete(clazz)
  el.classList.remove(clazz)
}

const containsClass = (el, clazz) => {
  return el._state.class.has(clazz)
}

const addEventListener = (el, evtType, handler) => el.addEventListener(evtType, handler, applyPassive())
