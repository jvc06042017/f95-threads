/* global GM_getValue GM_setValue */

let Utility = {};

// not used
Utility.getTitleInfo = function (title) {
    return {
        name: title.replace(/\[.*?\]/g, '').trim(),
        tags: title.match(/\[.*?\]/g),
    };
};

Utility.getUrlFromId = function (id) {
    return 'https://f95zone.com/threads/' + id;
};

Utility.getThreads = function () {
    let jsonThread = GM_getValue('threads');
    return jsonThread ? JSON.parse(jsonThread) : [];
};

Utility.saveThreads = function (threads) {
    GM_setValue('threads', JSON.stringify(threads));
};

export default Utility;