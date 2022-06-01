onload = (function() {
  document.body.innerHTML = `<div class="task-container"><div class="task-container-table"><div class="task-container-table-entry" style="width: 30%">Task</div><div class="task-container-table-entry" style="">Memory</div></div></div>`
})

var template = `<div class="tmanager-entry"><div class="tab-info"><div class="tab-favicon" style="background-image: url('https://beta.911911911.info/ico/favicon.ico')"></div><div class="tab-title">Tab: Ludicrous</div></div><div class="tab-resources"><div class="tab-memory">240,323K</div></div>\n   \n</div>`

onmessage = (function(m) {
  if (m.data.type=='html') {
    document.body.querySelector('.task-container').insertAdjacentHTML('beforeend', m.data.html)
  }

  if (m.data.type=='update') {
    m.data.info.forEach(detail => {
      console.log(detail)
      if(document.querySelector('#'+detail.id)) {
        var cont = document.querySelector('#'+detail.id);
        if (cont.querySelector('.tab-favicon').style.backgroundImage!==`url("${detail.icon}")`) cont.querySelector('.tab-favicon').style.backgroundImage=`url("${detail.icon}")`

        if (cont.querySelector('.tab-title').innerText!=='Tab: '+detail.title) cont.querySelector('.tab-title').innerText='Tab: '+detail.title

        cont.querySelector('.tab-memory').innerText = detail.memory
      } else {
        document.querySelectorAll('.tmanager-entry').forEach(e=>e.remove())
        document.body.querySelector('.task-container').insertAdjacentHTML('beforeend', m.data.html)
      }
    })
  }
})