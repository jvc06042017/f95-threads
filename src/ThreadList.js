import Utility from './Utility';

let ThreadList = {};

ThreadList.init = function (threads) {
    let threadsToFlash = [];

    $('div.titleText > h3.title').each(function () {
        let $this = $(this);
        // get the title and remove extra white space
        let title = $this.text().replace(/\s+/g, ' ').trim();

        let $aTag = $this.find('a:not(.prefixLink, .unreadLink)');
        // get the thread id (between '.' and '/')
        let id = $aTag.attr('href').match(/\.(.*?)\//g)[0].slice(1, -1);
        
        var matchingThread;
        threads.forEach((t) => {
            if(t.id === id){
                matchingThread = t;
                // exiting loop
                return false;
            }
        });

        // if it has been tagged
        if(matchingThread){
            // add the class to highlight it's description
            $aTag.css('color', Utility.colors[matchingThread.desc]);
            // if it's not a bad thread and the title has changed
            if (matchingThread.desc !== 'bad' && matchingThread.title !== title) {
                // make the title flash
                threadsToFlash.push($aTag);
            }
        }
    });

    // toggle the white-flash class on updated thread every 750 ms
    setInterval(function () {
        threadsToFlash.forEach(($t) => $t.toggleClass('white-flash'));
    }, 750);
};

export default ThreadList;