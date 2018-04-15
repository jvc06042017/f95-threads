/* global GM_getValue GM_setValue GM_addStyle GM_getResourceText */

let Utility = {};

// not used
Utility.getTitleInfo = function (title) {
    return {
        name: title.replace(/\[.*?\]/g, '').trim(),
        tags: title.match(/\[.*?\]/g),
    };
};

Utility.colors = {
    'good': '#008f5a',
    'waiting': '#0696BB',
    'downloaded': '#696969',
    'bad': '#710'
};

Utility.addCSS = function () {
    // Add bulma library prefixed with f95-
    let f95 = GM_getResourceText('f95');
    GM_addStyle(f95);

    // Add custom CSS
    GM_addStyle(`
        .white-flash {
            color: #FFF !important;
        }
        
        .f95-scrollbar::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }

        .f95-scrollbar::-webkit-scrollbar
        {
            width: 5px;
            background-color: #d9d9d9;
        }

        .f95-scrollbar::-webkit-scrollbar-thumb
        {
            background-color: #1E2029;
        }
    `);
};

Utility.getUrlFromId = function (id) {
    return 'https://f95zone.com/threads/' + id;
};

Utility.getThreads = function () {
    let jsonThread = GM_getValue('threads');
    return jsonThread && jsonThread !== 'undefined' ? JSON.parse(jsonThread) : [];
};

Utility.saveThreads = function (threads, noStringify) {
    GM_setValue('threads', noStringify ? threads : JSON.stringify(threads));
};

export default Utility;