/*
BLUR-WALLPAPER.
Project repo: https://github.com/ppizarror/blur-wallpaper

MIT License
Copyright (c) 2017 Pablo Pizarro @ppizarror.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
Timer functions
*/
function clearRandomFunTimer() {
    // Delete timer of random wallpaper
    try {
        clearTimeout(timedrandomizefun);
        consolemsg('Randomized function stopped.');
    } catch (e) {
        consolemsg(parseException(e));
    } finally {}
}

function intervalsetminutesmsg(msg, miliseconds) {
    // Create console message that display msg with x minutes
    m = miliseconds / 60000;
    if (m <= 1) {
        consolemsg('{0} set to {1} minute.'.format(msg, m));
    } else {
        consolemsg('{0} set to {1} minutes.'.format(msg, m));
    }
}

/*
Wallpaper property functions
*/
function setWallpaper(file, showmsg) {
    // Set image wallpaper
    showmsg = (typeof showmsg !== 'undefined') ? showmsg : true;
    try {
        if (file) {
            $('#background-img').css('background-image', 'url(file:///' + file + ')');
            $('#background-img').css('-webkit-filter', 'blur(' + blur + 'px)');
            $('#background-img').css('filter', 'blur(' + blur + 'px)');
            $('#background-img').css('transform', 'scale(1.1)');
            if (showmsg) {
                if (blur > 0) {
                    consolemsg('Wallpaper set: "<i>{0}</i>" | Blur {1}px.'.format(cutword(file, maxwordlengthdirs), blur));
                } else {
                    consolemsg('Wallpaper set: "<i>{0}</i>" | Blur disabled.'.format(cutword(file, maxwordlengthdirs)));
                }
            }
        } else {
            if (defaultcolorcss != '') {
                $('#background-img').css('background-color', defaultcolorcss);
                $('#background-img').css('background-image', '');
                $('#background-img').css('-webkit-filter', '');
                $('#background-img').css('filter', '');
                $('#background-img').css('transform', '');
            }
            try {
                if (selectedimg != '') {
                    setWallpaper(selectedimg, true);
                } else {
                    if (showmsg && defaultcolorcss != '') {
                        consolemsg('Deleted background image and set background-color {0}.'.format(defaultcolorcss));
                    }
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
    } catch (e) {
        consolemsg(parseException(e));
    } finally {}

}

function clearAll() {
    // Clear all statuses
    clearRandomFunTimer();
    selectedfolder = '';
    selectedimg = '';
    consolemsg('Clearing wallpaper.');
    setWallpaper('', true);
}

/*
Aux functions
*/

function createRGBColor(colorstr) {
    // Create color from sting
    color = colorstr.split(' ');
    color = color.map(function(c) {
        return Math.ceil(c * 255);
    });
    return 'rgb(' + color + ')';
}

function roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
        var arr = ("" + num).split("e");
        var sig = ""
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        var i = +arr[0] + "e" + sig + (+arr[1] + scale);
        var j = Math.round(i);
        var k = +(j + "e-" + scale);
        return k;
    }
}

function cutword(word, nchars) {
    // Function that cut word into nchars if length is greater
    if (word.length <= nchars) {
        return word;
    } else {
        return '...' + word.substring(word.length - nchars, word.length);
    }
}
