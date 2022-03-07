/**
 * @author JP Loh <hello@jploh.com>
 */

import _ from 'lodash';

document.addEventListener('DOMContentLoaded', (event) => {
    var nameLetters = document.querySelectorAll('.name-letter');
    _.forEach(nameLetters, (el, n) => {
        el.addEventListener('focus', (event) => {
            console.log(event.target.value);
        });
        el.addEventListener('keyup', (event) => {
            var _el = event.target;
            _el.value = _el.value.toUpperCase();
            _el.value = _el.value.replace(/[^A-Z]/gmi, '');
            if(_el.value == '') {
                if(_el.dataset.nlidx != '1') {
                    var prev = parseInt(_el.dataset.nlidx) - 1;
                    var elPrev = document.querySelector('#nl-' + prev.toString());
                    elPrev.focus();
                    elPrev.setSelectionRange(1, 1);
                }
            } else {
                var nameLetterIdx = parseInt(_el.dataset.nlidx);
                if(_el.value.length > 1) {
                    for(var i = nameLetterIdx + 1; i <= 5; i++) {
                        var elNext = document.querySelector('#nl-' + i.toString());
                        elNext.value = _el.value.substring(i-1, i);
                    }
                    elNext.focus();
                    _el.value = _el.value.substring(0, 1);
                } else if(_el.dataset.nlidx != '5') {
                    var next = nameLetterIdx + 1;
                    var elNext = document.querySelector('#nl-' + next.toString());
                    elNext.focus();
                }
            }
        });
    });
});