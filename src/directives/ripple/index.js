

const ACTIVATION_EVENT_TYPES = [
  // only mousedown for now
  'mousedown'
  // 'touchstart',
  // 'pointerdown',
  // 'keydown'
];

const activate = evt => {
  console.log('clicked', evt)

  // layout
  const {
    width,
    height
    // x
    // y
    // top
    // right
    // bottom
    // left
  } = el.getBoundingClientRect();
  const maxDim = Math.max(width, height);
  const hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
  const maxRadius = hypotenuse + MDCRippleFoundation.numbers.PADDING;
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        // Unbounded ripple size should always be even number to equally center align.
        if (this.adapter_.isUnbounded() && initialSize % 2 !== 0) {
            this.initialSize_ = initialSize - 1;
        }
        else {
            this.initialSize_ = initialSize;
        }
        this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
        this.updateLayoutCssVars_();
}
export default {
    // directive definition
    beforeMount: function (el) {
      ACTIVATION_EVENT_TYPES.forEach(evtType => el.addEventListener(evtType, activate));
    }
  }
