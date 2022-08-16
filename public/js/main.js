(async function() {

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; 
  
  var Settings = JSON.parse(localStorage['ld-browser-settings']||'{"appearance": "auto", "cookies": "true", "cloak": {"icon": "", "title": ""}, "localStorage": "true", "sessionStorage": "true", "browser": "true"}')

  if (Settings.browser=='false') {
    return location.href = '/main/'
  }

  if ((Settings.appearance=='auto'&&isDarkMode)||Settings.appearance=='dark') {
    document.querySelector('link[href="/css/browserdark.css"]').removeAttribute('disabled')
  }

  if ((Settings.appearance=='auto'&&(!isDarkMode))||Settings.appearance=='light') {
    document.querySelector('link[href="/css/browserdark.css"]').setAttribute('disabled', '');
  }
  
  var el = document.querySelector('.chrome-tabs')
  var chromeTabs = new ChromeTabs()

  window.chromeTabs = chromeTabs

  document.querySelector('.surface').style.visibility = 'hidden'
  
  if (window.location.hash) {
    window.location.hash = '';
    location.reload(1)
  }
  
  /*if ((localStorage['ld-window-save']==null)&&(sessionStorage['ld-window-save']==null)) {
    await Swal.fire({
      title: 'Toggle Fullscreen?',
      icon: 'info',
      text: 'This can always be toggled by opening the top right menu and clicking "Enter Fullscreen"',
      showDenyButton: true,
      confirmButtonText: 'Open',
      denyButtonText: `Don't Open`,
      input: 'checkbox',
      inputPlaceholder: 'Save my Choice',
    }).then((result) => {
      result.value && localStorage.setItem('ld-window-save', result.isConfirmed);
      if (!result.value) return;
      return document.body.requestFullscreen();
    })
  } else {
    if (localStorage['ld-window-save']=='true') sessionStorage['ld-window-save'] = 'true';
  }*/

  function showCookies() {
    
  }

  document.querySelector('.surface').style.visibility = 'visible'
  
  function TLDCheck(phrase) {
    if (phrase.includes(' ')) throw new Error('sus')
    var extension = (phrase.split('/').find(e=>e.includes('.'))||'').split('.').pop().replace(/\//gi, '');
    if (window.tld.indexOf(extension)>-1) return 'https://'+phrase
    throw new Error('sus')
  }

  function Locate(url, elem, tabElem) {
    elem.querySelector('.mock-browser-search-omni').style.display = 'none';

    elem.querySelector('input').blur()
    if (elem.querySelector('input').onblur) elem.querySelector('input').onblur()

    var val = elem.querySelector('input').value
    var extension = (val.split('/').find(e=>e.includes('.'))||'').split('.').pop().replace(/\//gi, '');

    if (val.startsWith('ludicrous://')) {
      return elem.querySelector('iframe').contentWindow.location.href = location.origin+'/browser/'+val.split('/').pop()+'.html'+'?fake='+val
    }

    if (val.startsWith('about:')) {
      return elem.querySelector('iframe').contentWindow.location.href = location.origin+'/browser/blank.html'+'?fake='+val
    }

    if (val.includes('.')&&window.tld.indexOf(extension)>-1) {
      if (!val.startsWith('http')) val = 'https://'+val
    } else {
      val = 'https://google.com/search?q='+val
    }

    elem.querySelector('input').value = val.replace('https://','').replace('http://','')

    var value = ''
    if (val.startsWith(location.origin)) value = val; else switch(localStorage['ld-setting-main-pick']||'ultraviolet') {
      case "ultraviolet":
        value = '/sw/'+xor(val, 3)
        break;
      case "rhodium":
        value = '/client/'+val
        break;
      default:
        break;
    }

    vall = val

    elem.querySelector('.mock-browser-reload i').classList.remove('fa-arrow-rotate-right');
    elem.querySelector('.mock-browser-reload i').classList.add('fa-xmark');

    tabElem.querySelector('.chrome-tab-title').innerText = val
    tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage = 'url("/ico/dark.ico")'

    return elem.querySelector('iframe').contentWindow.location.href = value;
  }
  
  async function OmniBox(elem, tabElem) {
    var omnibox = elem.querySelector('.mock-browser-search-omni')
  
    omnibox.onmouseover = function() {
      omnibox.hover = true;
    }
  
    omnibox.onmouseleave = function() {
      omnibox.hover = false;
    }
  
    elem.querySelector('input').onblur = function() {
      if(omnibox.hover) return;
      elem.querySelector('.mock-browser-input').classList.remove('noradius')
      elem.querySelector('.mock-browser-search-omni').style.display = ''
      elem.querySelector('.mock-browser-search-omni').innerHTML = ''
    }
  
    var fetched = await fetch('/bare/v1/', {
      method: 'GET',
      headers: {
        'x-bare-headers': JSON.stringify({Host: 'duckduckgo.com'}),
        'x-bare-forward-headers': '[]',
        'x-bare-host': 'duckduckgo.com',
        'x-bare-protocol': 'https:',
        'x-bare-port': 443,
        'x-bare-path': '/ac/?q=' + encodeURIComponent(elem.querySelector('input').value)
      },
    });
  
    var json = await fetched.json();
    if (json.length>0) {
      elem.querySelector('.mock-browser-input').classList.add('noradius')
      omnibox.innerHTML = json.map(e=>{if (e.phrase.startsWith('https://')){try {new URL(e.phrase); return `<div class="omni-entry"><ion-icon name="earth-outline"></ion-icon>${e.phrase}`} catch {}} else {try {TLDCheck(e.phrase); return `<div class="omni-entry"><ion-icon name="earth-outline"></ion-icon>${e.phrase}`} catch {}};return `<div class="omni-entry"><ion-icon name="search-outline"></ion-icon>${e.phrase}`}).join('</div>')
      omnibox.querySelectorAll('.omni-entry').forEach(entry => {
        entry.addEventListener('click', function() {
          elem.querySelector('.mock-browser-input').classList.remove('noradius')
          var value = entry.innerText;
          if (entry.querySelector('ion-icon[name="earth-outline"]')) {
            elem.querySelector('input').value = value
            elem.dispatchEvent(new KeyboardEvent('keypress', {which: 13, keyCode: 13, key: "Enter"}))
            return omnibox.style.display = 'none';
          }
          elem.querySelector('input').value = 'https://google.com/search?q='+encodeURIComponent(value);
          elem.dispatchEvent(new KeyboardEvent('keypress', {which: 13, keyCode: 13, key: "Enter"}))
          return omnibox.style.display = 'none';
        })
      })
      return omnibox.style.display = 'block'
    }
  }
  
  document.querySelector('.chrome-tabs-create').addEventListener('contextmenu', function(e) {e.preventDefault(); return false;})
  
  onmousemove = function(e){window.clientX=e.clientX,window.clientY=e.clientY}
  
  function rCl(element){ var evt = document.createEvent('MouseEvents'); var RIGHT_CLICK_BUTTON_CODE = 2;
                               evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, RIGHT_CLICK_BUTTON_CODE, null); return evt
  }
  
  onbeforeunload = function() {
    arguments[0].preventDefault();
    return false;
  }
  
  function Position(el) {
    var rect = el.getBoundingClientRect();
    var computed = getComputedStyle(el);
    return {x: rect.left, y: rect.top+parseInt(computed.height.replace('px',''))+parseInt(computed.paddingTop.replace('px',''))+parseInt(computed.paddingBottom.replace('px',''))}
  }

  var TabMenu = [
    {type: 'button', text: 'New Tab', click: function() {
      chromeTabs.addTab({
        title: 'Ludicrous',
        favicon: '/ico/favicon.ico'
      })
      tabMenu.hide(true)
    }},
    {type: 'button', text: 'Name Window', click: function() {window.name = prompt('Name this Window');tabMenu.hide(true)}},
    {type: 'separator'},
    {type: 'button', text: 'Task Manager', click: function(){window.TaskManager();tabMenu.hide(true)}}
  ]

  var tabMenu = new Contextify(TabMenu, 'light', document.querySelector('.chrome-tabs-hidden'))
  
  function GetPerformanceInfo() {
    function nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
    
    return [...document.querySelectorAll('.mock-browser-frame')].map(frame => {
      var icon = ((frame.contentDocument.head.querySelector('link[rel=icon]')||frame.contentDocument.head.querySelector('link[rel="shortcut icon"]')||frame.contentDocument.head.querySelector('meta[itemprop="image"]'))||{href: '/ico/dark.ico'})
      icon = icon.href||icon.content
      
      var title = frame.contentDocument.title;
  
      try {
        var value = frame.contentWindow.__uv.location.href
      } catch {
        try {
          var value = frame.contentWindow.$Rhodium.location.href
        } catch {
          try {
            var value = frame.contentWindow.__get$Loc(frame.contentWindow.location).href
          } catch {
            value = frame.contentWindow.location.href;               
            if (new URLSearchParams((frame.contentWindow.location.search)).get('fake')!==null) value = new URLSearchParams((frame.contentWindow.location.search)).get('fake');
          }
        }
      }
  
      if (!icon.startsWith('data:')) if (icon&&!icon.startsWith('http')) icon = new URL(value).origin+(icon.startsWith('/')?icon:('/'+icon))
  
      return {icon: ('/client/'+icon)||'/ico/dark.ico', title: title, memory: /*nFormatter(frame.contentWindow.performance.memory.usedJSHeapSize, 3)*/'N/A', url: value, id: frame.parentElement.id}
    })
  }
  
  function TaskManagerHTML(info) {
    function nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
  
    return info.map(data => {
        return `<div class="tmanager-entry" id="${data.id}"><div class="tab-info"><div class="tab-favicon" style="background-image: url('${data.icon}')"></div><div class="tab-title">Tab: ${data.title}</div></div><div class="tab-resources"><div class="tab-memory">unavailable</div></div>`
    }).join('</div>')
  }
  
  window.TaskManager = function TaskManager() {
    ;/*if (!window.performance.memory) {
      return Swal.fire({
      title: 'Memory API Not Supported',
      icon: 'error',
      text: 'Please Make Sure you are Using a Chromium-Based Browser, such as Edge and Chrome. Task Manager is not supported on your device.',
    })
    } */
    var win = window.open(location.origin+'/browser/taskmanager.html?'+Math.floor(Math.random()*(999999-100000)+100000), '_blank', 'popup=yes,fullscreen=yes,menubar=no,location=no,toolbar=no,status=no,width=600,height=250')
    win.addEventListener('load', function() {
      var info = GetPerformanceInfo();
      win.postMessage({type: 'html', html: TaskManagerHTML(info), raw: info})
  
      win.int = setInterval(function() {
        if (!win.window) return clearInterval(win.int);
  
        var info = GetPerformanceInfo();
  
        win.postMessage({type: 'update', info: info, html: TaskManagerHTML(info)})
      }, 1000)
    })
  
    window.addEventListener('beforeunload', function() {
      win.close(true)
    })
  }
  
  chromeTabs.closedTabs = []
  
  function HideContext(event) {
    if (sessionStorage['ld-window-save']) {document.body.requestFullscreen();sessionStorage.removeItem('ld-window-save')};
    if (!event.path) return;
    
    if (!(event.path.find(e=>e instanceof window.HTMLElement?e.classList.contains('context'):false))) {
      (document.querySelector('.context')||document.createElement('div')).remove()
    } else return ;
  }
  
  (function() {
    var ctxMenu = [
      {
        type: 'button',
        text: 'Enter Fullscreen',
        click: function() {document.body.requestFullscreen();tabMenu.hide(true)}
      },
      {type: 'separator'},
      {
        type: 'button',
        text: 'New Tab',
        click: function() { 
          chromeTabs.addTab({
            title: 'Ludicrous',
            favicon: '/ico/favicon.ico'
          })
          ctx.hide(true)
        } 
      },
      {
        type: 'button',
        text: 'New Window',
        click: function() {
          ctx.hide(true)
          var win = window.open(location.href+'#a', '_blank', 'popup=yes,fullscreen=yes,menubar=no,location=no,toolbar=no,status=no,width='+window.outerWidth+',height='+window.outerHeight)
          win.sessionStorage.setItem('ld-window-save', 1)
          win.location.reload()
        }
      },
      { type: 'separator'},
      {
        type: 'button',
        text: 'History',
        click: function() {
          ctx.hide(true)
        }
      },
      {
        type: 'button',
        text: 'Share',
        click: function() {
          ctx.hide(true)
        }
      },
      {
        type: 'button',
        text: 'Developer Tools',
        click: function() {
          ctx.hide(true)
        }
      },
      { type: 'separator'},
      {
        type: 'button',
        text: 'Settings',
        click: function() {
          ctx.hide(true)
        }
      }
    ]
    var ctx = new Contextify(ctxMenu, 'light', document.querySelector('.mock-browser-menu-open'));

    ctx.interval = setInterval(function() {
      if (document.fullscreenElement) ctxMenu[0].text = 'Exit Fullscreen';
      if (document.fullscreenElement) return ctxMenu[0].click = function() {document.body.exitFullscreen();ctx.hide(true)};
  
      ctxMenu[0].text = 'Enter Fullscreen';
      ctxMenu[0].click = function() {document.body.requestFullscreen();ctx.hide(true)}
    })

    ctx.interval2 = setInterval(function() {
      if (document.fullscreenElement) ctxMenu[0].text = 'Exit Fullscreen';
      if (document.fullscreenElement) return ctxMenu[0].click = function() {document.exitFullscreen();ctx.hide(true)};
  
      ctxMenu[0].text = 'Enter Fullscreen';
      ctxMenu[0].click = function() {document.body.requestFullscreen();ctx.hide(true)}
    })
  
    document.querySelector('.mock-browser-menu-open').addEventListener('click', ctx.contextEvent)
  })()
  
  window.addEventListener('mousedown', HideContext)
  
  function loaded(document) {
    if (!document) return false;
    return document.readyState === "complete";
  }
  
  function clearCache(window, reloadAfterClear = true) {
      if('caches' in window){
          caches.keys().then((names) => {
              names.forEach(async (name) => {
                  await caches.delete(name)
              })
          })
  
          if(reloadAfterClear)
              window.location.reload(true)
      }
  }
  
  if (!localStorage['saved-hosts']) localStorage['saved-hosts'] = JSON.stringify([]);
  
  var xor = (str, key) => (str.split('').map((char, ind) => ind % key ? String.fromCharCode(char.charCodeAt() ^ key) : char).join(''));
  
  chromeTabs.init(el)
  
  window.id = 0;
  
  document.querySelector('.chrome-tabs-create').addEventListener('click', () => {
    chromeTabs.addTab({
      title: 'Ludicrous',
      favicon: '/ico/favicon.ico'
    })
  })
  
  el.addEventListener('activeTabChange', ({ detail }) => {
    var el = detail.tabEl
    
    document.querySelectorAll('.mock-browser-tab').forEach(e=>e.style.display='none');
    
    document.querySelector('#mock-browser-'+el.dataset['tabId']).style.display = 'block'
  })
  
  el.addEventListener('tabAdd', ({ detail }) => {
    var el = detail.tabEl

    if (document.querySelectorAll('.chrome-tab').length>0) document.querySelector('.mock-browser-menu-open').style.display = 'flex'
  
    var tabHistory = [];
    var tabHistoryState = -1;
    
    id++
    
    el.setAttribute('data-tab-id', id)
    
    document.querySelector('.mock-browser-content').insertAdjacentHTML('beforeend', `
    <div class="mock-browser-tab" id="mock-browser-${id}"><div class="mock-browser-controls"><span class="mock-browser-move-control" id="history-backward"><i class="fa-solid fa-arrow-left"></i></span><span class="mock-browser-move-control" id="history-forward"><i class="fa-solid fa-arrow-right"></i></span><span class="mock-browser-reload"><i class="fa-solid fa-xmark"></i></span><span class="mock-browser-open-home"><i class="fa-solid fa-house"></i></span><span class="mock-browser-search-input"><img class="mock-browser-icon" src="/ico/favicon.ico" onerror="//this.src='/img/transparent.png'"><input class="mock-browser-input" placeholder="Search Google or Enter a URL" value="${detail.oUrl||''}"><div class="mock-browser-search-omni"></div></span></div><iframe class="mock-browser-frame" src="${detail.url||"/main/?noshow"}"></iframe></div>
    `)
  
    var elem = document.querySelector('div#mock-browser-'+id)

    var tabElem = document.querySelector('.chrome-tab[data-tab-id="'+id+'"]')

  
    var subMenu = [
        { 
          icon: 'fa-twitter', 
          type: 'button', 
          hotkey: 'Alt + 1', 
          text: 'Close Tabs to the Right', 
          click: function(event) { 
            // Do something
          } 
        },
        { 
          icon: 'fa-facebook', 
          type: 'button', 
          hotkey: 'Alt + 1', 
          text: 'Close Tabs to the Left', 
          click: function(event) { 
            // Do something
          } 
        },
        { 
          icon: 'fa-instagram', 
          type: 'button', 
          hotkey: 'Alt + 1', 
          text: 'Close Other Tabs', 
          click: function(event) { 
            // Do something
          } 
        },
    ];
  
    elem.querySelector('input').focus()
  
    subMenu.interval = setInterval(function() {
      if (!elem.querySelector('iframe').contentWindow) return clearInterval(subMenu.interval)
      if (document.querySelectorAll('.chrome-tab').length==1) {
        subMenu[0].enabled = false;
        subMenu[1].enabled = false;
        subMenu[2].enabled = false;
      } else {
        subMenu[0].enabled = true;
        subMenu[1].enabled = true;
        subMenu[2].enabled = true;
      }
    })
  
    var testMenu = {};
    Object.defineProperty(testMenu, 'siteMenu', {
      get() {
        if (elem.querySelector('.mock-browser-icon').src==location.origin+'/ico/favicon.ico') {
          return [
            {type: 'text', text: "You're viewing a secure Ludicrous page."}
          ]
        }
        return [
          {type: 'text', text: new URL(currentURL).host},
          {type: 'separator'},
          {type: 'text', text: 'Connection is Secure'},
          {type: 'button', text: 'Cookies', click: showCookies}
        ]
      }
    })
  
    function iconMenu() {
      var pos = Position(elem.querySelector('.mock-browser-icon'));
  
      var menu = new Contextify(testMenu.siteMenu, 'light', document.createElement('div'))
  
      menu.onopen = function() {
        elem.querySelector('.mock-browser-icon').style.background = 'rgb(0,0,0,0.3)';
      }
  
      menu.onclose = function() {
        elem.querySelector('.mock-browser-icon').style.background = null
      }
  
      menu.show(pos.x, pos.y)
    }
  
    elem.querySelector('.mock-browser-icon').addEventListener('click', iconMenu)
    elem.querySelector('.mock-browser-icon').addEventListener('contextMenu', iconMenu)
  
    var mainMenu = [
        { 
          icon: 'fa-home', 
          type: 'button', 
          hotkey: 'Ctrl + 1', 
          text: 'New Tab', 
          click: function() { 
            chromeTabs.addTab({
              title: 'Ludicrous',
              favicon: '/ico/favicon.ico'
            })
            contextMenu.hide(true)
          } 
        },
        { 
          icon: 'fa-share', 
          type: 'button', 
          text: 'Duplicate Tab', 
          click: function() { 
            contextMenu.hide(true)
            chromeTabs.addTab({
              title: tabElem.querySelector('.chrome-tab-title').innerText,
              favicon: tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage.replace(/url\("(.*)"\)/gi, '$1'),
              url: elem.querySelector('iframe').contentWindow.location.href,
            })
          } 
        },
        { 
          icon: 'fa-share', 
          type: 'button', 
          text: 'Reload Tab', 
          click: function() { 
            contextMenu.hide(true)
            elem.querySelector('iframe').contentWindow.location.reload(false)
          } 
        },
        { type: 'separator'},
        { 
          icon: 'fa-share', 
          type: 'button', 
          text: 'Close Multiple Tabs', 
          child: subMenu 
        },
        { 
          icon: 'fa-share', 
          type: 'button', 
          text: 'Close Tab', 
          click: function() { 
            contextMenu.hide(true)
            chromeTabs.removeTab(tabElem)
          } 
        },
        { type: 'separator'},
        { 
          icon: 'fa-times-circle', 
          type: 'button', 
          text: 'Cancel', 
          click: function() { 
            contextMenu.hide(true)
          } 
        }
    ];
  
    var contextMenu = new Contextify(mainMenu, "light", tabElem);
  
    var reloadMenu = [
      {
        type: 'button',
        text: 'Normal Refresh',
        click: function() {
          contextMenu2.hide(true)
          elem.querySelector('iframe').contentWindow.location.reload(0)
        }
      },
      {
        type: 'button',
        text: 'Hard Refresh',
        click: function() {
          contextMenu2.hide(true)
          elem.querySelector('iframe').contentWindow.location.reload(1)
        }
      },
      {
        type: 'button',
        text: 'Clear Cache and Hard Refresh',
        click: function() {
          contextMenu2.hide(true)
          clearCache(elem.querySelector('iframe').contentWindow, 1)
        }
      }
    ];
  
    var contextMenu2 = new Contextify(reloadMenu, 'light', elem.querySelector('.mock-browser-reload'))
  
    elem.querySelector('.mock-browser-reload').addEventListener('mousedown', function() {
      elem.querySelector('.mock-browser-reload').timeout = setTimeout(function() {
        (contextMenu2.show(window.clientX-1, window.clientY-1))
      }, 1500)
    })
  
    elem.querySelector('.mock-browser-reload').addEventListener('mouseout', function() {
      clearTimeout(elem.querySelector('.mock-browser-reload').timeout)
    })
  
    elem.querySelector('.mock-browser-reload').addEventListener('mouseup', function() {
      clearTimeout(elem.querySelector('.mock-browser-reload').timeout)
    })
  
    elem.querySelector('input').addEventListener('input', function() {
      if (elem.querySelector('input').value=='') {
        elem.querySelector('input').blur()
        elem.querySelector('input').focus()
      }
    })
  
    elem.addEventListener('input', (e)=>{
      var oVal = e.target.value
      setTimeout(function() {
        if (elem.querySelector('input').isblur) return;
        if (oVal==elem.querySelector('input').value) OmniBox(elem, tabElem);
      }, 200)
      elem.querySelector('.mock-browser-icon').classList.remove('fa-solid')
      elem.querySelector('.mock-browser-icon').classList.remove('fa-lock')
      var value = elem.querySelector('input').value
      var extension = (value.split('/').find(e=>e.includes('.'))||'').split('.').pop().replace(/\//gi, '');
  
      elem.querySelector('.mock-browser-icon').outerHTML = elem.querySelector('.mock-browser-icon').outerHTML.replace(/div/g,'img')
      elem.querySelector('.mock-browser-icon').addEventListener('click', iconMenu)
      elem.querySelector('.mock-browser-icon').addEventListener('contextMenu', iconMenu)
  
      if (value.includes('.')&&window.tld.indexOf(extension)>-1) {
        var host = new URL('https://'+value.replace('https://','')).host
        var hosts = JSON.parse(localStorage['saved-hosts'])
  
        var found = hosts.find(e=>e.host==host)
        if (found) {
          var icon = found.icon;
  
          return elem.querySelector('.mock-browser-icon').src = '/client/'+icon
        }
        elem.querySelector('.mock-browser-icon').src = '/ico/dark.ico'
      } else {
        if (elem.querySelector('.mock-browser-icon').src != location.origin+'/ico/favicon.ico') elem.querySelector('.mock-browser-icon').src = '/ico/favicon.ico'
      }
    })
  
    elem.querySelector('.mock-browser-open-home').addEventListener('click', () => {
      elem.querySelector('iframe').contentWindow.location.href = location.origin+'/main/'
    })
  
    elem.interval2 = setInterval(function() {
      if (!elem.querySelector('iframe').contentWindow) return clearInterval(elem.interval2)
  
      if (tabHistory.length==tabHistoryState+1) {
        elem.querySelector('#history-forward').style.color = 'grey'
        elem.querySelector('#history-forward').style.background = 'transparent';
        elem.querySelector('#history-forward').style.cursor = 'initial'
      } else {
        elem.querySelector('#history-forward').style.color = 'black'
        elem.querySelector('#history-forward').style.background = '';
        elem.querySelector('#history-forward').style.cursor = ''
      }
  
      if ((tabHistoryState==-1)||(new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')!==null)) {
        elem.querySelector('#history-backward').style.color = 'grey'
        elem.querySelector('#history-backward').style.background = 'transparent';
        elem.querySelector('#history-backward').style.cursor = 'initial'
      } else {
        elem.querySelector('#history-backward').style.color = 'black'
        elem.querySelector('#history-backward').style.background = '';
        elem.querySelector('#history-backward').style.cursor = ''
      }
    })
  
    elem.querySelector('#history-forward').addEventListener('click', () => {
      if (tabHistory.length==tabHistoryState+1) return;
      elem.querySelector('iframe').contentWindow.location.href = (tabHistory[tabHistoryState+1])
      tabHistoryState++
    })
  
    elem.querySelector('#history-backward').addEventListener('click', () => {
      if (tabHistoryState==-1) return;
      elem.querySelector('iframe').contentWindow.location.href = (tabHistory[tabHistoryState-1])||'/main/?noshow'
      tabHistoryState--
    })
  
    elem.querySelector('.mock-browser-reload').addEventListener('click', ()=>{
      if (elem.querySelector('.mock-browser-reload i').classList.contains('fa-xmark')) {elem.querySelector('.mock-browser-reload i').classList.add('fa-arrow-rotate-right');elem.querySelector('.mock-browser-reload i').classList.remove('fa-xmark');return elem.querySelector('iframe').contentWindow.stop()};
      elem.querySelector('iframe').contentWindow.location.reload()
      elem.querySelector('.mock-browser-reload i').classList.remove('fa-arrow-rotate-right');
      elem.querySelector('.mock-browser-reload i').classList.add('fa-xmark');
    })
  
    var vall;
    var currentURL;
    var doneURL;
    
    elem.querySelector('iframe').onloadstart = function() {
      
      elem.querySelector('.mock-browser-input').classList.remove('noradius')
      elem.querySelector('.mock-browser-search-omni').style.display = ''
      elem.querySelector('.mock-browser-search-omni').innerHTML = ''
      if (elem.querySelector('iframe').contentWindow.location.href==location.href) return (elem.querySelector('iframe').contentWindow.location.href=location.origin+'/main/')
      if (elem.querySelector('iframe').contentWindow.location.href.startsWith('ludicrous://')) {
        //console.log('settings')
        //elem.querySelector('iframe').contentWindow.l
      }
    }
    
    elem.querySelector('iframe').onload = function() {

      if (tabElem.dataset['opener']) elem.querySelector('iframe').contentWindow.opener = document.querySelector('#mock-browser-'+tabElem.dataset['opener']).querySelector('iframe').contentWindow

      console.log(elem.querySelector('iframe').opener)

      /*elem.querySelector('iframe').contentWindow.open = function(url) {
        var ourl = url+'';
        if (url.startsWith('about:')) {url = '/browser/blank.html?fake='+url}
        else {
          var e = elem.querySelector('iframe').contentDocument.createElement('a');
          e.href = url;
          if (url.startsWith(location.origin)) url = url; else switch(localStorage['ld-setting-main-pick']||'ultraviolet') {
            case "ultraviolet":
              url = '/sw/'+xor(e.href, 3)
              break;
            case "rhodium":
              url = '/client/'+e.href
              break;
            default:
              break;
          }
        }

        var id = (chromeTabs.addTab({
          title: ourl,
          favicon: '/ico/dark.ico',
          url: url,
          fakeUrl: ourl,
          opener: tabElem.dataset['tabId']
        })).dataset['tabId']

        document.querySelector('#mock-browser-'+id).querySelector('iframe').contentWindow.opener = elem.querySelector('iframe').contentWindow;

        return document.querySelector('#mock-browser-'+id).querySelector('iframe').contentWindow
      }*/

      elem.querySelector('iframe').contentWindow.close = function() {
        return chromeTabs.removeTab(tabElem);
      }

      elem.querySelector('.mock-browser-input').classList.remove('noradius')
      elem.querySelector('.mock-browser-search-omni').style.display = ''
      elem.querySelector('.mock-browser-search-omni').innerHTML = ''
  
  elem.querySelector('iframe').contentWindow.onbeforeunload = function() {
        elem.querySelector('.mock-browser-input').classList.remove('noradius')
        elem.querySelector('.mock-browser-search-omni').style.display = ''
        elem.querySelector('.mock-browser-search-omni').innerHTML = ''
        elem.querySelector('.mock-browser-reload i').classList.remove('fa-arrow-rotate-right');
        elem.querySelector('.mock-browser-reload i').classList.add('fa-xmark');
        if (elem.querySelector('iframe').contentWindow.location.href.includes('/sw/')||elem.querySelector('iframe').contentWindow.location.href.includes('/client/')) tabElem.querySelector('.chrome-tab-title').innerText = 'Loading'
        tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage = 'url("/ico/dark.ico")'
      }
  
      if (tabHistory[tabHistoryState]!==elem.querySelector('iframe').contentWindow.location.href&&(new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')==null)) {
        tabHistoryState++
        tabHistory.splice(tabHistoryState, 0, elem.querySelector('iframe').contentWindow.location.href)
      }
  
      elem.querySelector('iframe').contentWindow.addEventListener('mousedown', HideContext)
  
      var val = vall;
  
      elem.querySelector('.mock-browser-reload i').classList.remove('fa-xmark');
      elem.querySelector('.mock-browser-reload i').classList.add('fa-arrow-rotate-right');
      //if (elem.querySelector('iframe').contentWindow.location.href==location.origin+'/main/') return;
      var fake = true
      if (elem.querySelector('iframe').contentWindow.location.href.startsWith('about:')||(((new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake'))||'').startsWith('about:'))||(new URLSearchParams(new URL(elem.querySelector('iframe').src).search).get('fake')||'').startsWith('about:')) {fake = false; elem.querySelector('input').value = 'about:blank'};

      if (new URLSearchParams(new URL(elem.querySelector('iframe').contentWindow.location.href).search).get('noshow')=='') {elem.querySelector('input').value = ''; fake = false};
      try {
        var value = elem.querySelector('iframe').contentWindow.__uv.location.href
      } catch {
        try {
          var value = elem.querySelector('iframe').contentWindow.$Rhodium.location.href
        } catch {
          try {
            var value = elem.querySelector('iframe').contentWindow.__get$Loc(elem.querySelector('iframe').contentWindow.location).href
          } catch {
            if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')==null) value = elem.querySelector('iframe').contentWindow.location.href;               
            if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')!==null) value = new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake');
          }
        }
      }

          console.log(value)
  
      currentURL = value;
      if (fake&&(new URL(value).protocol=='https:')) {
        elem.querySelector('.mock-browser-icon').src = '';
        elem.querySelector('.mock-browser-icon').outerHTML = elem.querySelector('.mock-browser-icon').outerHTML.replace(/img/g,'div')
        elem.querySelector('.mock-browser-icon').addEventListener('click', iconMenu)
        elem.querySelector('.mock-browser-icon').addEventListener('contextMenu', iconMenu)
        elem.querySelector('.mock-browser-icon').classList.add('fa-solid')
        elem.querySelector('.mock-browser-icon').classList.add('fa-lock')
      }
  
      if (fake&&(new URL(value).pathname=='/')) value = value.replace(/\/$/gi,'')
      if (fake) elem.querySelector('input').value = value.replace('https://','').replace('http://','');
  
      if (fake) doneURL = value.replace('https://','').replace('http://','');
  
      var host = new URL(value||location.origin).host;
  
      fetch('/icon/'+host).then(e=>e.text()).then(icon => {
        var hosts = JSON.parse(localStorage['saved-hosts'])
  
        var found = hosts.findIndex(e=>e.host==host);
        if (found==-1) hosts.push({host: host, icon: icon});
        if (hosts[found]) hosts[found].icon = icon
  
        if (val) var found2 = hosts.findIndex(e=>e.host==new URL(val).host)
        if (val) if (found2==-1) hosts.push({host: new URL(val).host, icon: icon})
        if (val) if (hosts[found2]) hosts[found2].icon = icon

        localStorage['saved-hosts'] = JSON.stringify(hosts)
      })
      elem.interval = setInterval(function() {
        if (!elem.querySelector('iframe').contentWindow) return clearInterval(elem.interval)
        if (!loaded(elem.querySelector('iframe').contentDocument)) return ;
        try {
          var value = elem.querySelector('iframe').contentWindow.__uv.location.href
        } catch {
          try {
            var value = elem.querySelector('iframe').contentWindow.$Rhodium.location.href
          } catch {
            try {
              var value = elem.querySelector('iframe').contentWindow.__get$Loc(elem.querySelector('iframe').contentWindow.location).href
            } catch {
              if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')==null) value = elem.querySelector('iframe').contentWindow.location.href;               
              else if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')!==null) value = new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake');
  
              else value = elem.querySelector('iframe').contentWindow.location.href
            }
          }
        }
        var link = elem.querySelector('iframe').contentDocument.head.querySelector('link[rel=icon]')||elem.querySelector('iframe').contentDocument.head.querySelector('link[rel="shortcut icon"]')||elem.querySelector('iframe').contentDocument.head.querySelector('meta[itemprop="image"]')
  
        if (link) var href = link.href||link.content;
  
        if (href&&!href.startsWith('http')) href = new URL(value).origin+(href.startsWith('/')?href:('/'+href))
        
        tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage = `url("${href?'/client/'+href:'/ico/dark.ico'}")`
        if (href&&href.startsWith('data:')) tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage = `url("${href}")`;
        try {
          var value = elem.querySelector('iframe').contentWindow.__uv.location.href
        } catch {
          try {
            var value = elem.querySelector('iframe').contentWindow.$Rhodium.location.href
          } catch {
            try {
              var value = elem.querySelector('iframe').contentWindow.__get$Loc(elem.querySelector('iframe').contentWindow.location).href
            } catch {
              if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')==null) value = elem.querySelector('iframe').contentWindow.location.href;               
              if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')!==null) value = new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake');
            }
          }
        }
        if (tabElem.querySelector('.chrome-tab-title').innerText!=(elem.querySelector('iframe').contentDocument.title||value)) tabElem.querySelector('.chrome-tab-title').innerText = elem.querySelector('iframe').contentDocument.title||value
        if (elem.style.display=='block'&&elem.querySelector('input').value!==elem.querySelector('iframe').contentWindow.location.href) {
  
          try {
            var value = elem.querySelector('iframe').contentWindow.__uv.location.href
          } catch {
            try {
              var value = elem.querySelector('iframe').contentWindow.$Rhodium.location.href
            } catch {
              try {
                var value = elem.querySelector('iframe').contentWindow.__get$Loc(elem.querySelector('iframe').contentWindow.location).href
              } catch {
                if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('noshow')==null) value = elem.querySelector('iframe').contentWindow.location.href;               
                if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')!==null) value = new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake');
              }
            }
          }
          //tabElem.querySelector('.chrome-tab-title').innerText = elem.querySelector('iframe').contentDocument.title||value
          if (document.activeElement==elem.querySelector('input')) return false;

          if (value.startsWith(location.origin)&&(new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')==null)) return false;
        
          if (value!==currentURL) {if (new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake')!==null) return elem.querySelector('input').value = new URLSearchParams((elem.querySelector('iframe').contentWindow.location.search)).get('fake');if (new URL(value).pathname=='/') value = value.replace(/\/$/gi,''); elem.querySelector('input').value = value.replace('https://','').replace('http://','')};
        }
      }, 500)
    };
  
    var INPUT = elem.querySelector('input')
  
    INPUT.addEventListener('blur', function() {
      INPUT.isblur = true;
      INPUT.isfocus = false;
      try {if (new URLSearchParams(new URL(currentURL).search).get('fake')) return;} catch {}
      if (INPUT.value==currentURL) {
        INPUT.value = INPUT.val
      }
    })
  
    INPUT.addEventListener('focus', function() {
      INPUT.isfocus = true;
      INPUT.isblur = false;
      try {if (new URLSearchParams(new URL(currentURL).search).get('fake')) return;} catch {}
      INPUT.val = INPUT.value
      if (currentURL&&INPUT.value==doneURL) INPUT.value = currentURL
      INPUT.select()
      INPUT.setSelectionRange(0, INPUT.value.length)
    })

    setInterval(function() {
	if (!INPUT.isfocus) elem.querySelector('.mock-browser-search-omni').style.display = 'none';
    }, 100)
  
    elem.addEventListener('keypress', (e)=>{
      if (e.key=='Enter') {
        if (elem.querySelector('input').value.trim()=='') return false;
        try {elem.querySelector('iframe').contentWindow.LudicrousConfig.stealth = false;} catch {}
  
        elem.querySelector('.mock-browser-search-omni').style.display = 'none';
  
        elem.querySelector('input').blur()
        if (elem.querySelector('input').onblur) elem.querySelector('input').onblur()
  
        var val = elem.querySelector('input').value
        var extension = (val.split('/').find(e=>e.includes('.'))||'').split('.').pop().replace(/\//gi, '');
  
        if (val.startsWith('ludicrous://')) {
          return elem.querySelector('iframe').contentWindow.location.href = location.origin+'/browser/'+val.split('/').pop()+'.html'+'?fake='+val
        }
  
        if (val.includes('.')&&window.tld.indexOf(extension)>-1) {
          if (!val.startsWith('http')) val = 'https://'+val
        } else {
          val = 'https://google.com/search?q='+val
        }
  
        elem.querySelector('input').value = val.replace('https://','').replace('http://','')
  
        var value = ''
        if (val.startsWith(location.origin)) value = val; else switch(localStorage['ld-setting-main-pick']||'ultraviolet') {
          case "ultraviolet":
            value = '/sw/'+xor(val, 3)
            break;
          case "rhodium":
            value = '/client/'+val
            break;
          default:
            break;
        }
  
        vall = val
  
        elem.querySelector('.mock-browser-reload i').classList.remove('fa-arrow-rotate-right');
        elem.querySelector('.mock-browser-reload i').classList.add('fa-xmark');
  
        tabElem.querySelector('.chrome-tab-title').innerText = val
        tabElem.querySelector('.chrome-tab-favicon').style.backgroundImage = 'url("/ico/dark.ico")'
  
        return elem.querySelector('iframe').contentWindow.location.href = value;
      }
    })
  })
  
  el.addEventListener('tabRemove', ({ detail }) => {
    var el = detail.tabEl

    if (document.querySelectorAll('.chrome-tab').length==0) document.querySelector('.mock-browser-menu-open').style.display = 'none'
  
    chromeTabs.closedTabs.push({window: document.querySelector('#mock-browser-'+el.dataset['tabId']).querySelector('iframe').contentWindow})
    
    document.querySelector('#mock-browser-'+el.dataset['tabId']).remove()
  })
  
  chromeTabs.addTab({
    title: 'Ludicrous',
    favicon: '/ico/favicon.ico'
  })
  
  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 't') {
      chromeTabs.addTab({
        title: 'Ludicrous',
        favicon: '/ico/favicon.ico'
      })
    }
  })
  
  var $ = document.querySelectorAll.bind(document)
  
  var interval = setInterval(() => {
      var filter = 'filter: hue-rotate(180deg)'
      try {
          $('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = (document.body.style.background == "linear-gradient(rgb(57, 62, 66), rgb(24, 25, 26))" ? "linear-gradient(-45deg, rgb(90 91 92), rgb(50 50 50))" : "rgb(36, 103, 165)");
          document.getElementById('arc-popper-iframe').contentWindow.document.querySelector('#popper header').style['backgroundImage'] = 'linear-gradient(238deg, rgb(59, 174, 255) 1%, rgb(88, 124, 255) 100%)';
          clearInterval(interval)
      } catch (err) {}
  }, 5)
})()
