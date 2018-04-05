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
        <div id="f95-modal" class="c-modal">
            <div class="c-modal-background"></div>
            <div class="c-modal-card">
                <header class="c-modal-card-head c-dark">
                    <p class="c-modal-card-title c-dark">F95 - Threads</p>
                    <span id="uploadThreads" class="fa fa-upload" style="color: white; margin-right:10px"></span>
                    <span id="saveThreads" class="fa fa-save" style="color: white; margin-right:10px"></span>
                    <button class="c-delete close-modal" aria-label="close"></button>
                </header>
                <section class="c-modal-card-body c-dark c-scrollbar" style="display:flex">
                    <div class="c-columns">
                        <div class="c-column c-text-center" style="display:flex; flex-direction: column">
                            <h1 data-check="good" class="c-light">Good</h1>
                            <input data-search="good" type="text" class="c-dark-input c-light">
                            <div id="good-list" style="overflow-y: scroll"></div>
                        </div>
                        <div class="c-column c-text-center" style="display:flex; flex-direction: column">
                            <h1 data-check="waiting" class="c-light">Waiting</h1>
                            <input data-search="waiting" type="text" class="c-dark-input c-light">
                            <div id="waiting-list" style="overflow-y: scroll"></div>
                        </div>
                        <div class="c-column c-text-center" style="display:flex; flex-direction: column">
                            <h1 data-check="downloaded" class="c-light">Downloaded</h1>
                            <input data-search="downloaded" type="text" class="c-dark-input c-light">
                            <div id="downloaded-list" style="overflow-y: scroll"></div>
                        </div>
                        <div class="c-column c-text-center" style="display:flex; flex-direction: column">
                            <h1 data-check="bad" class="c-light">Bad</h1>
                            <input data-search="bad" type="text" class="c-dark-input c-light">
                            <div id="bad-list" style="overflow-y: scroll"></div>
                        </div>
                    </div>
                </section>
                <footer class="c-modal-card-foot c-dark field is-grouped is-grouped-right">
                    <button class="c-button close-modal is-link">Close</button>
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
        let cModal = GM_getResourceText('cModal');
        GM_addStyle(cModal);
    }

    bindEvent() {
        // Open the modal when pressing the numpad 8 key
        $(document).on('keyup', (e) => {
            if (e.keyCode === 104) {
                this.$modal.addClass('c-is-active');
            }
        });

        // Hide the modal when clicking on the background or on the close icon
        this.$modal.find('.c-modal-background, .close-modal').click(() => this.$modal.removeClass('c-is-active'));

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
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.threads)));
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