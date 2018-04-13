import Utility from './Utility';

/* global GM_addStyle GM_setValue GM_getResourceText */

class Modal {
    constructor(threads) {
        this.$modal = {};
        this.lists = {
            good: [],
            waiting: [],
            downloaded: [],
            bad: []
        };

        threads.forEach((t) => {
            this.lists[t.desc].push(t);
        });

        this.appendToBody();
        this.bindEvent();
        this.addThreads(threads);
    }

    appendToBody() {
        this.$modal = $(`
        <div id="f95-modal" class="f95-modal">
            <div class="f95-modal-background" data-close="true"></div>
            <div class="f95-modal-card">
                <header class="f95-modal-card-head">
                    <p class="f95-modal-card-title">F95 - Threads</p>
                    <button class="f95-delete" data-close="true"></button>
                </header>
                <section class="f95-modal-card-body">
                    <div class="f95-columns">
                        <div class="f95-column">
                            <h1 data-check="good">Good</h1>
                            <input data-search="good" type="text">
                            <div id="good-list"></div>
                        </div>
                        <div class="f95-column">
                            <h1 data-check="waiting">Waiting</h1>
                            <input data-search="waiting" type="text">
                            <div id="waiting-list"></div>
                        </div>
                        <div class="f95-column">
                            <h1 data-check="downloaded">Downloaded</h1>
                            <input data-search="downloaded" type="text">
                            <div id="downloaded-list"></div>
                        </div>
                        <div class="f95-column">
                            <h1 data-check="bad">Bad</h1>
                            <input data-search="bad" type="text">
                            <div id="bad-list"></div>
                        </div>
                    </div>
                </div>
                <footer class="f95-modal-card-foot">
                    <button class="f95-button">Close</button>
                </footer>
            </div>
        </div>`);

        GM_addStyle(`
            .good-card {
                color: white !important;;
                background-color: #008f5a !important;
            }
            .waiting-card {
                color: white !important;;
                background-color: #0696BB !important;
            }
            .downloaded-card {
                color: white !important;;
                background-color: #696969 !important;
            }
            .bad-card {
                color: white !important;;
                background-color: #710 !important;
            }
        `);

        // Add the modal to the website
        $(document.body).append(this.$modal);

        // Add css for the modal
        let f95 = GM_getResourceText('f95');
        GM_addStyle(f95);
    }

    bindEvent() {
        // Open the modal when pressing the numpad 8 key
        $(document).on('keyup', (e) => {
            if (e.keyCode === 104) {
                this.$modal.addClass('f95-is-active');
            }
        });

        // Hide the modal when clicking on the background or on the close icon
        this.$modal.find('[data-close="true"]').click(() => this.$modal.removeClass('f95-is-active'));

        // Check for update for a whole tag list
        this.$modal.on('click', '[data-check]', (e) => {
            let threads = this.lists[$(e.currentTarget).data('check')];
            let count = 0;

            threads.forEach((t) => {
                let $element = this.$modal.find(`[data-id="${t.id}"]`);
                $element.find('i').remove();
                let url = $element.attr('href');
                $.get(url, function (data) {
                    let newTitle = $(data).find('div.titleBar > h1').text().trim();
                    let $i = $('<i/>', {
                        class: 'fa',
                        style: 'color: black; float: left;'
                    });

                    $i.addClass((t.title !== newTitle ? 'fa-exclamation' : 'fa-times'));
                    $element.prepend($i);
                    count++;

                    if (count === threads.length) {
                        let $span = $('<span/>', {
                            text: ' - Done',
                            style: 'color: green'
                        });
                        $('.c-modal-card-title.c-dark').append($span);
                        setTimeout(() => $span.remove(), 3000);
                    }
                });
            });
        });

        // search a game whitin a tag list (include both the name of the game and the tags)
        this.$modal.on('keyup', '[data-search]', (e) => {
            let $currentTarget = $(e.currentTarget);
            let threads = this.lists[$currentTarget.data('search')];
            let userInput = $currentTarget.val().toLowerCase();

            threads.forEach((t) => {
                let $element = this.$modal.find(`[data-id="${t.id}"]`);
                if (t.title.toLowerCase().includes(userInput)) {
                    $element.show();
                } else {
                    $element.hide();
                }
            });
        });

        // save threads as a json file
        $('#saveThreads').click(() => {
            let threads = Utility.getThreads();
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(threads)));
            element.setAttribute('download', 'savedThreads.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        });

        // upload threads from a json file
        $('#uploadThreads').click(() => {
            var element = document.createElement('input');
            element.setAttribute('type', 'file');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.addEventListener('change', (e) => {
                var file = e.target.files[0];
                if (!file) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    GM_setValue('threads', e.target.result);
                    location.reload();
                };
                reader.readAsText(file);
            });

            element.click();
        });
    }

    // create a card for every thread in its corresponding tag list
    addThreads(threads) {
        // add the number of threads for each tag next to the title
        for (let desc in this.lists) {
            let $span = $('<span/>', {
                text: ` (${this.lists[desc].length})`
            });
            this.$modal.find(`[data-check="${desc}"]`).append($span);
        }

        // Create an element for each saved thread and add it to the corresponding column
        threads.forEach((thread) => {
            let card = $('<a/>', {
                // remove everything between '[' and ']'
                'text': thread.title.replace(/\[.*?\]/g, '').trim(),
                // get everything between '[' and ']'
                'title': thread.title.match(/\[.+?\]/g) !== null ? thread.title.match(/\[.+?\]/g).join('  ') : '',
                'class': `c-list-group-item ${thread.desc}-card`,
                'data-id': thread.id,
                'href': Utility.getUrlFromId(thread.id)
            });

            let $column = this.$modal.find(`#${thread.desc}-list`);
            $column.append(card);
        });
    }
}

export default Modal;