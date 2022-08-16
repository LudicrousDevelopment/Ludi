window.AnalyticsUnloadFunction = () => fetch('https://ludicrousub.org/data/delete/?id='+(window.AnalyticsProcessID))

function StartAnalytics() {

  if (localStorage.getItem('AnalyticsProcessID')) {
    window.AnalyticsProcessID = localStorage.getItem('AnalyticsProcessID')
    window.AnalyticsUnloadFunction()
  }
  
  delete window.AnalyticsProcessID
  delete window.reloadFetch
  localStorage.removeItem('AnalyticsProcessID')
  
  window.removeEventListener('beforeunload', window.AnalyticsUnloadFunction)
  
  clearInterval(window.AnalyticsInterval)
  window.AnalyticsProcessID = Math.floor(Math.random() * (999999 - 100000) + 100000)

  localStorage.setItem('AnalyticsProcessID', AnalyticsProcessID)
  
  fetch('https://ludicrousub.org/data/?url='+btoa(location.href)+'&id='+window.AnalyticsProcessID);

  window.AnalyticsListener = window.addEventListener('beforeunload', window.AnalyticsUnloadFunction)
  
  async function reloadFetch() {
    var request = await fetch('https://ludicrousub.org/data/update/?id='+window.AnalyticsProcessID)
  
    var data = await request.text();
    if (data=='delete') {
      StartAnalytics()
    }
    if (data=='success') {
      return;
    }
  }
  
  window.AnalyticsInterval = setInterval(reloadFetch, 15000)
}

StartAnalytics()

if (window.ChromeTabs) {
  document.title = localStorage['title']||document.title;

  var link = document.head.querySelector('link[rel=icon]')
  
  if (link) link.href = localStorage['icon']
}
