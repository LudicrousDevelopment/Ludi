const sec = require('search-scraper');

sec.google("text to search").then(function(result){
    console.log(result);
});