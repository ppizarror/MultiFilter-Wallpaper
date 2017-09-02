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

function clearRandomFunTimer() {
    // Delete timer of random wallpaper
    try {
        clearTimeout(timedrandomizefun);
        consolemsg('Randomized function stopped.');
    } catch (e) {} finally {}
}

function clearSingleImageFunTimer() {
    // Delete timer of single image wallpaper
    try {
        clearTimeout(timedsingleimgfun);
        consolemsg('Single image function stopped.');
    } catch (e) {} finally {}
}

function setWallpaper(file) {
    // Set image wallpaper
    if (file) {
        $('#background-img').css('background-image', 'url(file:///' + file + ')');
        $('#background-img').css('-webkit-filter', 'blur(' + blur + 'px)');
        $('#background-img').css('filter', 'blur(' + blur + 'px)');
        $('#background-img').css('transform', 'scale(1.1)');
        consolemsg('Wallpaper set: {0} | Blur {1}px.'.format(file, blur));
    } else {
        $('#background-img').css('background-color', defaultcolorcss);
        $('#background-img').css('background-image', '');
        $('#background-img').css('-webkit-filter', '');
        $('#background-img').css('filter', '');
        $('#background-img').css('transform', '');
        clearTimeout(timedrandomizefun);
        consolemsg('Deleted background image and set background-color {0}.'.format(defaultcolorcss));
    }
}

function createRGBColor(colorstr) {
    // Create color from sting
    color = colorstr.split(' ');
    color = color.map(function(c) {
        return Math.ceil(c * 255);
    });
    return 'rgb(' + color + ')';
}
