function gxmeFilter(el) {
  el.value = el.value.toLowerCase()
  if (el.value=='') document.querySelectorAll('.setting').forEach(gxme => gxme.style.display="block");
  document.querySelectorAll('.setting').forEach(gxme => gxme.querySelector('.setting-title').innerText.toLowerCase().includes(el.value)?gxme.style.display="block":gxme.style.display="none")
}

function searchReset(e) {
  document.querySelector('.gxme-search').value = ''
  gxmeFilter({value: ''})
  //document.querySelector('.gxme-search').blur()
}

var defaults = '{"appearance": "auto", "cookies": "true", "cloak": {"icon": "", "title": ""}, "localStorage": "true", "sessionStorage": "true", "browser": "true"}'

var Settings = JSON.parse(localStorage['ld-browser-settings']||defaults)

function updateSettings(e) {
  localStorage['ld-browser-settings'] = JSON.stringify(e)
}

if (JSON.stringify(Settings)==JSON.stringify(JSON.parse(defaults))) localStorage['ld-browser-settings'] = defaults

if (Settings.appearance) {
  document.querySelector('input[name=btheme][value="'+Settings.appearance+'"]').setAttribute('checked', '');
}

if (localStorage['ld-setting-theme']) {
  document.querySelector('input[name=theme][value="'+localStorage['ld-setting-theme']+'"]').setAttribute('checked', '');
}

if (Settings.cloak) {
  document.querySelector('#title-input').value = Settings.cloak.title
  document.querySelector('#icon-input').value = Settings.cloak.icon
}

if (Settings.localStorage) {
  if (Settings.localStorage=='true') document.querySelector('#ls-check').setAttribute('checked', '')

  if (Settings.localStorage=='false') document.querySelector('#ls-check').removeAttribute('checked')
}

if (Settings.sessionStorage) {
  if (Settings.sessionStorage=='true') document.querySelector('#ss-check').setAttribute('checked', '')

  if (Settings.sessionStorage=='false') document.querySelector('#ss-check').removeAttribute('checked')
}

if (Settings.browser) {
  if (Settings.browser=='true') document.querySelector('#browser-check').setAttribute('checked', '')

  if (Settings.browser=='false') document.querySelector('#browser-check').removeAttribute('checked')
}

document.querySelectorAll('input[type=checkbox]').forEach(e=>{
  e.onclick = function(ev) {
    if (e.checked) {
      if (e.id=='cookie-check') Settings['cookies'] = 'true';
      if (e.id=='ls-check') Settings['sessionStorage'] = 'true';
      if (e.id=='ss-check') Settings['localStorage'] = 'true';
      if (e.id=='browser-check') Settings['browser'] = 'true';
    }

    if (!e.checked) {
      if (e.id=='cookie-check') Settings['cookies'] = 'false';
      if (e.id=='ls-check') Settings['sessionStorage'] = 'false';
      if (e.id=='ss-check') Settings['localStorage'] = 'false';
      if (e.id=='browser-check') Settings['browser'] = 'false';
    }

    updateSettings(Settings)
  }
})

document.querySelectorAll('input[type=radio]').forEach(e=>{
  e.onclick = function(ev) {
    if (e.name=='btheme') Settings.appearance = e.value;
    if (e.name=='theme') localStorage['ld-setting-theme'] = e.value

    console.log(window.opener)

    if (e.name=='theme') opener.postMessage(['theme', e.value], '*')

    if (JSON.parse(localStorage['ld-browser-settings']).appearance!==Settings.appearance) {
      if (top.document.querySelector('link[href="/css/browserdark.css"]')) {
        if (Settings.appearance=='auto') {
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) top.document.querySelector('link[href="/css/browserdark.css"]').removeAttribute('disabled'); else top.document.querySelector('link[href="/css/browserdark.css"]').setAttribute('disabled', '')
        }

        if (Settings.appearance=='dark') {
          top.document.querySelector('link[href="/css/browserdark.css"]').removeAttribute('disabled')
        }

        if (Settings.appearance=='light') {
          top.document.querySelector('link[href="/css/browserdark.css"]').setAttribute('disabled', '')
        }
      }
    }

    updateSettings(Settings)
  }
})

document.querySelectorAll('input[type=text]').forEach(e=>{
  e.onkeydown = function(ev) {
    if (ev.key=='Enter') {
      if (e.id=='title-input') setTitle(e.value)
      if (e.id=='icon-input') setIcon(e.value)
    }
  }
})

function setTitle(title) {
  document.title = title;
  localStorage['title'] = title
}

function setIcon(url) {
  try {new URL(url); localStorage['icon'] = '/client/'+url} catch {localStorage['icon'] = url}

  var link = document.head.querySelector('link[rel=icon]')

  if (link) link.href = localStorage['icon']
}

document.querySelectorAll('.setting-button').forEach((e,i)=>{
  if (i==0) e.onclick = function() {
    setIcon(document.querySelector('#icon-input').value)
  }

  if (i==1) e.onclick = function() {
    setTitle(document.querySelector('#title-input').value)
  }
})