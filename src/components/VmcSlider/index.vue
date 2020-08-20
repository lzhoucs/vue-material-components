<template>
  <div ref="rootRef" class="mdc-slider"
    :class="[
      inTransit && 'mdc-slider--in-transit',
      active && 'mdc-slider--active',
      discrete && 'mdc-slider--discrete',
      marker && 'mdc-slider--display-markers'
      ]"
  >
    <div class="mdc-slider__track-container">
      <div class="mdc-slider__track" :style="trackStyle"></div>
      <div class="mdc-slider__track-marker-container" :style="markerStyle"></div>
    </div>

    <div ref="thumbRef" class="mdc-slider__thumb-container" :style="thumbStyle">
      <div v-if="discrete" class="mdc-slider__pin">
        <span class="mdc-slider__pin-value-marker">{{modelValue}}</span>
      </div>

      <svg class="mdc-slider__thumb" width="21" height="21">
        <circle cx="10.5" cy="10.5" r="7.875"></circle>
      </svg>
      <div class="mdc-slider__focus-ring"></div>
    </div>
  </div></template>

<script>
import { onMounted, ref, watchEffect, computed } from 'vue'
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
    disabled: Boolean,
    discrete: Boolean,
    marker: Boolean
  },
  setup(props, {emit}) {
    const rootRef = ref(null)
    const thumbRef = ref(null)
    // const trackRef = ref(null)
    const trackStyle = ref(null)
    const thumbStyle = ref(null)
    const markerStyle = ref(null)

    const inTransit = ref(false)
    const active = ref(false)

    const resolvedStep = computed(() => props.discrete && props.step === 0 ? 1 : props.step)

    let handlingThumbTargetEvt = false
    let rect;

    const computeValueFromClientX = clientX => {
      const xPos = clientX - rect.left;
      let pctComplete = xPos / rect.width;

      return props.min + pctComplete * (props.max - props.min);
    }

    const quantize = value => Math.round(value / resolvedStep.value) * resolvedStep.value;

    const setValue = evt => {
      const clientX = evt.targetTouches && evt.targetTouches.length > 0 ?
                                                                      evt.targetTouches[0].clientX :
                                                                      evt.clientX;

      let value = computeValueFromClientX(clientX);

      if (value === props.modelValue) {
        return;
      }

      const valueSetToBoundary = value === props.min || value === props.max;
      if (resolvedStep.value && !valueSetToBoundary) {
        value = quantize(value);
      }

      if (value < props.min) {
        value = props.min;
      } else if (value > props.max) {
        value = props.max;
      }
      value = value || 0; // coerce -0 to 0

      emit('update:modelValue', value)
    }


    const handleDownEvent = downEvt => {
      if (props.disabled) {
        return;
      }
      inTransit.value = !handlingThumbTargetEvt
      handlingThumbTargetEvt = false;
      active.value = true

      const moveHandler = evt => {
        evt.preventDefault();
        setValue(evt);
      };

      const moveEventType = MOVE_EVENT_MAP[downEvt.type];

      // TODO refactoring. maybe a more vue way is available
      const upHandler = () => {
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
        thumbStyle.value = {
          [transformProp]: `translateX(${translatePx}px) translateX(-50%)`
        }
        trackStyle.value = {
          [transformProp]: `scaleX(${pctComplete})`
        }
      })

    }

    const setupTrackMarker = () => {
      if (props.discrete && props.marker) {
        const stepStr = resolvedStep.value.toLocaleString();
        const maxStr = props.max.toLocaleString();
        const minStr = props.min.toLocaleString();
        // keep calculation in css for better rounding/subpixel behavior
        const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
        const markerWidth = `2px`;
        const markerBkgdImage = `linear-gradient(to right, currentColor ${
            markerWidth}, transparent 0)`;
        const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${
            markerAmount}) 100% repeat-x`;
        const markerBkgdShorthand = `${markerBkgdImage} ${markerBkgdLayout}`;

        markerStyle.value = {
          'background': markerBkgdShorthand
        }
      }
    }

    onMounted(() => {
      registerEvents()

      layout()

      watchEffect(() => {
        // TODO double run problem, maybe a vue bug
        updateUIForCurrentValue()
        setupTrackMarker()
      })
    })

    return {
      rootRef,
      thumbRef,
      trackStyle,
      thumbStyle,
      markerStyle,
      inTransit,
      active
    }

  }
}
</script>

<style lang="sass">
  @use "@material/slider/mdc-slider"
</style>
