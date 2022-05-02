switch (localStorage['ld-setting-theme'] || 'normal') {
    case "dark":
    case "hacker":
    case "squares":
        document.body.style.background = "linear-gradient(rgb(57, 62, 66), rgb(24, 25, 26))";
        break;
    default:
        document.body.style.background = "rgb(0, 79, 148)"
        break;
}

const $ = document.querySelectorAll.bind(document);


var interval = setInterval(() => {
    var filter = 'filter: hue-rotate(180deg)'
    try {
        $('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = (document.body.style.background == "linear-gradient(rgb(57, 62, 66), rgb(24, 25, 26))" ? "linear-gradient(-45deg, rgb(90 91 92), rgb(50 50 50))" : "rgb(36, 103, 165)");
        document.getElementById('arc-popper-iframe').contentWindow.document.querySelector('#popper header').style['backgroundImage'] = 'linear-gradient(238deg, rgb(59, 174, 255) 1%, rgb(88, 124, 255) 100%)';
        clearInterval(interval)
    } catch (err) {}
}, 5)