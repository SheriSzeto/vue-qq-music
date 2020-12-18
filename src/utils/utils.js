// 判断 string 类型
export function isString (v) {
  return typeof v === 'string'
}

// http 转化成 https
export function toHttps (url) {
  if (!isString(url)) {
    return url
  }
  return url.replace('http://', 'https://')
}

/**
 * https://github.com/videojs/video.js/blob/master/src/js/utils/promise.js
 * Silence a Promise-like object.
 *
 * This is useful for avoiding non-harmful, but potentially confusing "uncaught
 * play promise" rejection error messages.
 *
 * @param  {Object} value
 *         An object that may or may not be `Promise`-like.
 */
export function isPromise(v) {
  return v !== undefined && v !== null && typeof v.then === 'function'
}

export function silencePromise(value) {
  if (isPromise(value)) {
    value.then(null, () => {})
  }
}