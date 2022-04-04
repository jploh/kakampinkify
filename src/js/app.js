/**
 * @author JP Loh <hello@jploh.com>
 */

//import _ from 'lodash';
import { brightness } from 'tailwindcss/defaultTheme';

var plataporma = {};
window.word = '';

var nameRedraw = () => {
    for(let i = 0; i < 5; i++) {
        let letterDiv = document.querySelector('#nl-' + i);
        if(i <= window.word.length) {
            const currentLetter = window.word.substr(i, 1);
            if(currentLetter === 'ñ') {
                letterDiv.innerHTML = '&ntilde;';
            } else {
                letterDiv.innerHTML = window.word.substr(i, 1);
            }
        } else {
            letterDiv.innerHTML = '';
        }
    }
};

var imgRender = () => {
    if(window.word.length === 0) {
        return true;
    }

    document.querySelector('#pinkify-form').classList.add('hidden');
    document.querySelector('#pinkify-kb').classList.add('hidden');
    document.querySelector('#pinkify-result').classList.remove('hidden');

    const l1x = 100; // First line X
    const l1y = 132; // First line Y
    const l1fb = 2; // First letter baseline offset
    const l1s = 2; // First letter shadow distance
    const l1p = 4; // First letter right padding
    const l1l = 53; // Line spacing (including line height)
    const l2y = l1y + l1l; // Line 2 Y
    const l3y = l2y + l1l; // Line 3 Y
    const l4y = l3y + l1l; // Line 4 Y
    const l5y = l4y + l1l; // Line 3 Y

    const nl1 = (window.word.length >= 1 ? window.word.substring(0, 1).toUpperCase() : '');
    const nl2 = (window.word.length >= 2 ? window.word.substring(1, 2).toUpperCase() : '');
    const nl3 = (window.word.length >= 3 ? window.word.substring(2, 3).toUpperCase() : '');
    const nl4 = (window.word.length >= 4 ? window.word.substring(3, 4).toUpperCase() : '');
    const nl5 = (window.word.length == 5 ? window.word.substring(4, 5).toUpperCase() : '');

    let letterCounts = {
        'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0,
        'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0,
        'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, 'Ñ': 0, '': 0
    };

    let m1 = plataporma[nl1][letterCounts[nl1]].substring(1);
    letterCounts[nl1]++;
    let m2 = plataporma[nl2][letterCounts[nl2]].substring(1);
    letterCounts[nl2]++;
    let m3 = plataporma[nl3][letterCounts[nl3]].substring(1);
    letterCounts[nl3]++;
    let m4 = plataporma[nl4][letterCounts[nl4]].substring(1);
    letterCounts[nl4]++;
    let m5 = plataporma[nl5][letterCounts[nl5]].substring(1);

    let canvas = document.querySelector('#pinkify-result-stage');
    let cvctx = canvas.getContext('2d');

    // Main background
    let bg = cvctx.createLinearGradient(240, 0, 240, 480);
    bg.addColorStop(0, '#f67d98');
    bg.addColorStop(1, '#bf2077')
    cvctx.fillStyle = bg;
    cvctx.fillRect(0, 0, 480, 480);

    // Border
    cvctx.fillStyle = 'rgba(181, 215, 172)';
    cvctx.fillRect(0, 20, 7, 460);
    cvctx.fillRect(7, 473, 453, 7);
    cvctx.fillStyle = 'rgba(255, 140, 157)';
    cvctx.fillRect(0, 0, 7, 17);
    cvctx.fillRect(7, 0, 473, 7);
    cvctx.fillRect(473, 7, 7, 473);
    cvctx.fillRect(463, 473, 17, 7);
    // Inner Border
    cvctx.fillStyle = 'rgba(255, 228, 243, 1)';
    cvctx.fillRect(7, 7, 3, 466);
    cvctx.fillRect(10, 7, 460, 3);
    cvctx.fillRect(0, 17, 7, 3);
    cvctx.fillRect(470, 7, 3, 466);
    cvctx.fillRect(10, 470, 460, 3);
    cvctx.fillRect(460, 473, 3, 7);

    // Header BG
    cvctx.fillStyle = 'rgba(88, 163, 113, 1)';
    cvctx.fillRect(7, 7, 466, 51);
    cvctx.fillStyle = 'rgba(164, 227, 147, 1)';
    cvctx.fillRect(7, 58, 466, 4);

    // Header Text
    cvctx.font = 'bold 23px Montserrat';
    cvctx.fillStyle = 'rgba(164, 227,147, 1)';
    cvctx.textAlign = 'center';
    cvctx.fillText('MY NAME IS...', 240, 45);

    // First letters (shadow)
    cvctx.font = 'bold 37px Montserrat';
    cvctx.fillStyle = 'rgba(191, 43, 94, 1)';
    cvctx.textAlign = 'right';
    cvctx.fillText(nl1, l1x - l1p - l1s, l1y + l1p + l1s);
    cvctx.fillText(nl2, l1x - l1p - l1s, l2y + l1p + l1s);
    cvctx.fillText(nl3, l1x - l1p - l1s, l3y + l1p + l1s);
    cvctx.fillText(nl4, l1x - l1p - l1s, l4y + l1p + l1s);
    cvctx.fillText(nl5, l1x - l1p - l1s, l5y + l1p + l1s);

    // First letters
    cvctx.font = 'bold 37px Montserrat';
    cvctx.fillStyle = 'rgba(255, 228, 243, 1)';
    cvctx.textAlign = 'right';
    cvctx.fillText(nl1, l1x - l1p, l1y + l1p);
    cvctx.fillText(nl2, l1x - l1p, l2y + l1p);
    cvctx.fillText(nl3, l1x - l1p, l3y + l1p);
    cvctx.fillText(nl4, l1x - l1p, l4y + l1p);
    cvctx.fillText(nl5, l1x - l1p, l5y + l1p);

    // Rest of Plataporma text 
    cvctx.font = 'small-caps italic 600 23px Montserrat';
    cvctx.fillStyle = 'rgba(255, 228, 243, 1)';
    cvctx.textAlign = 'left';
    cvctx.fillText(m1, l1x, l1y);
    cvctx.fillText(m2, l1x, l2y);
    cvctx.fillText(m3, l1x, l3y);
    cvctx.fillText(m4, l1x, l4y);
    cvctx.fillText(m5, l1x, l5y);
};

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('./plataporma.json')
        .then(response => response.json())
        .then((data) => {
            plataporma = data;
            plataporma[''] = ['', '', '', '',''];
            document.querySelector('#pinkify-submit').disabled = false;
        });

    document.querySelector('body').addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            imgRender();
        } else if(event.key === 'Backspace') {
            if(window.word.length > 0) {
                window.word = window.word.substring(0, window.word.length - 1);
            }
            nameRedraw();
        } else if(/^[a-z]$/.test(event.key)) {
            if(window.word.length < 5) {
                window.word += event.key;
            }
            nameRedraw();
        }/* else {
            console.log('Ignored keypress');
        }*/
    });

    const kbKeys = document.querySelectorAll('.pinkify-kb-key');
    kbKeys.forEach((kbKey) => {
        kbKey.addEventListener('click', (event) => {
            if(event.currentTarget.value === '0') { // Backspace
                if(window.word.length > 0) {
                    window.word = window.word.substring(0, window.word.length - 1);
                }
                nameRedraw();
            } else if(event.target.value === '1') { // Enter
                imgRender();
            } else if(event.target.value === '9') { // N with tilde
                if(window.word.length < 5) {
                    window.word += 'ñ';
                }
                nameRedraw();
            } else {
                if(window.word.length < 5) {
                    window.word += event.target.value;
                }
                nameRedraw();
            }
        });
    });

    document.querySelector('#pinkify-submit').addEventListener('click', (event) => {
        imgRender();
        event.preventDefault();
    });

    document.querySelector('#pinkify-share').addEventListener('click', (event) => {
        const canvas = document.querySelector('#pinkify-result-stage');
        const dataUrl = canvas.toDataURL();
        fetch(dataUrl).then((response) => {
            response.blob().then((blob) => {
                const shareData = {
                    title: 'Platapormang Tapat',
                    files: [
                        new File([blob], 'angatlahat.png', {
                            type: blob.type,
                            lastModified: new Date().getTime
                        })
                    ]
                };
                try {
                    navigator.share(shareData);
                } catch (err) {
                    console.log(err);
                }
            });
        });
    });

    document.querySelector('#pinkify-reset').addEventListener('click', (event) => {
        window.word = '';
        document.querySelector('#pinkify-result').classList.add('hidden');
        document.querySelector('#pinkify-form').classList.remove('hidden');
        document.querySelector('#pinkify-kb').classList.remove('hidden');
        nameRedraw();
    });
});