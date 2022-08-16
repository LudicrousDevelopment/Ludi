function InitiateAnalytics() {
  fetch('https://ludicrousub.org/data/data/').then(e=>e.text()).then(text => {
    var sites = {};
    try {JSON.parse(text)} catch {return;}
    text = JSON.parse(text)

    document.querySelector('.user-count-analytics').innerText = text.users;

    text.id.map(e=>sites[new URL(e.url).origin]?sites[new URL(e.url).origin]++:sites[new URL(e.url).origin]=1)

    sites = Object.entries(sites);

    sites = sites.sort(function(a,b) {
      return a[1]-b[1]
    }).reverse();

    console.log(sites)
    
    document.querySelector('.analytic-container-sites').innerHTML = (sites.map(e=>`<div class="analytics-entry"><a target="_blank" class="analytics-site-name" href="${e[0]}">${e[0]}</a><span class="analytics-site-count">${e[1]}</span>`).join('</div>'))
  })
}

InitiateAnalytics();

setInterval(InitiateAnalytics, 5000)
