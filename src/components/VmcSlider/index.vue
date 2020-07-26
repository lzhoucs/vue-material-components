<template>
  <div ref="rootRef" class="mdc-slider"
    :class="[
      inTransit && 'mdc-slider--in-transit',
      active && 'mdc-slider--active'
      ]"
  >
    <div class="mdc-slider__track-container">
      <div class="mdc-slider__track" :style="trackStyle"></div>
    </div>
    <div ref="thumbRef" class="mdc-slider__thumb-container" :style="thumbStyle">
      <svg class="mdc-slider__thumb" width="21" height="21">
        <circle cx="10.5" cy="10.5" r="7.875"></circle>
      </svg>
      <div class="mdc-slider__focus-ring"></div>
    </div>
  </div></template>

<script>
import { onMounted, ref } from 'vue'
import {getCorrectEventName, getCorrectPropertyName} from '@material/animation/util';
import {applyPassive} from '@material/dom/events';

const DOWN_EVENTS = ['mousedown', 'touchstart'];
const UP_EVENTS = ['mouseup', 'touchend'];

const MOVE_EVENT_MAP = {
  mousedown: 'mousemove',
  pointerdown: 'pointermove',
  touchstart: 'touchmove',
};

export default {
  name: 'VmcSlider',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    },
    disabled: Boolean
  },
  setup(props, {emit}) {
    const rootRef = ref(null)
    const thumbRef = ref(null)
    // const trackRef = ref(null)
    const trackStyle = ref(null)
    const thumbStyle = ref(null)

    const inTransit = ref(false)
    const active = ref(false)

    let handlingThumbTargetEvt = false
    let rect;

    const computeValueFromClientX = clientX => {
      const xPos = clientX - rect.left;
      let pctComplete = xPos / rect.width;

      return props.min + pctComplete * (props.max - props.min);
    }

    const setValue = evt => {
      const clientX = evt.targetTouches && evt.targetTouches.length > 0 ?
        evt.targetTouches[0].clientX :
        evt.clientX;

      let value = computeValueFromClientX(clientX);

      if (value === props.modelValue) {
        return;
      }

    const valueSetToBoundary = value === props.min || value === props.max;
    // TODO step
      // if (props.step && !valueSetToBoundary) {
      // value = this.quantize_(value);
      // }

      if (value < props.min) {
        value = props.min;
      } else if (value > props.max) {
        value = props.max;
      }
      value = value || 0; // coerce -0 to 0

      console.log(value)
      emit('update:modelValue', value)
      // TODO refactoring - watch value
      updateUIForCurrentValue();
    }


    const handleDownEvent = downEvt => {
      if (props.disabled) {
        return;
      }
      console.log('down')
      inTransit.value = !handlingThumbTargetEvt
      handlingThumbTargetEvt = false;
      active.value = true

      const moveHandler = evt => {
        console.log('move')
        evt.preventDefault();
        setValue(evt);
      };

      const moveEventType = MOVE_EVENT_MAP[downEvt.type];

      // TODO refactoring. maybe a more vue way is available
      const upHandler = () => {
        console.log('up')
        active.value = false

        document.body.removeEventListener(moveEventType, moveHandler);
        UP_EVENTS.forEach(evtName => document.body.removeEventListener(evtName, upHandler));
      };

      document.body.addEventListener(moveEventType, moveHandler);
      UP_EVENTS.forEach(evtName => document.body.addEventListener(evtName, upHandler));

      setValue(downEvt)
    }



    const registerEvents = () => {
      DOWN_EVENTS.forEach((evtName) => {

        rootRef.value.addEventListener(evtName, handleDownEvent, applyPassive())
        thumbRef.value.addEventListener(evtName, () => handlingThumbTargetEvt = true, applyPassive())
      })
    }

    const layout = () => {
      rect = rootRef.value.getBoundingClientRect()
      updateUIForCurrentValue();
    }

    const updateUIForCurrentValue = () => {
      const pctComplete = (props.modelValue - props.min) / (props.max - props.min);

      const translatePx = pctComplete * rect.width;
      // no RTL support yet
      // if (this.adapter_.isRTL()) {
      //   translatePx = this.rect_.width - translatePx;
      // }

      const hasWindow = typeof window !== 'undefined';
      const transformProp = hasWindow ? getCorrectPropertyName(window, 'transform') : 'transform';

      if (inTransit.value) {
        // TODO refactoring. maybe a more vue way is available
        const transitionendEvtName = hasWindow ? getCorrectEventName(window, 'transitionend') : 'transitionend';

        const onTransitionEnd = () => {
          inTransit.value = false
          thumbRef.value.removeEventListener(transitionendEvtName, onTransitionEnd, applyPassive())
        };

        thumbRef.value.addEventListener(transitionendEvtName, onTransitionEnd, applyPassive())

      }
      requestAnimationFrame(() => {
        console.log(translatePx, pctComplete)
        thumbStyle.value = {
          [transformProp]: `translateX(${translatePx}px) translateX(-50%)`
        }
        trackStyle.value = {
          [transformProp]: `scaleX(${pctComplete})`
        }
      })

    }

    onMounted(() => {
      registerEvents()
      layout()
    })

    return {
      rootRef,
      thumbRef,
      trackStyle,
      thumbStyle,
      inTransit,
      active
    }

  }
}
</script>

<style lang="sass">
  @use "@material/slider/mdc-slider"
</style>
