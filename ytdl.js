var url = 'http://www.youtube.com/watch?v=DRmHOSnehTk'

const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl(url)
  .pipe(fs.createWriteStream('video.mp4'));