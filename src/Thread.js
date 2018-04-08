import Utility from './Utility';

class Thread {
    constructor() {
        this.threadInfo = {
            id: $('#search_bar_thread').val(),
            title: $('div.titleBar > h1').text().replace(/\s+/g, ' ').trim()
        };

        this.addEventListener();
        this.addButtons();
    }

    addEventListener() {
        $(document).on('keydown', (e) => {
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 100: // 4
                        this.threadInfo.desc = 'bad';
                        this.addThread();
                        break;
                    case 101: // 5
                        this.threadInfo.desc = 'waiting';
                        this.addThread();
                        break;
                    case 102: // 6
                        this.threadInfo.desc = 'good';
                        this.addThread();
                        break;
                    case 103: // 7
                        this.threadInfo.desc = 'downloaded';
                        this.addThread();
                        break;
                    case 96: // 0
                        this.removeThread();
                        break;
                }
            }
        });
    }

    addButtons() {
        let $buttons = $(`
            <div style="position: absolute; width:100%; text-align:center; top:0;">
                <button data-add="good">Good</button>
                <button data-add="waiting">Waiting</button>
                <button data-add="downloaded">Downloaded</button>
                <button data-add="bad">Bad</button>
            </div>
        `);

        $(window).scroll(function () {
            let windowScrollTop = $(window).scrollTop();
            if (windowScrollTop === 0) {
                $buttons.css('top', 0);
            } else {
                $buttons.css('top', 50 + windowScrollTop);
            }
        });

        $buttons.appendTo(document.body);

        $buttons.on('click', '[data-add]', (e) => {
            let $button = $(e.currentTarget);
            this.threadInfo.desc = $button.data('add');
            this.addThread();
        });
    }

    addThread() {
        let threads = Utility.getThreads();
        let updated = false;
        for (let i = 0, l = threads.length; i < l; i++) {
            if (threads[i].id === this.threadInfo.id) {
                threads[i] = this.threadInfo;
                updated = true;
                break;
            }
        }
        if (!updated) {
            threads.push(this.threadInfo);
        }
        Utility.saveThreads(threads);
    }

    removeThread() {
        let threads = Utility.getThreads();
        threads = threads.filter((t) => t.id !== this.threadInfo.id);
        Utility.saveThreads(threads);
    }
}

export default Thread;