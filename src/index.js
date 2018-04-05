import Modal from './Modal';
import Thread from './Thread';
import ThreadList from './ThreadList';
import Utility from './Utility';

let threads = Utility.getThreads();

new Modal(threads);

if (window.location.href.includes('https://f95zone.com/threads/')) {
    new Thread();
} else {
    ThreadList.init(threads);
}