import {numbers, strings, cssClasses} from '@material/ripple/constants'
import {getNormalizedEventCoords} from '@material/ripple/util';
import './index.sass';

const ACTIVATION_EVENT_TYPES = [
  // only mousedown for now
  'mousedown'
  // 'touchstart',
  // 'pointerdown',
  // 'keydown'
];

const getWindowPageOffset = () => ({x: window.pageXOffset, y: window.pageYOffset})

const activate = evt => {

  const el = evt.target

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

//     this.adapter_.addClass(FG_ACTIVATION);
//     this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
}

export default {
    // directive definition
    beforeMount: function (el) {
      ACTIVATION_EVENT_TYPES.forEach(evtType => el.addEventListener(evtType, activate));
    }
  }
