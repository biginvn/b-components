const caretCoordinates = function (b, e, f) {
  return new Promise((resolve, reject) => {
    if (!h)
      throw Error(
        'textarea-caret-position#getCaretCoordinates should only be called in a browser'
      )
    if ((f = (f && f.debug) || !1)) {
      var a = document.querySelector(
        '#input-textarea-caret-position-mirror-div'
      )
      a && a.parentNode.removeChild(a)
    }
    a = document.createElement('div')
    a.id = 'input-textarea-caret-position-mirror-div'
    document.body.appendChild(a)
    var c = a.style,
      d = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
      k = 'INPUT' === b.nodeName
    c.whiteSpace = 'pre-wrap'
    k || (c.wordWrap = 'break-word')
    c.position = 'absolute'
    f || (c.visibility = 'hidden')
    l.forEach(function (a) {
      k && 'lineHeight' === a ? (c.lineHeight = d.height) : (c[a] = d[a])
    })
    m
      ? b.scrollHeight > parseInt(d.height) && (c.overflowY = 'scroll')
      : (c.overflow = 'hidden')
    a.textContent = b.value.substring(0, e)
    k && (a.textContent = a.textContent.replace(/\s/g, '\u00a0'))
    var g = document.createElement('span')
    g.textContent = b.value.substring(e) || '.'
    a.appendChild(g)
    b = {
      top: g.offsetTop + parseInt(d.borderTopWidth),
      left: g.offsetLeft + parseInt(d.borderLeftWidth),
      height: parseInt(d.lineHeight),
    }
    f ? (g.style.backgroundColor = '#aaa') : document.body.removeChild(a)
    resolve(b)
  })
}
let l = 'direction boxSizing width height overflowX overflowY borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth borderStyle paddingTop paddingRight paddingBottom paddingLeft fontStyle fontVariant fontWeight fontStretch fontSize fontSizeAdjust lineHeight fontFamily textAlign textTransform textIndent textDecoration letterSpacing wordSpacing tabSize MozTabSize'.split(
    ' '
  ),
  h = 'undefined' !== typeof window,
  m = h && null != window.mozInnerScreenX
export default caretCoordinates
