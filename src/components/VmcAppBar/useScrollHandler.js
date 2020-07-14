import {onMounted, ref, onUnmounted} from 'vue'
import {numbers, cssClasses} from '@material/top-app-bar/constants'
import {addOrRemove} from '@/util'

const getViewportScrollY = () => window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop;

export default function (props) {
  const rootRef = ref(null)
  const topOffset = ref('0')

  let lastScrollPosition;
  let topAppBarHeight;
  let currentAppBarOffsetTop = 0;

  let wasDocked = true;
  let isDockedShowing = true;

  const handleScrollDefault = () => {
    const currentScrollPosition = Math.max(getViewportScrollY(), 0);

    const diff = currentScrollPosition - lastScrollPosition;
    lastScrollPosition = currentScrollPosition;

    currentAppBarOffsetTop -= diff;

    if (currentAppBarOffsetTop > 0) {
      currentAppBarOffsetTop = 0;
    } else if (Math.abs(currentAppBarOffsetTop) > topAppBarHeight) {
      currentAppBarOffsetTop = -topAppBarHeight;
    }

    moveTopAppBar();
  }

  const moveTopAppBar = () => {
    if (checkForUpdate()) {

      let offset = currentAppBarOffsetTop;
      if (Math.abs(offset) >= topAppBarHeight) {
        offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
      }

      topOffset.value = offset + 'px'
    }
  }

  const checkForUpdate = () => {
    const offscreenBoundaryTop = -topAppBarHeight
    const hasAnyPixelsOffscreen = currentAppBarOffsetTop < 0;
    const hasAnyPixelsOnscreen = currentAppBarOffsetTop > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;

    if (partiallyShowing) {
      wasDocked = false;
    } else {
      if (!wasDocked) {
        wasDocked = true;
        return true;
      } else if (isDockedShowing !== hasAnyPixelsOnscreen) {
        isDockedShowing = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }


  const fixedScrolled = ref(null)
  const handleScrollFixed = () => {
    const currentScroll = getViewportScrollY()
    fixedScrolled.value = currentScroll > 0
  }

  const collapsed = ref(null)
  const handleScrollShort = () => {
    if (props.shortCollapsed) {
      return;
    }

    const currentScroll = getViewportScrollY();
    collapsed.value = currentScroll > 0
  }

  const handleScrollDispatcher = () => {
    if (props.short || props.shortCollapsed) handleScrollShort()
    if (props.absolute) return
    else if (props.fixed) handleScrollFixed()
    else handleScrollDefault()
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScrollDispatcher)
    lastScrollPosition = getViewportScrollY()
    topAppBarHeight = rootRef.value.clientHeight
  })

  onUnmounted(() => {
  })


  return {
    rootRef,
    topOffset,
    fixedScrolled,
    collapsed
  }
}
