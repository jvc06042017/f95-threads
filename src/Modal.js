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
            <div data-close="true" class="f95-modal-background"></div>
            <div class="f95-modal-card">
                <header class="f95-modal-card-head" style="background-color: #1E2029 !important">
                    <p class="f95-modal-card-title f95-has-text-grey-lighter">F95 - Threads</p>
                    <button data-close="true" class="f95-delete"></button>
                </header>
                <section class="f95-modal-card-body" style="background-color: #292B37 !important">
                    <div class="f95-columns">
                        <div class="f95-column">
                            <h5 data-check="good" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Good</h5>
                            <input class="f95-input" data-search="good" type="text">
                            <div data-list="good"></div>
                        </div>
                        <div class="f95-column">
                            <h5 data-check="waiting" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Waiting</h5>
                            <input class="f95-input" data-search="waiting" type="text">
                            <div data-list="waiting"></div>
                        </div>
                        <div class="f95-column">
                            <h5 data-check="downloaded" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Downloaded</h5>
                            <input class="f95-input" data-search="downloaded" type="text">
                            <div data-list="downloaded"></div>
                        </div>
                        <div class="f95-column">
                            <h5 data-check="bad" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Bad</h5>
                            <input class="f95-input" data-search="bad" type="text">
                            <div data-list="bad"></div>
                        </div>
                    </div>
                </section>
                <footer class="f95-modal-card-foot f95-buttons f95-is-right" style="background-color: #1E2029 !important">
                    <button data-close="true" class="f95-button f95-is-dark">Close</button>
                </footer>
            </div>
        </div>`);

        GM_addStyle(`
            .good-card {
                background-color: #008f5a !important;
            }
            .waiting-card {
                background-color: #0696BB !important;
            }
            .downloaded-card {
                background-color: #696969 !important;
            }
            .bad-card {
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
                    $element.find('.f95-card-content').prepend($i);
                    count++;

                    if (count === threads.length) {
                        alert('Done');
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
            // remove everything between '[' and ']'
            let title = thread.title.replace(/\[.*?\]/g, '').trim();
            // get everything between '[' and ']'
            let tags = thread.title.match(/\[.+?\]/g) !== null ? thread.title.match(/\[.+?\]/g).join('  ') : '';
            let url = Utility.getUrlFromId(thread.id);

            let $card = $(`
            <a href="${url}" data-id="${thread.id}" title="${tags}">
                <div class="f95-card ${thread.desc}-card">
                    <div class="f95-card-content f95-has-text-white">
                        ${title}
                    </div>
                </div>
            </a>`);

            $card.click(() => {
                window.location.replace(url);
            });

            let $column = this.$modal.find(`[data-list="${thread.desc}"]`);
            $column.append($card);
        });
    }
}

export default Modal;