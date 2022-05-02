window.AnalyticsUnloadFunction = () => fetch('/data/delete/?id='+window.AnalyticsProcessID)

function StartAnalytics() {
  delete window.AnalyticsProcessID
  delete window.reloadFetch
  
  window.removeEventListener('beforeunload', window.AnalyticsUnloadFunction)
  
  clearInterval(window.AnalyticsInterval)
  window.AnalyticsProcessID = Math.floor(Math.random() * (999999 - 100000) + 100000)
  
  fetch('/data/?url='+btoa(location.href)+'&id='+window.AnalyticsProcessID);

  window.AnalyticsListener = window.addEventListener('beforeunload', window.AnalyticsUnloadFunction)
  
  async function reloadFetch() {
    var request = await fetch('/data/update/?id='+window.AnalyticsProcessID)
  
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