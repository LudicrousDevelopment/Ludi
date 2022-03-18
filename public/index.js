self.__uv$config = { prefix: '/sw/' }
const $ = document.querySelectorAll.bind(document)
var LudicrousConfig = JSON.parse(document.currentScript.getAttribute('data-options'))

document.querySelector('.main-page-stealth-switch').onclick = function() {
  this.classList.toggle('stealth')
  this.querySelector('i').classList.toggle('fa-eye')
  this.querySelector('i').classList.toggle('fa-eye-slash')
  localStorage.setItem('ld-setting-stealth', this.classList.contains('stealth')?'on':'off')
}

if (localStorage['ld-setting-stealth']) {
  switch(localStorage['ld-setting-stealth']) {
    case "off":
      window.LudicrousConfig.stealth = false;
      break;
    default:
      window.LudicrousConfig.stealth = true;
      document.querySelector('.main-page-stealth-switch').click();
      break;
  }
} else {
  window.LudicrousConfig.stealth = true;
  document.querySelector('.main-page-stealth-switch').click();
}

const mod = (n, m) => ((n % m) + m) % m;
class StrShuffler {
  static baseDictionary = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-';
  static shuffledIndicator = '_rhs';
  static generateDictionary() {
    let str = '';
    const split = StrShuffler.baseDictionary.split('');
    while (split.length > 0) {
      str += split.splice(Math.floor(Math.random() * split.length), 1)[0];
    }
    return str;
  }

  constructor(dictionary = StrShuffler.generateDictionary()) {
    this.dictionary = dictionary;
  }
  shuffle(str) {
    if (str.startsWith(StrShuffler.shuffledIndicator)) {
      return str;
    }
    let shuffledStr = '';
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const idx = StrShuffler.baseDictionary.indexOf(char);
      if (idx === -1) {
        shuffledStr += char;
      } else {
        shuffledStr += this.dictionary.charAt(mod(idx + i, StrShuffler.baseDictionary.length));
      }
    }
    return StrShuffler.shuffledIndicator + shuffledStr;
  }
  unshuffle(str) {
    if (!str.startsWith(StrShuffler.shuffledIndicator)) {
      return str;
    }

    str = str.slice(StrShuffler.shuffledIndicator.length);

    let unshuffledStr = '';
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const idx = this.dictionary.indexOf(char);
      if (idx === -1) {
        unshuffledStr += char;
      } else {
        unshuffledStr += StrShuffler.baseDictionary.charAt(mod(idx - i, StrShuffler.baseDictionary.length));
      }
    }
    return unshuffledStr;
  }
}
async function e() {
    var key = localStorage['ld-ram-key']||await (await fetch('/key')).text()
    var input = $('#main-input')[0].value
    if (!input.startsWith('http')) input = 'https://google.com/search?q='+input
    location.href = 'https://r.'+location.host+'/'+key+'/'+new StrShuffler().shuffle(input)
}

//document.querySelector('#bg-p')[0].contentWindow.location.href = 'about:blank'

document.querySelector('select.input').value = LudicrousConfig.primaryProxy;
document.querySelector('select.input').onchange = function() {
  localStorage['ld-setting-main-pick'] = document.querySelector('select.input').value
  if (document.querySelector('select.input').value=='rammerhead') {
    var test = prompt('Enter Rammerhead Key (Optional)')
    if (test) localStorage['ld-ram-key'] = test
  }
}

function cookieAuth() {
  var data = new Date();
  data.setDate(data.getDate() + 7);
  document.cookie = 'ld-auth-setter=true; expires=' + data.toUTCString()
}

Element.prototype.oclick = function() {
  this.addEventListener('click', arguments[0])
}
onbeforeunload = function(e) {
  if ($('#bg-p')[0].src != '' && $('#bg-p')[0].style.display == 'block') sessionStorage.setItem('session-restore-ludicrous', $('#bg-p')[0].contentWindow.location.href)
}
$('#exploits')[0].oclick(() => {
  window.location.hash = 'e'
  $('#exploit-container')[0].classList.toggle('visible')
  $('#preferences-container')[0].classList.remove('visible')
  $('#game-container')[0].classList.remove('visible')
})

/*$('#nightmare')[0].oclick(() => {
  window.location.search = '?n'
})*/

if (window.location.hash == '#e') {
  $('#exploit-container')[0].classList.toggle('visible')
}

if (window.location.hash == '#s') {
  $('#preferences-container')[0].classList.toggle('visible')
}

if (window.location.hash == '#g') {
  $('#game-container')[0].classList.toggle('visible')
}

setInterval(() => {
  if ((!$('#exploit-container')[0].classList.contains('visible')) && (!$('#preferences-container')[0].classList.contains('visible')) && (!$('#game-container')[0].classList.contains('visible'))) window.location.hash = ''
}, 100)

/*

$('#snake-instructions')[0].oclick(() => {
  alert('Copied to Clipboard')
  copyCode("javascript:((b,P,Q=64,u=98,j=document,w=0,S=0,l='appendChild',f=2079,t=f+1,x=j[b]`a`,X=j.all[0][l](x)[l](j[b]`input`),s=x[l](b=j[b]`canvas`).getContext`2d`,p=l&=b.width=b.height=320,h=j=t,m=b=Q*Q,F=X.onkeydown=X.onblur=(e,z,y=e%Q)=>![z?x[f]?F(f=(f=Math.random(w+=m,l+=8)*3844|0)+Q+(f/31|1),u=9):F(f):e?+e?s.fillRect(y*5,(e>>6)*5,5,5,s.fillStyle=`hsl(${!x[z=x[e]=e<Q|e>4031|!y|y>62|(y=e==h)+y,x[y*j]=2+h,e]*99},${m+m}%,${(z+=e==f)*50}%)`):(e=e.keyCode-37)-43?p=P&4/e>1&&e^2^b?e:p:(P=e&!P)&&F():x[l?l--:t=x[t]-2+F(t),S+=(w*=.8)/4,m=999/++u,h+=[-1,-Q,1,Q][b=p]]?x.remove(alert`Game Over`):X.value=F(e,j=F(h)+h)+P?S|!setTimeout(F,50,e):'Press P'])=>{for(x.style='position:fixed;top:0;display:grid';b--;)F(b)})`createElement`")
}
)
var darkIcon = './dark.ico'

/*if (confirm("Snake Game:\nCopy Below Code into a Bookmark and Whenever you Feel Like Playing Snake, Click it. *New Code*\n\nMade by YÖCTDÖNALD'S#1115\n\njavascript:((b,P,Q=64,u=98,j=document,w=0,S=0,l='appendChild',f=2079,t=f+1,x=j[b]`a`,X=j.all[0][l](x)[l](j[b]`input`),s=x[l](b=j[b]`canvas`).getContext`2d`,p=l&=b.width=b.height=320,h=j=t,m=b=Q*Q,F=X.onkeydown=X.onblur=(e,z,y=e%Q)=>![z?x[f]?F(f=(f=Math.random(w+=m,l+=8)*3844|0)+Q+(f/31|1),u=9):F(f):e?+e?s.fillRect(y*5,(e>>6)*5,5,5,s.fillStyle=`hsl(${!x[z=x[e]=e<Q|e>4031|!y|y>62|(y=e==h)+y,x[y*j]=2+h,e]*99},${m+m}%,${(z+=e==f)*50}%)`):(e=e.keyCode-37)-43?p=P&4/e>1&&e^2^b?e:p:(P=e&!P)&&F():x[l?l--:t=x[t]-2+F(t),S+=(w*=.8)/4,m=999/++u,h+=[-1,-Q,1,Q][b=p]]?x.remove(alert`Game Over`):X.value=F(e,j=F(h)+h)+P?S|!setTimeout(F,50,e):'Press P'])=>{for(x.style='position:fixed;top:0;display:grid';b--;)F(b)})`createElement`")) {
  document.querySelector('#main-input').value = "javascript:((b,P,Q=64,u=98,j=document,w=0,S=0,l='appendChild',f=2079,t=f+1,x=j[b]`a`,X=j.all[0][l](x)[l](j[b]`input`),s=x[l](b=j[b]`canvas`).getContext`2d`,p=l&=b.width=b.height=320,h=j=t,m=b=Q*Q,F=X.onkeydown=X.onblur=(e,z,y=e%Q)=>![z?x[f]?F(f=(f=Math.random(w+=m,l+=8)*3844|0)+Q+(f/31|1),u=9):F(f):e?+e?s.fillRect(y*5,(e>>6)*5,5,5,s.fillStyle=`hsl(${!x[z=x[e]=e<Q|e>4031|!y|y>62|(y=e==h)+y,x[y*j]=2+h,e]*99},${m+m}%,${(z+=e==f)*50}%)`):(e=e.keyCode-37)-43?p=P&4/e>1&&e^2^b?e:p:(P=e&!P)&&F():x[l?l--:t=x[t]-2+F(t),S+=(w*=.8)/4,m=999/++u,h+=[-1,-Q,1,Q][b=p]]?x.remove(alert`Game Over`):X.value=F(e,j=F(h)+h)+P?S|!setTimeout(F,50,e):'Press P'])=>{for(x.style='position:fixed;top:0;display:grid';b--;)F(b)})`createElement`"
  document.querySelector('#main-input').select();
  document.querySelector('#main-input').setSelectionRange(0, 99999);
  navigator.clipboard.writeText(document.querySelector('#main-input').value);
  document.querySelector('#main-input').value = ''
}*/
//})
/*
$('#yt-instructions')[0].oclick(() => {
  alert('Copied to Clipboard')
  copyCode('javascript:(h=>{/youtube/.test(h+=location)?location=`//www.youtube-nocookie.com/embed/${[h.match`(?<=youtu.be/|[ve]/|u/\\w+/|v=)[^%23&?]*`]}?autoplay=1`:0})``')
  /*if (confirm("Youtube Exploit:\nCopy Below Code Into a Bookmark and Whenever you Encounter a Blocked Youtube Video, Click it to Unblock. *New Exploit*\n\nMade by YÖCTDÖNALD'S#1115\n\njavascript:(h=>{/youtube/.test(h+=location)?location=`//www.youtube-nocookie.com/embed/${[h.match`(?<=youtu.be/|[ve]/|u/\\w+/|v=)[^%23&?]*`]}?autoplay=1`:0})``")) {
    document.querySelector('#main-input').value = 'javascript:(h=>{/youtube/.test(h+=location)?location=`//www.youtube-nocookie.com/embed/${[h.match`(?<=youtu.be/|[ve]/|u/\\w+/|v=)[^%23&?]*`]}?autoplay=1`:0})``'
    document.querySelector('#main-input').select();
    document.querySelector('#main-input').setSelectionRange(0, 99999);
    navigator.clipboard.writeText(document.querySelector('#main-input').value);
    document.querySelector('#main-input').value = ''
  }*/
/*})
$('#porta-instructions')[0].oclick(() => {
  alert('Copied to Clipboard')
  copyCode(`javascript:(function(){var a=document.getElementById("rusic-modal")||document.createElement("iframe");a.setAttribute("allow","fullscreen");a.src=prompt("Enter URL", "https://google.com");a.id="rusic-modal";a.style="position:fixed;width:100vw;height:100vh;top:0px;left:0px;right:0px;bottom:0px;z-index:2147483647;background-color:white;border:none;";document.body.appendChild(a);}());`)
  /*if (confirm(`Porta UB:\nCopy Below Code Into a Bookmark and Whenever you Encounter a Blocked Siite, Click it to Begin the Exploit, Enter Target URL. Will not Work With Many Filters. *Slightly Outdated*\n\njavascript:(function(){var a=document.getElementById("rusic-modal")||document.createElement("iframe");a.setAttribute("allow","fullscreen");a.src=prompt("Enter URL", "https://google.com");a.id="rusic-modal";a.style="position:fixed;width:100vw;height:100vh;top:0px;left:0px;right:0px;bottom:0px;z-index:2147483647;background-color:white;border:none;";document.body.appendChild(a);}());`)) {
    document.querySelector('#main-input').value = 
    document.querySelector('#main-input').select();
    document.querySelector('#main-input').setSelectionRange(0, 99999);
    navigator.clipboard.writeText(document.querySelector('#main-input').value);
    document.querySelector('#main-input').value = ''
  }*/
/*})
$('#crown-instructions')[0].oclick(() => {
  alert('Copied to Clipboard')
  var code = `(()=>{let script=document.createElement("script");script.src="${location.origin}/crown.js";document.body.appendChild(script)})()`
  copyCode(code)
  //if (confirm('CrownJS:\n\nMade by jango#5518\n\nPress "ok" to view code.')) location.href = '/crown.js'
})*/

var darkIcon = './dark.ico'

window.copyCode = function(code) {
  var oval = document.querySelector('#main-input').value
  document.querySelector('#main-input').value = code
  document.querySelector('#main-input').select();
  document.querySelector('#main-input').setSelectionRange(0, 99999);
  navigator.clipboard.writeText(document.querySelector('#main-input').value);
  document.querySelector('#main-input').value = ''
  document.querySelector('#main-input').value = oval
}

if (sessionStorage['session-restore-ludicrous']) {
  window.ver = sessionStorage['session-restore-ludicrous']
  sessionStorage.removeItem('session-restore-ludicrous')
}

/*$('#res-init')[0].oclick(() => {
  if (window.ver) $('#bg-p')[0].src = window.ver
  $('#bg-p')[0].classList.toggle('visible')
  $('#frame-btns-over')[0].classList.toggle('visible')
})*/

/*$('#pal-init')[0].oclick(() => {
  $('#bg-p')[0].src = ''
  $('#frame-btns-over')[0].style.display = 'block';
  $("#settings-placeholder")[0].style.display = 'none';
  cookieAuth()
  if (!$('#main-input')[0].value.startsWith('http')) {
    $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/surf/'+'https://google.com/search?q='+$('#main-input')[0].value; return $('#bg-p')[0].style.display = 'block';
  }
  $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/surf/'+$('#main-input')[0].value
  $('#bg-p')[0].style.display = 'block';
})*/

$('#rho-init')[0].oclick(() => {
  $('#bg-p')[0].src = ''
  $('#frame-btns-over')[0].style.display = 'block';
  $("#settings-placeholder")[0].style.display = 'none';
  cookieAuth()
  if (!$('#main-input')[0].value.startsWith('http')) {
    $('#bg-p')[0].src = location.protocol + '//' + window.location.host + '/client/' + 'https://google.com/search?q=' + $('#main-input')[0].value; if (LudicrousConfig.stealth==false) {return location.assign($('#bg-p')[0].src)};return $('#bg-p')[0].style.display = 'block';
  }
  $('#bg-p')[0].src = location.protocol + '//' + window.location.host + '/client/' + $('#main-input')[0].value
  if (LudicrousConfig.stealth==false) {return location.assign($('#bg-p')[0].src)};
  return $('#bg-p')[0].style.display = 'block';
})

$('#ram-init')[0].oclick(e)

function MobileBlock() {
  if (navigator.userAgent) {
    if (navigator.userAgent.includes('Mobile')) {
      document.querySelectorAll('#exploit-container, #preferences-container').forEach(e => e.classList.add('blocked'))
    } else {
      document.querySelectorAll('#exploit-container, #preferences-container').forEach(e => e.classList.remove('blocked'))
    }
  }
}

//setInterval(MobileBlock, 100)

var xor = (str, key) => (str.split('').map((char, ind) => ind % key ? String.fromCharCode(char.charCodeAt() ^ key) : char).join(''));
$('#main-input')[0].addEventListener('keyup', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    if ($('#main-input')[0].value == 'special') { localStorage['ld-setting-theme'] = 'orange'; return location.reload() }
    switch (localStorage['ld-setting-main-pick'] || LudicrousConfig.primaryProxy) {
      case "ultraviolet":
        $('#uv-init')[0].click()
        break;
      case "rhodium":
        $('#rho-init')[0].click()
      default:
        break;
    }
  }
})

scroll(0, -100)

document.querySelector('.theme.input').onchange = function(params) {
  var theme = (document.querySelector('.theme.input').value || localStorage['ld-setting-theme'])

  if (theme !== 'squares') clearInterval(window.squareInt);
  if (theme !== 'hacker') {
    window.pjConfig.particles.color.value = '#ffffff'; //window.particleGo();
  }
  localStorage['ld-setting-theme'] = theme
  switch (theme) {
    case "orange":
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = './orange.css'
      link.classList.add('styletheme')
      document.head.appendChild(link)
      document.querySelector('link[rel=icon]').href = './orange.ico'
      window.particleGo()

      break;
    case "hacker":

      window.pjConfig.particles.color.value = '#149414';
      window.particleGo()
      document.querySelectorAll('.styletheme').forEach(e => e.disabled = true)
      document.querySelector('.hacker-theme').removeAttribute('disabled')
      document.querySelector('link[rel=icon]').href = './heck.ico'
      break;
    case "particle":
      document.querySelectorAll('.styletheme').forEach(e => e.disabled = true)
      document.querySelector('.particle-theme').removeAttribute('disabled')
      document.querySelector('link[rel=icon]').href = "./favicon.ico"
      break;
    case "squares":
      document.querySelectorAll('.styletheme').forEach(e => e.disabled = true)
      document.querySelector('.square-theme').removeAttribute('disabled')
      function createBox() {

        let span = document.createElement('span');

        span.classList.add('animated-box');

        let size = Math.random() * 80;

        span.style.height = 40 + size + 'px';
        span.style.width = 40 + size + 'px';

        span.style.top = ((1.3*Math.random()) * innerHeight) + 'px';
        span.style.left = ((Math.random()) * (innerWidth)) + 'px';

        document.querySelector('.gradient-background').appendChild(span);

        setTimeout(() => {
          span.remove();
        }, 6000)

      }

      window.squareInt = setInterval(createBox, 300);
      document.querySelector('link[rel=icon]').href = darkIcon
      break
    case "dark":

      document.querySelector('link[rel=icon]').href = darkIcon
      document.querySelectorAll('.styletheme').forEach(e => e.disabled = true)
      document.querySelector('.dark-theme').removeAttribute('disabled')
      window.particleGo()

      break;
    default:
      document.querySelector('link[rel=icon]').href = "./favicon.ico"
      document.querySelectorAll('.styletheme').forEach(e => e.disabled = true)
      window.particleGo()

      break;
  }
  setTimeout(() => {
    var interval = setInterval(() => {
      var filter = 'filter: hue-rotate(180deg)'
      try { $('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = window.getComputedStyle(document.querySelector('#main-page-content'), null).getPropertyValue('background'); document.getElementById('arc-popper-iframe').contentWindow.document.querySelector('#popper header').style['backgroundImage'] = 'linear-gradient(238deg, rgb(59, 174, 255) 1%, rgb(88, 124, 255) 100%)'; clearInterval(interval) } catch (err) { }
    }, 5)
  }, 200)
}

function SetHeight() {
  var height = (document.querySelector('#main-page-content').offsetHeight-20)+'px';
  document.querySelectorAll('#preferences-container, #exploit-container').forEach(e=>e.style.height=height);
}

setInterval(SetHeight, 10)

$('#uv-init')[0].oclick(() => {

  $('#bg-p')[0].src = ''
  $('#frame-btns-over')[0].style.display = 'block'
  $("#settings-placeholder")[0].style.display = 'none'
  cookieAuth()
  function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
  }; window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = document.querySelector('#main-input').value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


    $('#bg-p')[0].src = __uv$config.prefix + encodeURIComponent(xor(url, 2));

    if (LudicrousConfig.stealth==false) {return location.assign($('#bg-p')[0].src)};
  });
  $('#bg-p')[0].style.display = 'block';
})

//$('.canc').oclick(() => {alert('Ludicrous is Experiencing Heavy Load Issues, Please Try Again Later or Use An Alternate Site.\n\nWe Are Sorry for the Inconvenience')})

$('#frame-close')[0].oclick(() => { $('#bg-p')[0].setAttribute('src', 'about:blank'); $('#bg-p')[0].style.display = 'none'; $('#frame-btns-over')[0].style.display = 'none'; $("#settings-placeholder")[0].style.display = 'block'; $('#frame-btns-over')[0].classList.remove('visible'); $('#bg-p')[0].classList.remove('visible') })

$('#frame-reload')[0].oclick(() => { $('#bg-p')[0].contentWindow.location.reload() })

$('#settings-placeholder')[0].oclick(() => {
  window.location.hash = 's'
  $('#preferences-container')[0].classList.toggle('visible')
  $('#exploit-container')[0].classList.remove('visible')
  $('#game-container')[0].classList.remove('visible')
})

$('#title-change')[0].oclick(() => {
  var input = document.querySelector('.input')
  document.title = input.value
  localStorage.setItem('title', input.value)
})

$('#icon-change')[0].oclick(() => {
  var input = document.querySelector('.input')
  localStorage['icon'] = input.value
  var link = document.head.querySelector('link[rel=icon]') || document.createElement('link'); link.href = input.value
  link.rel = 'icon'
  document.head.appendChild(link)
})

if (localStorage['title']) {
  document.title = localStorage['title']
}

if (localStorage['icon']) {
  var link = document.head.querySelector('link[rel=icon]') || document.createElement('link'); link.href = localStorage['icon']
  link.rel = 'icon'
  document.head.appendChild(link)
}

window.alert2 = function(param) {
  var elem = document.createElement('div')
  elem.style = "position: fixed;border-left:0px;border-right:0px;width:100%;margin:auto;top:70px;background:transparent;border-style: solid;border-bottom: 1px solid #fff;border-top:1px solid #fff;display:flex;justify-content:center;align-items:center;box-shadow:0px 0px 10px 0px #fff;padding:20px;color:white;font-size:20px;cursor:pointer;"
  elem.innerHTML = param
  elem.setAttribute('onclick', '(() => {this.remove()})()')
  document.body.insertAdjacentElement('afterBegin', elem)
}

if (location.href.includes('//ludicrous.gq')) alert2('Warning: <span class="embedtext">You are Using a Legacy Domain. Please Relocate to a Newer Location <a href="https://ridgethread.com">Here</a></span>'); else;//alert2('<span class="embedtext">Welcome to Ludicrous!</span>')

//alert2('<span class="enbedtext"></span>')

var interval = setInterval(() => {
  var filter = 'filter: hue-rotate(180deg)'
  try { $('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = window.getComputedStyle(document.querySelector('#main-page-content'), null).getPropertyValue('background'); document.getElementById('arc-popper-iframe').contentWindow.document.querySelector('#popper header').style['backgroundImage'] = 'linear-gradient(238deg, rgb(59, 174, 255) 1%, rgb(88, 124, 255) 100%)'; clearInterval(interval) } catch (err) { }
}, 5)

window.pjConfig = {
  "particles": {
    "number": {
      "value": 48,
      "density": {
        "enable": false,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6814501258678471,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.24362316369040352,
        "opacity_min": 0.03248308849205381,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 4.872463273808071,
        "size_min": 2.436231636904035,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "right",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

/*$('#bg-p')[0].onload = function() {
  $('#bg-p')[0].contentWindow.document.querySelectorAll('a[target]').forEach((node) => {node.target = '_self'})
}*/

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params) {

  var canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      },
      mouse: {}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors: {}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if (params) {
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };


  pJS.fn.retinaInit = function() {

    if (pJS.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio;
      pJS.tmp.retina = true;
    }
    else {
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };



  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function() {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function() {

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if (pJS && pJS.interactivity.events.resize) {

      window.addEventListener('resize', function() {

        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if (pJS.tmp.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas on anim disabled */
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesEmpty();
          pJS.fn.particlesCreate();
          pJS.fn.particlesDraw();
          pJS.fn.vendors.densityAutoParticles();
        }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function() {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function() {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };


  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function(color, opacity, position) {

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if (pJS.particles.size.anim.enable) {
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if (!pJS.particles.size.anim.sync) {
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;
    else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;
    else if (this.y < this.radius * 2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if (pJS.particles.move.bounce) {
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if (typeof (color.value) == 'object') {

      if (color.value instanceof Array) {
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      } else {
        if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if (color.value == 'random') {
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if (typeof (color.value) == 'string') {
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if (pJS.particles.opacity.anim.enable) {
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if (!pJS.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch (pJS.particles.move.direction) {
      case 'top':
        velbase = { x: 0, y: -1 };
        break;
      case 'top-right':
        velbase = { x: 0.5, y: -0.5 };
        break;
      case 'right':
        velbase = { x: 1, y: -0 };
        break;
      case 'bottom-right':
        velbase = { x: 0.5, y: 0.5 };
        break;
      case 'bottom':
        velbase = { x: 0, y: 1 };
        break;
      case 'bottom-left':
        velbase = { x: -0.5, y: 1 };
        break;
      case 'left':
        velbase = { x: -1, y: 0 };
        break;
      case 'top-left':
        velbase = { x: -0.5, y: -0.5 };
        break;
      default:
        velbase = { x: 0, y: 0 };
        break;
    }

    if (pJS.particles.move.straight) {
      this.vx = velbase.x;
      this.vy = velbase.y;
      if (pJS.particles.move.random) {
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5;
      this.vy = velbase.y + Math.random() - 0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;



    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if (typeof (shape_type) == 'object') {
      if (shape_type instanceof Array) {
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    } else {
      this.shape = shape_type;
    }

    if (this.shape == 'image') {
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if (!this.img.ratio) this.img.ratio = 1;
      if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined) {
        pJS.fn.vendors.createSvgImg(this);
        if (pJS.tmp.pushing) {
          this.img.loaded = false;
        }
      }
    }



  };


  pJS.fn.particle.prototype.draw = function() {

    var p = this;

    if (p.radius_bubble != undefined) {
      var radius = p.radius_bubble;
    } else {
      var radius = p.radius;
    }

    if (p.opacity_bubble != undefined) {
      var opacity = p.opacity_bubble;
    } else {
      var opacity = p.opacity;
    }

    if (p.color.rgb) {
      var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + opacity + ')';
    } else {
      var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + opacity + ')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch (p.shape) {

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
        break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
        break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides / 3.5), // startX
          p.y - radius / (2.66 / 3.5), // startY
          radius * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
        break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius * 2 / (pJS.particles.shape.polygon.nb_sides / 4), // startX
          p.y - radius / (2 * 2.66 / 3.5), // startY
          radius * 2 * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
        break;

      case 'image':

        function draw() {
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x - radius,
            p.y - radius,
            radius * 2,
            radius * 2 / p.img.ratio
          );
        }

        if (pJS.tmp.img_type == 'svg') {
          var img_obj = p.img.obj;
        } else {
          var img_obj = pJS.tmp.img_obj;
        }

        if (img_obj) {
          draw();
        }

        break;

    }

    pJS.canvas.ctx.closePath();

    if (pJS.particles.shape.stroke.width > 0) {
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }

    pJS.canvas.ctx.fill();

  };


  pJS.fn.particlesCreate = function() {
    for (var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function() {

    for (var i = 0; i < pJS.particles.array.length; i++) {

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if (pJS.particles.move.enable) {
        var ms = pJS.particles.move.speed / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if (pJS.particles.opacity.anim.enable) {
        if (p.opacity_status == true) {
          if (p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        } else {
          if (p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if (p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if (pJS.particles.size.anim.enable) {
        if (p.size_status == true) {
          if (p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        } else {
          if (p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if (p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if (pJS.particles.move.out_mode == 'bounce') {
        var new_pos = {
          x_left: p.radius,
          x_right: pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      } else {
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if (p.x - p.radius > pJS.canvas.w) {
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      }
      else if (p.x + p.radius < 0) {
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if (p.y - p.radius > pJS.canvas.h) {
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      }
      else if (p.y + p.radius < 0) {
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch (pJS.particles.move.out_mode) {
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
          break;
      }

      /* events */
      if (isInArray('grab', pJS.interactivity.events.onhover.mode)) {
        pJS.fn.modes.grabParticle(p);
      }

      if (isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.bubbleParticle(p);
      }

      if (isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if (pJS.particles.line_linked.enable || pJS.particles.move.attract.enable) {
        for (var j = i + 1; j < pJS.particles.array.length; j++) {
          var p2 = pJS.particles.array[j];

          /* link particles */
          if (pJS.particles.line_linked.enable) {
            pJS.fn.interact.linkParticles(p, p2);
          }

          /* attract particles */
          if (pJS.particles.move.attract.enable) {
            pJS.fn.interact.attractParticles(p, p2);
          }

          /* bounce particles */
          if (pJS.particles.move.bounce) {
            pJS.fn.interact.bounceParticles(p, p2);
          }

        }
      }


    }

  };

  pJS.fn.particlesDraw = function() {

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p = pJS.particles.array[i];
      p.draw();
    }

  };

  pJS.fn.particlesEmpty = function() {
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function() {

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();

    /* restart */
    pJS.fn.vendors.start();

  };


  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function(p1, p2) {

    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= pJS.particles.line_linked.distance) {

      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1 / pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

      if (opacity_line > 0) {

        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();

      }

    }

  };


  pJS.fn.interact.attractParticles = function(p1, p2) {

    /* condensed particles */
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= pJS.particles.line_linked.distance) {

      var ax = dx / (pJS.particles.move.attract.rotateX * 1000),
        ay = dy / (pJS.particles.move.attract.rotateY * 1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }


  }


  pJS.fn.interact.bounceParticles = function(p1, p2) {

    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      dist_p = p1.radius + p2.radius;

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function(nb, pos) {

    pJS.tmp.pushing = true;

    for (var i = 0; i < nb; i++) {
      pJS.particles.array.push(
        new pJS.fn.particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
          }
        )
      )
      if (i == nb - 1) {
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }

  };


  pJS.fn.modes.removeParticles = function(nb) {

    pJS.particles.array.splice(0, nb);
    if (!pJS.particles.move.enable) {
      pJS.fn.particlesDraw();
    }

  };


  pJS.fn.modes.bubbleParticle = function(p) {

    /* on hover event */
    if (pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)) {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
        ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {

        if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {

          /* size */
          if (pJS.interactivity.modes.bubble.size != pJS.particles.size.value) {

            if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
              var size = p.radius + (pJS.interactivity.modes.bubble.size * ratio);
              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                size = p.radius - (dif * ratio);
              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }

          }

          /* opacity */
          if (pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value) {

            if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
              var opacity = pJS.interactivity.modes.bubble.opacity * ratio;
              if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            } else {
              var opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio;
              if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            }

          }

        }

      } else {
        init();
      }


      /* mouseleave */
      if (pJS.interactivity.status == 'mouseleave') {
        init();
      }

    }

    /* on click event */
    else if (pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)) {


      if (pJS.tmp.bubble_clicking) {
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
          time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

        if (time_spent > pJS.interactivity.modes.bubble.duration) {
          pJS.tmp.bubble_duration_end = true;
        }

        if (time_spent > pJS.interactivity.modes.bubble.duration * 2) {
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {

        if (bubble_param != particles_param) {

          if (!pJS.tmp.bubble_duration_end) {
            if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
              if (p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if (obj != bubble_param) {
                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                if (id == 'size') p.radius_bubble = value;
                if (id == 'opacity') p.opacity_bubble = value;
              }
            } else {
              if (id == 'size') p.radius_bubble = undefined;
              if (id == 'opacity') p.opacity_bubble = undefined;
            }
          } else {
            if (p_obj_bubble != undefined) {
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
                dif = bubble_param - value_tmp;
              value = bubble_param + dif;
              if (id == 'size') p.radius_bubble = value;
              if (id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if (pJS.tmp.bubble_clicking) {
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  pJS.fn.modes.repulseParticle = function(p) {

    if (pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse },
        repulseRadius = pJS.interactivity.modes.repulse.distance,
        velocity = 100,
        repulseFactor = clamp((1 / repulseRadius) * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);

      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if (pJS.particles.move.out_mode == 'bounce') {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      } else {
        p.x = pos.x;
        p.y = pos.y;
      }

    }


    else if (pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if (!pJS.tmp.repulse_finish) {
        pJS.tmp.repulse_count++;
        if (pJS.tmp.repulse_count == pJS.particles.array.length) {
          pJS.tmp.repulse_finish = true;
        }
      }

      if (pJS.tmp.repulse_clicking) {

        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance / 6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
          dy = pJS.interactivity.mouse.click_pos_y - p.y,
          d = dx * dx + dy * dy;

        var force = -repulseRadius / d * 1;

        function process() {

          var f = Math.atan2(dy, dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if (pJS.particles.move.out_mode == 'bounce') {
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if (d <= repulseRadius) {
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }


      } else {

        if (pJS.tmp.repulse_clicking == false) {

          p.vx = p.vx_i;
          p.vy = p.vy_i;

        }

      }

    }

  }


  pJS.fn.modes.grabParticle = function(p) {

    if (pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (dist_mouse <= pJS.interactivity.modes.grab.distance) {

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1 / pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

        if (opacity_line > 0) {

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function() {

    /* events target element */
    if (pJS.interactivity.detect_on == 'window') {
      pJS.interactivity.el = window;
    } else {
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function(e) {

        if (pJS.interactivity.el == window) {
          var pos_x = e.clientX,
            pos_y = e.clientY;
        }
        else {
          var pos_x = e.offsetX || e.clientX,
            pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if (pJS.tmp.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function(e) {

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if (pJS.interactivity.events.onclick.enable) {

      pJS.interactivity.el.addEventListener('click', function() {

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if (pJS.interactivity.events.onclick.enable) {

          switch (pJS.interactivity.events.onclick.mode) {

            case 'push':
              if (pJS.particles.move.enable) {
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              } else {
                if (pJS.interactivity.modes.push.particles_nb == 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                }
                else if (pJS.interactivity.modes.push.particles_nb > 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
              break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
              break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
              break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function() {
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration * 1000)
              break;

          }

        }

      });

    }


  };

  pJS.fn.vendors.densityAutoParticles = function() {

    if (pJS.particles.number.density.enable) {

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if (pJS.tmp.retina) {
        area = area / (pJS.canvas.pxratio * 2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if (missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);

    }

  };


  pJS.fn.vendors.checkOverlap = function(p1, position) {
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  pJS.fn.vendors.createSvgImg = function(p) {

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
      rgbHex = /#([0-9A-F]{3,6})/gi,
      coloredSvgXml = svgXml.replace(rgbHex, function(m, r, g, b) {
        if (p.color.rgb) {
          var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
        } else {
          var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
        }
        return color_value;
      });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }),
      DOMURL = window.URL || window.webkitURL || window,
      url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function() {
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;

  };


  pJS.fn.vendors.destroypJS = function() {
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };


  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  pJS.fn.vendors.exportImg = function() {
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  pJS.fn.vendors.loadImg = function(type) {

    pJS.tmp.img_error = undefined;

    if (pJS.particles.shape.image.src != '') {

      if (type == 'svg') {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function(data) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            } else {
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      } else {

        var img = new Image();
        img.addEventListener('load', function() {
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;

      }

    } else {
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }

  };


  pJS.fn.vendors.draw = function() {

    if (pJS.particles.shape.type == 'image') {

      if (pJS.tmp.img_type == 'svg') {

        if (pJS.tmp.count_svg >= pJS.particles.number.value) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          //console.log('still loading...');
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      } else {

        if (pJS.tmp.img_obj != undefined) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }

    } else {
      pJS.fn.particlesDraw();
      if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }

  };


  pJS.fn.vendors.checkBeforeDraw = function() {

    // if shape is image
    if (pJS.particles.shape.type == 'image') {

      if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined) {
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      } else {
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if (!pJS.tmp.img_error) {
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }

      }

    } else {
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }

  };


  pJS.fn.vendors.init = function() {

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  };


  pJS.fn.vendors.start = function() {

    if (isInArray('image', pJS.particles.shape.type)) {
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    } else {
      pJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();



};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
      source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params) {

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if (typeof (tag_id) != 'string') {
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
    pJS_canvas_class = 'particles-js-canvas-el',
    exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback) {

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if (callback) callback();
      } else {
        console.log('Error pJS - XMLHttpRequest status: ' + xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};

function particleGo() { particlesJS("particles-js", pjConfig) }

particleGo()

document.querySelector('.theme.input').value = localStorage['ld-setting-theme'] || 'normal'
document.querySelector('.theme').onchange()
