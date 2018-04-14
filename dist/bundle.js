// ==UserScript==
// @name         F95 - Threads
// @version      1.0.0
// @description  Seen
// @author       Anonymous
// @match        https://f95zone.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
<<<<<<< HEAD
// @resource     f95 https://raw.githubusercontent.com/jvc06042017/f95-threads/master/bulma.css?v=1
=======
// @resource     f95 https://raw.githubusercontent.com/jvc06042017/f95-threads/master/bulma.css?v=3
>>>>>>> c39cf3f1aa09ddba8a4ce1c59b2c30477ffcacb7
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

<<<<<<< HEAD
!function(t){var e={};function a(n){if(e[n])return e[n].exports;var d=e[n]={i:n,l:!1,exports:{}};return t[n].call(d.exports,d,d.exports,a),d.l=!0,d.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=4)}([function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={getTitleInfo:function(t){return{name:t.replace(/\[.*?\]/g,"").trim(),tags:t.match(/\[.*?\]/g)}},getUrlFromId:function(t){return"https://f95zone.com/threads/"+t},getThreads:function(){var t=GM_getValue("threads");return t&&"undefined"!==t?JSON.parse(t):[]},saveThreads:function(t){GM_setValue("threads",JSON.stringify(t))}},d=n;e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={init:function(t){var e=[];$("div.titleText > h3.title").each(function(){var a,n=$(this),d=n.text().replace(/\s+/g," ").trim(),o=n.find("a:not(.prefixLink, .unreadLink)"),r=o.attr("href").match(/\.(.*?)\//g)[0].slice(1,-1);t.forEach(function(t){if(t.id===r)return a=t,!1}),a&&(o.addClass(a.desc),"bad"!==a.desc&&a.title!==d&&e.push(o))}),setInterval(function(){e.forEach(function(t){return t.toggleClass("white-flash")})},750),GM_addStyle("\n        .good {\n            color: #008f5a !important;\n            cursor: pointer;\n        }\n        .waiting {\n            color: #0696BB !important;\n            cursor: pointer;\n        }\n        .downloaded {\n            color: #696969 !important;\n            cursor: pointer;\n        }\n        .bad {\n            color: #710 !important;\n            cursor: pointer;\n        }\n        .white-flash {\n            color: #FFF !important;\n        }\n    ")}},d=n;e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,d=(n=a(0))&&n.__esModule?n:{default:n};function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.threadInfo={id:$("#search_bar_thread").val(),title:$("div.titleBar > h1").text().replace(/\s+/g," ").trim()},this.addEventListener(),this.addButtons()}var e,a,n;return e=t,(a=[{key:"addEventListener",value:function(){var t=this;$(document).on("keydown",function(e){if(e.ctrlKey)switch(e.keyCode){case 100:t.threadInfo.desc="bad",t.addThread();break;case 101:t.threadInfo.desc="waiting",t.addThread();break;case 102:t.threadInfo.desc="good",t.addThread();break;case 103:t.threadInfo.desc="downloaded",t.addThread();break;case 96:t.removeThread()}})}},{key:"addButtons",value:function(){var t=this,e=$('\n            <div style="position: absolute; width:100%; text-align:center; top:0;">\n                <button data-add="good">Good</button>\n                <button data-add="waiting">Waiting</button>\n                <button data-add="downloaded">Downloaded</button>\n                <button data-add="bad">Bad</button>\n            </div>\n        ');$(window).scroll(function(){var t=$(window).scrollTop();0===t?e.css("top",0):e.css("top",50+t)}),e.appendTo(document.body),e.on("click","[data-add]",function(e){var a=$(e.currentTarget);t.threadInfo.desc=a.data("add"),t.addThread()})}},{key:"addThread",value:function(){for(var t=d.default.getThreads(),e=!1,a=0,n=t.length;a<n;a++)if(t[a].id===this.threadInfo.id){t[a]=this.threadInfo,e=!0;break}e||t.push(this.threadInfo),d.default.saveThreads(t)}},{key:"removeThread",value:function(){var t=this,e=d.default.getThreads();e=e.filter(function(e){return e.id!==t.threadInfo.id}),d.default.saveThreads(e)}}])&&o(e.prototype,a),n&&o(e,n),t}();e.default=r},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,d=(n=a(0))&&n.__esModule?n:{default:n};function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(e){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.$modal={},this.lists={good:[],waiting:[],downloaded:[],bad:[]},e.forEach(function(t){a.lists[t.desc].push(t)}),this.appendToBody(),this.bindEvent(),this.addThreads(e)}var e,a,n;return e=t,(a=[{key:"appendToBody",value:function(){this.$modal=$('\n        <div id="f95-modal" class="f95-modal">\n            <div class="f95-modal-background" data-close="true"></div>\n            <div class="f95-modal-card">\n                <header class="f95-modal-card-head" style="background-color: #1E2029 !important">\n                    <p class="f95-modal-card-title f95-has-text-grey-lighter">F95 - Threads</p>\n                    <button class="f95-delete" data-close="true"></button>\n                </header>\n                <section class="f95-modal-card-body" style="background-color: #292B37 !important">\n                    <div class="f95-columns">\n                        <div class="f95-column">\n                            <h5 data-check="good" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Good</h5>\n                            <input class="f95-input" data-search="good" type="text">\n                            <div id="good-list"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="waiting" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Waiting</h5>\n                            <input class="f95-input" data-search="waiting" type="text">\n                            <div id="waiting-list"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="downloaded" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Downloaded</h5>\n                            <input class="f95-input" data-search="downloaded" type="text">\n                            <div id="downloaded-list"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="bad" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Bad</h5>\n                            <input class="f95-input" data-search="bad" type="text">\n                            <div id="bad-list"></div>\n                        </div>\n                    </div>\n                </section>\n                <footer class="f95-modal-card-foot f95-buttons f95-is-right" style="background-color: #1E2029 !important">\n                    <button class="f95-button f95-has-text-grey-lighter">Close</button>\n                </footer>\n            </div>\n        </div>'),GM_addStyle("\n            .good-card {\n                background-color: #008f5a !important;\n            }\n            .waiting-card {\n                background-color: #0696BB !important;\n            }\n            .downloaded-card {\n                background-color: #696969 !important;\n            }\n            .bad-card {\n                background-color: #710 !important;\n            }\n        "),$(document.body).append(this.$modal);var t=GM_getResourceText("f95");GM_addStyle(t)}},{key:"bindEvent",value:function(){var t=this;$(document).on("keyup",function(e){104===e.keyCode&&t.$modal.addClass("f95-is-active")}),this.$modal.find('[data-close="true"]').click(function(){return t.$modal.removeClass("f95-is-active")}),this.$modal.on("click","[data-check]",function(e){var a=t.lists[$(e.currentTarget).data("check")],n=0;a.forEach(function(e){var d=t.$modal.find('[data-id="'.concat(e.id,'"]'));d.find("i").remove();var o=d.attr("href");$.get(o,function(t){var o=$(t).find("div.titleBar > h1").text().trim(),r=$("<i/>",{class:"fa",style:"color: black; float: left;"});if(r.addClass(e.title!==o?"fa-exclamation":"fa-times"),d.prepend(r),++n===a.length){var i=$("<span/>",{text:" - Done",style:"color: green"});$(".c-modal-card-title.c-dark").append(i),setTimeout(function(){return i.remove()},3e3)}})})}),this.$modal.on("keyup","[data-search]",function(e){var a=$(e.currentTarget),n=t.lists[a.data("search")],d=a.val().toLowerCase();n.forEach(function(e){var a=t.$modal.find('[data-id="'.concat(e.id,'"]'));e.title.toLowerCase().includes(d)?a.show():a.hide()})}),$("#saveThreads").click(function(){var t=d.default.getThreads(),e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(t))),e.setAttribute("download","savedThreads.json"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}),$("#uploadThreads").click(function(){var t=document.createElement("input");t.setAttribute("type","file"),t.style.display="none",document.body.appendChild(t),t.addEventListener("change",function(t){var e=t.target.files[0];if(e){var a=new FileReader;a.onload=function(t){GM_setValue("threads",t.target.result),location.reload()},a.readAsText(e)}}),t.click()})}},{key:"addThreads",value:function(t){var e=this;for(var a in this.lists){var n=$("<span/>",{text:" (".concat(this.lists[a].length,")")});this.$modal.find('[data-check="'.concat(a,'"]')).append(n)}t.forEach(function(t){var a=t.title.replace(/\[.*?\]/g,"").trim(),n=null!==t.title.match(/\[.+?\]/g)?t.title.match(/\[.+?\]/g).join("  "):"",o=$('\n            <div class="f95-card '.concat(t.desc,'-card" title="').concat(n,'" data-id="').concat(t.id,'">\n                <div class="f95-card-content f95-has-text-white">\n                    ').concat(a,"\n                </div>\n            </div>"));o.click(function(){window.location.replace(d.default.getUrlFromId(t.id))}),e.$modal.find("#".concat(t.desc,"-list")).append(o)})}}])&&o(e.prototype,a),n&&o(e,n),t}();e.default=r},function(t,e,a){"use strict";var n=r(a(3)),d=r(a(2)),o=r(a(1));function r(t){return t&&t.__esModule?t:{default:t}}var i=r(a(0)).default.getThreads();new n.default(i),window.location.href.includes
("https://f95zone.com/threads/")?new d.default:o.default.init(i)}]);
=======
!function(t){var e={};function a(n){if(e[n])return e[n].exports;var d=e[n]={i:n,l:!1,exports:{}};return t[n].call(d.exports,d,d.exports,a),d.l=!0,d.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=4)}([function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={getTitleInfo:function(t){return{name:t.replace(/\[.*?\]/g,"").trim(),tags:t.match(/\[.*?\]/g)}},getUrlFromId:function(t){return"https://f95zone.com/threads/"+t},getThreads:function(){var t=GM_getValue("threads");return t&&"undefined"!==t?JSON.parse(t):[]},saveThreads:function(t){GM_setValue("threads",JSON.stringify(t))}},d=n;e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={init:function(t){var e=[];$("div.titleText > h3.title").each(function(){var a,n=$(this),d=n.text().replace(/\s+/g," ").trim(),o=n.find("a:not(.prefixLink, .unreadLink)"),r=o.attr("href").match(/\.(.*?)\//g)[0].slice(1,-1);t.forEach(function(t){if(t.id===r)return a=t,!1}),a&&(o.addClass(a.desc),"bad"!==a.desc&&a.title!==d&&e.push(o))}),setInterval(function(){e.forEach(function(t){return t.toggleClass("white-flash")})},750),GM_addStyle("\n        .good {\n            color: #008f5a !important;\n            cursor: pointer;\n        }\n        .waiting {\n            color: #0696BB !important;\n            cursor: pointer;\n        }\n        .downloaded {\n            color: #696969 !important;\n            cursor: pointer;\n        }\n        .bad {\n            color: #710 !important;\n            cursor: pointer;\n        }\n        .white-flash {\n            color: #FFF !important;\n        }\n    ")}},d=n;e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,d=(n=a(0))&&n.__esModule?n:{default:n};function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.threadInfo={id:$("#search_bar_thread").val(),title:$("div.titleBar > h1").text().replace(/\s+/g," ").trim()},this.addEventListener(),this.addButtons()}var e,a,n;return e=t,(a=[{key:"addEventListener",value:function(){var t=this;$(document).on("keydown",function(e){if(e.ctrlKey)switch(e.keyCode){case 100:t.threadInfo.desc="bad",t.addThread();break;case 101:t.threadInfo.desc="waiting",t.addThread();break;case 102:t.threadInfo.desc="good",t.addThread();break;case 103:t.threadInfo.desc="downloaded",t.addThread();break;case 96:t.removeThread()}})}},{key:"addButtons",value:function(){var t=this,e=$('\n            <div style="position: absolute; width:100%; text-align:center; top:0;">\n                <button data-add="good">Good</button>\n                <button data-add="waiting">Waiting</button>\n                <button data-add="downloaded">Downloaded</button>\n                <button data-add="bad">Bad</button>\n            </div>\n        ');$(window).scroll(function(){var t=$(window).scrollTop();0===t?e.css("top",0):e.css("top",50+t)}),e.appendTo(document.body),e.on("click","[data-add]",function(e){var a=$(e.currentTarget);t.threadInfo.desc=a.data("add"),t.addThread()})}},{key:"addThread",value:function(){for(var t=d.default.getThreads(),e=!1,a=0,n=t.length;a<n;a++)if(t[a].id===this.threadInfo.id){t[a]=this.threadInfo,e=!0;break}e||t.push(this.threadInfo),d.default.saveThreads(t)}},{key:"removeThread",value:function(){var t=this,e=d.default.getThreads();e=e.filter(function(e){return e.id!==t.threadInfo.id}),d.default.saveThreads(e)}}])&&o(e.prototype,a),n&&o(e,n),t}();e.default=r},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,d=(n=a(0))&&n.__esModule?n:{default:n};function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(e){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.$modal={},this.lists={good:[],waiting:[],downloaded:[],bad:[]},e.forEach(function(t){a.lists[t.desc].push(t)}),this.appendToBody(),this.bindEvent(),this.addThreads(e)}var e,a,n;return e=t,(a=[{key:"appendToBody",value:function(){this.$modal=$('\n        <div id="f95-modal" class="f95-modal">\n            <div data-close="true" class="f95-modal-background"></div>\n            <div class="f95-modal-card">\n                <header class="f95-modal-card-head" style="background-color: #1E2029 !important">\n                    <p class="f95-modal-card-title f95-has-text-grey-lighter">F95 - Threads</p>\n                    <button data-close="true" class="f95-delete"></button>\n                </header>\n                <section class="f95-modal-card-body" style="background-color: #292B37 !important">\n                    <div class="f95-columns">\n                        <div class="f95-column">\n                            <h5 data-check="good" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Good</h5>\n                            <input class="f95-input" data-search="good" type="text">\n                            <div data-list="good"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="waiting" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Waiting</h5>\n                            <input class="f95-input" data-search="waiting" type="text">\n                            <div data-list="waiting"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="downloaded" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Downloaded</h5>\n                            <input class="f95-input" data-search="downloaded" type="text">\n                            <div data-list="downloaded"></div>\n                        </div>\n                        <div class="f95-column">\n                            <h5 data-check="bad" class="f95-is-5 f95-has-text-centered f95-has-text-grey-lighter">Bad</h5>\n                            <input class="f95-input" data-search="bad" type="text">\n                            <div data-list="bad"></div>\n                        </div>\n                    </div>\n                </section>\n                <footer class="f95-modal-card-foot f95-buttons f95-is-right" style="background-color: #1E2029 !important">\n                    <button data-close="true" class="f95-button f95-is-dark">Close</button>\n                </footer>\n            </div>\n        </div>'),GM_addStyle("\n            .good-card {\n                background-color: #008f5a !important;\n            }\n            .waiting-card {\n                background-color: #0696BB !important;\n            }\n            .downloaded-card {\n                background-color: #696969 !important;\n            }\n            .bad-card {\n                background-color: #710 !important;\n            }\n        "),$(document.body).append(this.$modal);var t=GM_getResourceText("f95");GM_addStyle(t)}},{key:"bindEvent",value:function(){var t=this;$(document).on("keyup",function(e){104===e.keyCode&&t.$modal.addClass("f95-is-active")}),this.$modal.find('[data-close="true"]').click(function(){return t.$modal.removeClass("f95-is-active")}),this.$modal.on("click","[data-check]",function(e){var a=t.lists[$(e.currentTarget).data("check")],n=0;a.forEach(function(e){var d=t.$modal.find('[data-id="'.concat(e.id,'"]'));d.find("i").remove();var o=d.attr("href");$.get(o,function(t){var o=$(t).find("div.titleBar > h1").text().trim(),r=$("<i/>",{class:"fa",style:"color: black; float: left;"});if(r.addClass(e.title!==o?"fa-exclamation":"fa-times"),d.prepend(r),++n===a.length){var i=$("<span/>",{text:" - Done",style:"color: green"});$(".c-modal-card-title.c-dark").append(i),setTimeout(function(){return i.remove()},3e3)}})})}),this.$modal.on("keyup","[data-search]",function(e){var a=$(e.currentTarget),n=t.lists[a.data("search")],d=a.val().toLowerCase();n.forEach(function(e){var a=t.$modal.find('[data-id="'.concat(e.id,'"]'));e.title.toLowerCase().includes(d)?a.show():a.hide()})}),$("#saveThreads").click(function(){var t=d.default.getThreads(),e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(t))),e.setAttribute("download","savedThreads.json"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}),$("#uploadThreads").click(function(){var t=document.createElement("input");t.setAttribute("type","file"),t.style.display="none",document.body.appendChild(t),t.addEventListener("change",function(t){var e=t.target.files[0];if(e){var a=new FileReader;a.onload=function(t){GM_setValue("threads",t.target.result),location.reload()},a.readAsText(e)}}),t.click()})}},{key:"addThreads",value:function(t){var e=this;for(var a in this.lists){var n=$("<span/>",{text:" (".concat(this.lists[a].length,")")});this.$modal.find('[data-check="'.concat(a,'"]')).append(n)}t.forEach(function(t){var a=t.title.replace(/\[.*?\]/g,"").trim(),n=null!==t.title.match(/\[.+?\]/g)?t.title.match(/\[.+?\]/g).join("  "):"",o=$('\n            <div title="'.concat(n,'" data-id="').concat(t.id,'" class="f95-card ').concat(t.desc,'-card" style="cursor: pointer">\n                <div class="f95-card-content f95-has-text-white">\n                    ').concat(a,"\n                </div>\n            </div>"));o.click(function(){window.location.replace(d.default.getUrlFromId(t.id))}),e.$modal.find('[data-list="'.concat(t.desc,'"]')).append(o)})}}])&&o(e.prototype,a),n&&o(e,n),t}();e.default=r},function(t,e,a){"use strict";var n=r(a(3)),d=r(a(2)),o=r(a(1));function r(t){return t&&t.__esModule?t:{default:t}}var i=r(a(0)).default.getThreads();new n.default(i),window.location.href.includes("https://f95zone.com/threads/")?new d.default:o.default.init(i)}]);
>>>>>>> c39cf3f1aa09ddba8a4ce1c59b2c30477ffcacb7
