import {numbers, strings, cssClasses} from '@material/ripple/constants'
import {getNormalizedEventCoords} from '@material/ripple/util';
import {applyPassive} from '@material/dom/events';
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
        el.classList.remove(cssClasses.FG_ACTIVATION)
        el.classList.add(cssClasses.FG_DEACTIVATION)
        setTimeout(() => {
          el.classList.remove(cssClasses.FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
        el._state = {}
      })
}

const activate = evt => {
  const el = evt.currentTarget
  const state = el._state

  POINTER_DEACTIVATION_EVENT_TYPES.forEach(evtType => addEventListener(el, evtType, deactivate));

  // layoutInternal
  const { width, height } = el.getBoundingClientRect();
  const maxDim = Math.max(width, height);
  const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const maxRadius = hypotenuse + numbers.PADDING;
  const initialSize = Math.floor(maxDim * numbers.INITIAL_ORIGIN_SCALE);

    const {
      VAR_FG_SIZE, VAR_FG_SCALE
    } = strings;

  el.style.setProperty(VAR_FG_SIZE, `${initialSize}px`);
  el.style.setProperty(VAR_FG_SCALE, `${maxRadius / initialSize}`);


  // animateActivation
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = strings;
    const {FG_DEACTIVATION, FG_ACTIVATION} = cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = numbers;


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

    el.style.setProperty(VAR_FG_TRANSLATE_START, translateStart);
    el.style.setProperty(VAR_FG_TRANSLATE_END, translateEnd);

    el.classList.add(cssClasses.FG_ACTIVATION);
}

const needsRippleClass = el => !['mdc-button'].some(cls => el.classList.contains(cls))

export default {
    // directive definition
    beforeMount: function (el) {
      el._state = {}
      el.classList.add(cssClasses.ROOT)

      if (needsRippleClass(el)) el.classList.add(MDC_RIPPLE_CLASS)

      ACTIVATION_EVENT_TYPES.forEach(evtType => addEventListener(el, evtType, activate));
    }
  }

const addEventListener = (el, evtType, handler) => el.addEventListener(evtType, handler, applyPassive())
