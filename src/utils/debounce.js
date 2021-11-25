/* 防抖 */
export const Debounce = (fn, t) => {
  const delay = t || 1500
  let timer = 0
  return function () {
    const args = arguments
    console.log(timer, '1')
    // if (timer) {
    //   clearTimeout(timer)
    //   console.log(timer, '2')
    // }
    // timer = setTimeout(() => {
    //   fn.apply(this, args)
    // }, delay)

    if (timer) { clearTimeout(timer) }
    const callNow = !timer
    console.log(callNow)
    timer = setTimeout(() => {
      timer = null
    }, delay)

    if (callNow) fn.apply(this, args)
  }
}
