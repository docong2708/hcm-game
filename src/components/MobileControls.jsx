import { useEffect, useState } from 'react'

function isTouchLikeDevice() {
  return (
    window.innerWidth < 900 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
}

function MobileControls({ onInputChange, onInteract }) {
  const [isVisible, setIsVisible] = useState(() => isTouchLikeDevice())
  const [pressedButton, setPressedButton] = useState(null)

  useEffect(() => {
    function handleResize() {
      setIsVisible(isTouchLikeDevice())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isVisible) {
    return null
  }

  function setButton(button, isPressed) {
    if (button === 'interact') {
      if (isPressed) {
        onInteract()
      }
      setPressedButton(isPressed ? button : null)
      return
    }

    onInputChange(button, isPressed)
    setPressedButton(isPressed ? button : null)
  }

  function getButtonHandlers(button) {
    function press(event) {
      event.preventDefault()
      if (typeof event.pointerId === 'number') {
        event.currentTarget.setPointerCapture?.(event.pointerId)
      }
      setButton(button, true)
    }

    function release(event) {
      event.preventDefault()
      setButton(button, false)
      if (typeof event.pointerId === 'number') {
        event.currentTarget.releasePointerCapture?.(event.pointerId)
      }
    }

    return {
      onPointerDown: press,
      onPointerUp: release,
      onPointerCancel: release,
      onPointerLeave: release,
      onTouchStart: press,
      onTouchEnd: release,
    }
  }

  return (
    <div className="mobile-controls" aria-label="Điều khiển cảm ứng">
      <div className="mobile-controls-left">
        <button
          aria-label="Chạy trái"
          className={`control-btn ${pressedButton === 'left' ? 'is-pressed' : ''}`}
          type="button"
          {...getButtonHandlers('left')}
        >
          ◀
        </button>
        <button
          aria-label="Chạy phải"
          className={`control-btn ${pressedButton === 'right' ? 'is-pressed' : ''}`}
          type="button"
          {...getButtonHandlers('right')}
        >
          ▶
        </button>
      </div>

      <div className="mobile-controls-right">
        <button
          aria-label="Nhảy"
          className={`control-btn control-btn-jump ${
            pressedButton === 'jump' ? 'is-pressed' : ''
          }`}
          type="button"
          {...getButtonHandlers('jump')}
        >
          ⬆
        </button>
        <button
          aria-label="Tương tác"
          className={`control-btn control-btn-interact ${
            pressedButton === 'interact' ? 'is-pressed' : ''
          }`}
          type="button"
          {...getButtonHandlers('interact')}
        >
          E
        </button>
      </div>
    </div>
  )
}

export default MobileControls
