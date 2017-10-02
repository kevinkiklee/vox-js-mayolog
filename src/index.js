/* eslint-disable */
import Logger from './logger'

document.addEventListener('DOMContentLoaded', () => {
  function loadSampleLogEntries(numberOfEntries){
    numberOfEntries = numberOfEntries || 1000;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function(){
      var key = '';
      var words = this.responseText.split('\n');
      for(var i = 0; i < numberOfEntries; i++){
        var event = []; // 'log' variable has been renamed to 'event'
        var data = {};
        var wordCount = Math.max(Math.floor(Math.random() * 30), 5);
        for(var j = 0; j < wordCount; j++){
          event.push(words[Math.floor(Math.random()*words.length)]);
          if(Math.random() > 0.8) {
            key = words[Math.floor(Math.random()*words.length)];
            data[key] = Math.random() > 0.5 ? Math.random() : key;
          }
        }

        MayoLog.log(event.join(' '), data);
      }

      MayoLog.toConsole();

      // Small changes were made in the above code in order to
      // store a key when the log entries are generated
      MayoLog.findWithDataAttribute(key);

      // In this demo, httpbin.org is utilized for XHR
      MayoLog.sendToServer('http://httpbin.org/post');
    });
    oReq.open('GET', 'https://gist.githubusercontent.com/banderson623/87f8c70cdc7ae900cd268299e4807c87/raw/f3412dcadb4ad69e664f7f8f26210589b86ea113/positive-words.txt');
    oReq.send();
  }

  const MayoLog = new Logger()
  loadSampleLogEntries(5)
})
