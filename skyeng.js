/* 
 * 2016-10-14 Ivan V. Urvanov for Skyeng
 */

(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this)
            return null;
        if (this.matches(selector))
            return this;
        if (!this.parentElement) {
            return null
        }
        else
            return this.parentElement.closest(selector)
    };
}(Element.prototype));

function fixEvent(e) {

    e.currentTarget = this;
    e.target = e.srcElement;

    if (e.type == 'mouseover' || e.type == 'mouseenter')
        e.relatedTarget = e.fromElement;
    if (e.type == 'mouseout' || e.type == 'mouseleave')
        e.relatedTarget = e.toElement;

    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement;
        var body = document.body;

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }

    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
    }

    return e;
}

function getSelectionCoords(win) {
    "use strict"
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0, h = 0, w = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
            h = range.boundingHeight;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }

                x = rect.left;
                y = rect.top;
                h = rect.height;
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(doc.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    h = rect.height;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return {x: x, y: y, h: h};
}


function getSelectionText() {
    "use strict";
    var txt = '';
    if (txt = window.getSelection) {// Не IE, используем метод getSelection
        txt = window.getSelection().toString();
    } else { // IE, используем объект selection
        txt = document.selection.createRange().text;
    }
    return txt;
}


var translation = '';
function getTranslation() {
    "use strict";
    var url = "http://dictionary.skyeng.ru/api/v2/search-word-translation?text=";
    var text = getSelectionText() + '';

    if (text.split(/\s+/).join('').length > 0) {

        var xmlhttp = getXmlHttp()
        xmlhttp.open('GET', url + encodeURIComponent(text), true);
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {

                    showWord(xmlhttp.responseText);

                }
            }
        };
        xmlhttp.send(null);
    }

}


function changeLoadedImg() {
    var preview = document.getElementById('skyeng_word_info_preview_image');
    var image = document.getElementById('skyeng_word_info_image');
    preview.hidden = true;
    image.hidden = false;

}


function StartImgLoad(word_element) {
    var preview = document.getElementById('skyeng_word_info_preview_image');
    var image = document.getElementById('skyeng_word_info_image');
    preview.hidden = false;
    image.hidden = true;
    preview.src = 'http:' + word_element.getAttribute('preview_image_url');
    image.src = 'http:' + word_element.getAttribute('image_url');
    image.onload = changeLoadedImg;

}

function showWord(wordInfoString) {
    "use strict";

    var wordInfo = '';
    var i = 0, mean, main_info;
    try {
        wordInfo = JSON.parse(wordInfoString);
        if (wordInfo.length > 0) {
            var pictures = [];

            var d = document.createElement('div');
            
            main_info = wordInfo[0];
           
            for (i = 0; i < main_info.meanings.length; i++) {//start to load all big pictures
                var picture = document.createElement('img');
                picture.src = 'http:'+main_info.meanings[i].image_url;
                pictures.push(img);
            }
            d.setAttribute('class', 'skyeng_word_info');
            d.setAttribute('id', 'skyeng_word_info');

            var coords = getSelectionCoords();

            var img = document.createElement('img');
            img.setAttribute('id', 'skyeng_word_info_image');
            img.setAttribute('class', 'skyeng_word_info_image');
            d.appendChild(img);
            img.onload = changeLoadedImg;


            d.innerHTML += '<img id = skyeng_word_info_preview_image class = skyeng_word_info_preview_image hidden>';
            d.innerHTML += '<style>.bordered{padding-left:10px} [hidden] { display: none }.skyeng_word_meaning[active] {font-weight:bold} .skyeng_word_info_image{width:640px;height:480px}  .skyeng_word_info_preview_image{width:640px;height:480px} .skyeng_text{color:gray}</style>'


            var first_mean;
            var txt = document.createElement('div');
            txt.setAttribute('class', 'skyeng_text bordered');
            txt.innerHTML = main_info.text;
            d.appendChild(txt);
            for (i = 0; i < main_info.meanings.length; i++) {
                mean = document.createElement('div');
                mean.setAttribute('class', 'skyeng_word_meaning bordered');
                mean.setAttribute('image_url', main_info.meanings[i].image_url);
                mean.setAttribute('preview_image_url', main_info.meanings[i].preview_image_url);
                mean.setAttribute('meaning_number', (i + 1));
                mean.innerHTML = main_info.meanings[i].translation;
                if (!first_mean)
                    first_mean = mean;

                mean.onmouseover = function (e) {
                    StartImgLoad(this);
                    try {
                        document.querySelector('.skyeng_word_meaning[active]').removeAttribute('active');
                    }
                    catch (e) {

                    }
                    this.setAttribute('active', true);
                };
                mean.onmouseout = function (e) {
                    this.removeAttribute('active');
                };

                d.appendChild(mean);
            }
            var body_width = parseInt(getComputedStyle(document.body).width);

            document.body.appendChild(d);

            d.style.border = '1px solid red';
            d.style.backgroundColor = 'white';
            d.style.position = 'absolute';
            var image_width = 640;
            if (body_width < (parseInt(coords.x) + image_width)) {

                d.style.left = (body_width - image_width - 1) + 'px';
            }
            else
                d.style.left = coords.x + 'px';

            d.style.top = (coords.h + (window.pageYOffset || document.documentElement.scrollTop) + coords.y) + 'px';
            first_mean.onmouseover();

            document.onclick = function (e) {
                e = fixEvent(e);
                if (!e.target.closest('.skyeng_word_info')) {
                    if (document.getElementById('skyeng_word_info')) {
                        var el = document.getElementById('skyeng_word_info');
                        el.parentNode.removeChild(el);

                    }
                }
            }
        }

    }
    catch (e) {
        console.log(e);
    }


}


function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}



window.onload = function () {


    document.body.ondblclick = function () {

        getTranslation()
    }
}