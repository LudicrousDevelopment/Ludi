document.querySelectorAll('.game').forEach(game => {
    var name = game.querySelector('gtitle').innerText.replace(/\s/g, '').toLowerCase();
    game.querySelector('img').loading = "lazy";
    game.querySelector('img').src = `/img/${name}.png`
    game.setAttribute('onclick', `(()=>{
var opened = window.open('${location.origin}/game', '_blank')
opened.document.write('<link rel="stylesheet" href="/css/frame.css"></head><iframe src="/webretro/?core=${name}"></iframe><script src="/js/backend.js"></script><script async src="https://arc.io/widget.min.js#Uj7TAd9Q"></script>')
opened.history.pushState(null, null, '${location.origin}/backend/gfiles/')
  })()`)
})