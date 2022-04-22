/**
 * @author JP Loh <hello@jploh.com>
 */

import UAParser from 'ua-parser-js';'ua-parser-js';
import canvasToImage from 'canvas-to-image';
import { brightness } from 'tailwindcss/defaultTheme';

var plataporma = {};
var bannedWords;
window.word = '';
window.safetyCheckFailedTO = false;

const nameRedraw = () => {
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

const shufflePlataporma = () => {
    const pKeys = Object.keys(plataporma);
    pKeys.forEach((p) => {
        plataporma[p] = plataporma[p].map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    });
};

const safetyCheckFailed = () => {
    const submit = document.querySelector('#pinkify-submit');
    submit.innerHTML = 'Try again.'
    const buzzGroup = document.querySelectorAll('#pinkify-submit, #nl-0, #nl-1, #nl-2, #nl-3, #nl-4');
    buzzGroup.forEach((el) => {
        el.classList.add('animate-buzz');
        el.getAnimations().forEach((anim) => {
            anim.cancel();
            anim.play();
        });
    });
    document.querySelector('#nl-0').innerHTML = '';
    document.querySelector('#nl-1').innerHTML = '';
    document.querySelector('#nl-2').innerHTML = '';
    document.querySelector('#nl-3').innerHTML = '';
    document.querySelector('#nl-4').innerHTML = '';
    if(window.safetyCheckFailedTO) {
        clearTimeout(window.safetyCheckFailedTO);
    }
    window.safetyCheckFailedTO = window.setTimeout(() => {
        const submit = document.querySelector('#pinkify-submit');
        submit.innerHTML = 'Find out now!';
        const buzzGroup = document.querySelectorAll('#pinkify-submit, #nl-0, #nl-1, #nl-2, #nl-3, #nl-4');
        buzzGroup.forEach((el) => {
            el.classList.remove('animate-buzz');
        });
    }, 1500);
};

const imgRender = () => {
    if(window.word.length === 0) {
        return true;
    }

    if(bannedWords.includes(window.word)) {
        window.word = '';
        safetyCheckFailed();
        return true;
    }

    document.querySelector('#pinkify-form').classList.add('hidden');
    document.querySelector('#pinkify-kb').classList.add('hidden');
    document.querySelector('#pinkify-result').classList.remove('hidden');
    shufflePlataporma();

    const l1x = 100; // First line X
    const l1y = 105 + ((5 - window.word.length) * 23); // First line Y
    const l1fb = 2; // First letter baseline offset
    const l1s = 2; // First letter shadow distance
    const l1p = 18; // First letter right padding
    const l1py = 5; // First letter baseline
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
    bg.addColorStop(1, '#bf2077');
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
    cvctx.fillRect(10, 10, 460, 51);
    cvctx.fillStyle = 'rgba(164, 227, 147, 1)';
    cvctx.fillRect(10, 58, 460, 4);

    // Header Text
    cvctx.font = 'bold 23px Montserrat';
    cvctx.fillStyle = 'rgba(164, 227,147, 1)';
    cvctx.textAlign = 'center';
    cvctx.fillText('MY NAME IS...', 240, 45);

    // Watermark
    const m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix()
    const wmPathScaled = new Path2D();
    const wmTransform = m.scale(1.15);
    const wmTranslate = wmTransform.translate(40, 0);
    const wmPath = new Path2D('M294.41,163.21c.93-11.67-.69-22.92-6.18-33.33-1'
        + '1.79-22.36-29.92-35.88-55.4-38.47a57.21,57.21,0,0,0-21.92,1.67,82.7'
        + '3,82.73,0,0,0-21.63,9.72,2.13,2.13,0,0,1-2.86-.12c-11.4-8.23-23.79-'
        + '14-38-15-9.4-.69-18.6.06-27.44,3.7-13.9,5.73-23.4,15.87-29.52,29.39'
        + 'a63.75,63.75,0,0,0-5.07,17.75,2.67,2.67,0,0,1-1.69,2.35,30,30,0,0,0'
        + '-4.6,2.57,44.27,44.27,0,0,0-18.27,26.17,70.88,70.88,0,0,0,1.35,40.1'
        + '9,88.93,88.93,0,0,0,6,14.53,54.3,54.3,0,0,0,15.32,17.18,49.61,49.61'
        + ',0,0,0,27,10c2.1.14,2.93,1.08,3.68,2.9,8.66,20.95,24.75,31.76,47,34'
        + 'a65.73,65.73,0,0,0,26.59-3.17c14.4-4.54,25.12-13.33,31.07-27.47.19-'
        + '.46.4-.92.64-1.46,1.77.86,3.36,1.71,5,2.41,7.94,3.37,16.21,3.89,24.'
        + '62,2.54A41.77,41.77,0,0,0,278.85,243a43.78,43.78,0,0,0,7.74-24.22,4'
        + '7.74,47.74,0,0,0-4.5-22.13,1.79,1.79,0,0,1,.31-1.45C289.17,185.6,29'
        + '3.46,175,294.41,163.21Zm-75-24.71c9.38,7.46,14.68,17.38,17,29s-.57,'
        + '22-6.54,31.75c-7.62,12.47-18.52,20.8-32.71,24.48-6.36,1.65-12.91,1.'
        + '43-19.41.65-.08,0-.14-.11-.34-.28.34-.13.6-.25.87-.34,14.48-4.92,27'
        + '-12.67,35.75-25.54,5.17-7.55,6.92-15.94,6.81-25-.17-13.7-11.8-27.8-'
        + '29.81-27.85a36.78,36.78,0,0,0-15.56,2.93c-7.32,3.32-11.75,9.23-14.7'
        + ',16.47A44.34,44.34,0,0,0,158,177c-.1.89-.26,1.77-.43,2.89-7.25-3.52'
        + '-12.69-8.62-14.74-16.37-3.28-12.37.36-22.57,10.4-29.94a44.2,44.2,0,'
        + '0,1,19.18-7c1.69-.12,3.86-.39,6-.39C193.33,126.06,207.42,128.94,219'
        + '.44,138.5ZM170,181a33.15,33.15,0,0,1,11.47-18.22,16.62,16.62,0,0,1,'
        + '7.37-3.52,9.61,9.61,0,0,1,8.71,2.41,14,14,0,0,1,3.3,4.07c1,1.94,1,3'
        + '.12-.22,4.69a34.81,34.81,0,0,1-15.16,11.19A27.77,27.77,0,0,1,175,18'
        + '3.65C168.84,184.1,170,181,170,181ZM87,219.66a69,69,0,0,1-7.07-13.09'
        + 'c-5.73-16.81-6.28-33,5.89-48,.21,1.82.38,3.28.54,4.75A90.75,90.75,0'
        + ',0,0,92.47,187a65.25,65.25,0,0,0,11.31,18.2,25.5,25.5,0,0,0,3.9,3.7'
        + '3,3,3,0,0,1,1.24,2.76c0,5.65.08,11.31.27,17,.07,2.21.52,4.41.82,6.7'
        + '9C100.08,233.1,92.78,227.4,87,219.66Zm23.69-35.8a66.61,66.61,0,0,1-'
        + '8.22-30.54c-.2-5.57-.38-11.14,1-16.59,4-16.33,13.47-28,29.62-33.35,'
        + '14.8-4.9,28.3-1.66,40.34,8.05,1,.82,2,1.72,3,2.57-4.36.5-8.59.73-12'
        + '.73,1.51-9.76,1.83-18.63,5.69-25.88,12.66A37.21,37.21,0,0,0,126,153'
        + '.57c-.42,7-.16,14,2.39,20.66,3.71,9.68,10.84,16.1,20.05,20.41,8.7,4'
        + '.08,17.91,5.19,27.39,4.61l4.25-.33a38.12,38.12,0,0,0,17.26-6.18c1.3'
        + '4-.86,2.53-1.94,3.85-2.84a51.73,51.73,0,0,1-10,10,49.43,49.43,0,0,1'
        + '-17.67,8.33,41.07,41.07,0,0,1-11.12,1.71A60.75,60.75,0,0,1,136,206,'
        + '49.2,49.2,0,0,1,110.67,183.86Zm160.15,34.89c-1,12-6.63,21.38-18,26.'
        + '42-7,3.11-14.41,2.57-21.67.58a34.61,34.61,0,0,1-15.91-9.08c-.56-.57'
        + '-1.21-1-2.08-1.78-.47,1.5-.91,2.7-1.24,3.93-3.5,12.9-11.71,21.73-23'
        + '.69,27.19-11.32,5.16-23,6.11-34.84,2.12a40.1,40.1,0,0,1-23-19.18,51'
        + '.61,51.61,0,0,1-5.65-18.41c-.19-1.41-.34-2.83-.45-4.25a16,16,0,0,1,'
        + '.13-2,15.12,15.12,0,0,1,1.42.89c7.57,6.28,16.38,10.05,25.73,12.7,12'
        + '.58,3.57,25.41,3.8,38.33,2.86,8.26-.6,16-3.19,23.52-6.45a68.91,68.9'
        + '1,0,0,0,23-15.59,47.68,47.68,0,0,0,9.78-14.19,68.91,68.91,0,0,0,5-1'
        + '5c.22-1.09.57-2.17.94-3.54,1.5,1,2.84,1.67,4,2.59C266,196.24,271.84'
        + ',206,270.82,218.75ZM279,156.44c-.41,8.94-2.14,17.27-6.23,25.35-.49-'
        + '.42-.91-.76-1.31-1.13a44.47,44.47,0,0,0-16.27-9.44,3.46,3.46,0,0,1-'
        + '2.63-3.2C250,149.47,238,136,238,136a60.83,60.83,0,0,0-23.64-16.7c-4'
        + '.38-1.73-9.1-2.59-13.67-3.84-.44-.11-.89-.19-1.61-.34,8.88-7.26,18.'
        + '73-10.63,29.89-9.91,11,.71,20.67,4.92,29.36,11.51C258.3,116.72,280.'
        + '14,132.4,279,156.44Z');
    wmPathScaled.addPath(wmPath, wmTranslate);
    let wmBg = cvctx.createLinearGradient(240, 0, 240, 480);
    wmBg.addColorStop(0, '#f17495');
    wmBg.addColorStop(1, '#d44384');
    cvctx.fillStyle = wmBg;
    cvctx.fill(wmPathScaled);

    // Bottom Decorations
    const by = 370 - ((5 - window.word.length) * 16);
    cvctx.fillStyle = 'rgba(255, 255, 255, 1)';
    cvctx.beginPath();
    cvctx.ellipse(400, by - 11, 30, 13, 0, 0, 2 * Math.PI);
    cvctx.fill();
    cvctx.fillStyle = 'rgba(255, 228, 243, 1)';
    cvctx.font = 'bold 30px Montserrat';
    cvctx.textAlign = 'right';
    cvctx.fillText('AND I AM FOR LENI', 360, by);
    cvctx.font = '600 18px Montserrat';
    cvctx.textAlign = 'center';
    cvctx.fillText('Find your own Gobyernong Tapat name', 240, by + 20);
    cvctx.font = '600 18px Montserrat';
    cvctx.fillText('at AngatLahat.com', 240, by + 42);
    cvctx.font = '600 13px Montserrat';
    cvctx.fillText('MGA NAGAWA, GINAGAWA AT GAGAWIN SA LENIROBREDO.COM', 240, by + 66);
    cvctx.font = 'small-caps expanded 800 18px Montserrat';
    cvctx.fillText('#GobyernongTapatAngatBuhayLahat', 240, by + 85);
    cvctx.fillStyle = 'rgba(231, 38, 146)';
    cvctx.font = 'bold 26px Montserrat';
    cvctx.fillText('10', 400, by - 1);

    // First letters (shadow)
    cvctx.font = 'bold 37px Montserrat';
    cvctx.fillStyle = 'rgba(191, 43, 94, 1)';
    cvctx.textAlign = 'center';
    cvctx.fillText(nl1, l1x - l1p - l1s, l1y + l1py + l1s);
    cvctx.fillText(nl2, l1x - l1p - l1s, l2y + l1py + l1s);
    cvctx.fillText(nl3, l1x - l1p - l1s, l3y + l1py + l1s);
    cvctx.fillText(nl4, l1x - l1p - l1s, l4y + l1py + l1s);
    cvctx.fillText(nl5, l1x - l1p - l1s, l5y + l1py + l1s);

    // First letters
    cvctx.font = 'bold 37px Montserrat';
    cvctx.fillStyle = 'rgba(255, 228, 243, 1)';
    cvctx.textAlign = 'center';
    cvctx.fillText(nl1, l1x - l1p, l1y + l1py);
    cvctx.fillText(nl2, l1x - l1p, l2y + l1py);
    cvctx.fillText(nl3, l1x - l1p, l3y + l1py);
    cvctx.fillText(nl4, l1x - l1p, l4y + l1py);
    cvctx.fillText(nl5, l1x - l1p, l5y + l1py);

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

    fetch('./banned-words.json')
        .then(response => response.json())
        .then((data) => {
            bannedWords = data;
        });
    
    document.querySelector('body').addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            document.fonts.load('italic 600 23px Montserrat').then(imgRender);
        } else if(event.key === 'Backspace') {
            if(window.word.length > 0) {
                window.word = window.word.substring(0, window.word.length - 1);
            }
            nameRedraw();
        } else if(/^[a-z]$/.test(event.key.toLowerCase())) {
            if(window.word.length < 5) {
                window.word += event.key;
            }
            nameRedraw();
        }
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
                document.fonts.load('italic 600 23px Montserrat').then(imgRender);
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
        document.fonts.load('italic 600 23px Montserrat').then(imgRender);
        event.preventDefault();
    });

    // Share or copy
    let uaOS = new UAParser().getOS().name;
    let uaBName = new UAParser().getBrowser().name;
    const clipBrowsers = ['Chrome', 'Chromium', 'Opera', 'Edge'];
    if(uaOS !== 'Android' && uaOS !== 'iOS') {
        if(clipBrowsers.includes(uaBName)) {
            document.querySelector('#pinkify-share').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><use xlink:href="#clipboard"></use></svg> Copy';
        } else {
            document.querySelector('#pinkify-share').classList.add('hidden');
        }
    }
    document.querySelector('#pinkify-share').addEventListener('click', async (event) => {
        const canvas = document.querySelector('#pinkify-result-stage');
        const dataUrl = canvas.toDataURL();
        const canvasFetch = await fetch(dataUrl);
        const canvasToBlob = await canvasFetch.blob();    
        
        if(uaOS === 'Android' || uaOS === 'iOS') {
            const shareData = {
                title: 'Platapormang Tapat',
                text: 'Pangalan ko ang resibo ng leader na si #LeniRobredo. Para sa #GobyernongTapat #AngatBuhayLahat. Siya lang ang may track record na maraming napatunayan at mapapatunayan pa. Tara na, ipanalo na natin ‘to #KulayRosasAngBukas #LeniKiko2022',
                files: [
                    new File([canvasToBlob], 'AngatLahat.png', {
                        type: canvasToBlob.type,
                        lastModified: new Date().getTime
                    })
                ]
            };
            try {
                navigator.share(shareData);
            } catch (err) {
                console.log(err);
            }
        } else {
            const clipItem = new ClipboardItem({ "image/png": canvasToBlob });
            navigator.clipboard.write([clipItem]);
            document.querySelector('#pinkify-share').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><use xlink:href="#clipboard-check"></use></svg> Copied!';
            setTimeout(() => {
                document.querySelector('#pinkify-share').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><use xlink:href="#clipboard"></use></svg> Copy';
            }, 1500);
        }
        event.preventDefault();
    });

    document.querySelector('#pinkify-dl').addEventListener('click', (event) => {
        const canvas = document.querySelector('#pinkify-result-stage');
        canvasToImage(canvas, {
            name: 'AngatLahat',
            type: 'png',
            quality: 1
        });
        event.preventDefault();
    });

    document.querySelector('#pinkify-reset').addEventListener('click', (event) => {
        window.word = '';
        document.querySelector('#pinkify-result').classList.add('hidden');
        document.querySelector('#pinkify-form').classList.remove('hidden');
        document.querySelector('#pinkify-kb').classList.remove('hidden');
        nameRedraw();
    });
});