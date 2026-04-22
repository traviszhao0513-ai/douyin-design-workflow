import { useRef, useState } from 'react'

const DRAG_START_DELTA = 4
const DEFAULT_THRESHOLD = 30
const DEFAULT_MAX_PULL = 66
const OVERFLOW_RESISTANCE = 0.4

function dampDistance(distance, threshold, maxPull) {
  const positiveDistance = Math.max(0, distance)
  const limitedDistance = Math.min(positiveDistance, maxPull)

  if (limitedDistance <= threshold) return limitedDistance

  const overflow = limitedDistance - threshold
  return threshold + overflow * OVERFLOW_RESISTANCE
}

export default function useSwipeReply({
  disabled = false,
  threshold = DEFAULT_THRESHOLD,
  maxPull = DEFAULT_MAX_PULL,
  onTrigger,
}) {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const gestureRef = useRef(null)
  const hapticRef = useRef(false)

  const resetGesture = () => {
    gestureRef.current = null
    hapticRef.current = false
    setDragX(0)
    setIsDragging(false)
    setIsReady(false)
  }

  const maybeVibrate = () => {
    if (hapticRef.current || typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return

    navigator.vibrate(10)
    hapticRef.current = true
  }

  const handlePointerDown = (event) => {
    if (disabled || (event.pointerType === 'mouse' && event.button !== 0)) return

    gestureRef.current = {
      active: false,
      pointerId: event.pointerId,
      rawDx: 0,
      startX: event.clientX,
      startY: event.clientY,
    }
    hapticRef.current = false
  }

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current

    if (!gesture || gesture.pointerId !== event.pointerId) return

    const rawDx = event.clientX - gesture.startX
    const rawDy = Math.abs(event.clientY - gesture.startY)

    if (!gesture.active) {
      if (rawDx < DRAG_START_DELTA) return
      if (rawDx <= rawDy) {
        resetGesture()
        return
      }

      gesture.active = true
      try {
        event.currentTarget.setPointerCapture?.(event.pointerId)
      } catch {
        // Some scripted pointer environments cannot capture; dragging still works without it.
      }
      setIsDragging(true)
    }

    if (!gesture.active) return

    gesture.rawDx = rawDx
    if (event.cancelable) event.preventDefault()

    const nextReady = rawDx >= threshold
    setDragX(dampDistance(rawDx, threshold, maxPull))
    setIsReady(nextReady)

    if (nextReady) maybeVibrate()
  }

  const finishGesture = (event) => {
    const gesture = gestureRef.current

    if (!gesture || gesture.pointerId !== event.pointerId) return

    const shouldTrigger = gesture.active && gesture.rawDx >= threshold

    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId)
    } catch {
      // Pointer capture may already be released; ignore.
    }

    resetGesture()
    if (shouldTrigger) onTrigger?.()
  }

  return {
    bind: {
      onPointerCancel: resetGesture,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishGesture,
    },
    dragX,
    isDragging,
    isReady,
    progress: Math.min(dragX / threshold, 1),
  }
}
