document.querySelectorAll('.gxme').forEach(gxme => {
  var name = gxme.querySelector('gtitle').innerText.replace(/\s/g, '').toLowerCase();
  gxme.querySelector('img').loading = "lazy";
  gxme.querySelector('img').src = `/img/${name}.png`
    if (gxme.id=='mc') {
      gxme.setAttribute('onclick', `(()=>{
      var opened = window.open('${location.origin}/mc/', '_blank')
      opened.document.body.insertAdjacentHTML('beforeend', '<script async src="https://arc.io/widget.min.js#Uj7TAd9Q"></script>')
      opened.history.pushState(null, null, '${location.origin}/backend/gfiles/')
      })()`)
  } else {
    gxme.setAttribute('onclick', `(()=>{
  var opened = window.open('${location.origin}/gxme', '_blank')
  opened.document.write('<link rel="stylesheet" href="/css/frame.css"></head><iframe src="/gfiles/gfiles/html5/${name}"></iframe><script src="/js/backend.js"></script><script async src="https://arc.io/widget.min.js#Uj7TAd9Q"></script>')
  opened.history.pushState(null, null, '${location.origin}/backend/gfiles/')
    })()`)
  }
})