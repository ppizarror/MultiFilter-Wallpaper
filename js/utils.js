/*
MULTIFILTER-WALLPAPER
Github: https://github.com/ppizarror/MultiFilter-Wallpaper

MIT License
Copyright (c) 2017 Pablo Pizarro R. @ ppizarror.com

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

function setWallpaper(file, showmsg) {
    // Set image wallpaper
    showmsg = (typeof showmsg !== 'undefined') ? showmsg : true;
    try {
        if (file) {
            $('#background-img').css('background-image', 'url(file:///' + file + ')');
            applyCssEffects('#background-img')
            if (lastimg != '' && israndom) {
                // Display auxiliar background div
                $('#background-aux').css('display', 'block');
                $('#background-aux').css('opacity', '1.0');
                // Enable background aux image
                switch (transitioneffect) {
                    case 'fade':
                        function wallpaperFadeTransition() {
                            $('#background-aux').fadeOut(transitionduration, function() {
                                $('#background-aux').css('background-image', 'url(file:///' + lastimg + ')');
                            });
                        }
                        setTimeout(wallpaperFadeTransition, imagewaittime);
                        break;
                    case 'none':
                        function wallpaperNoneTransition() {
                            $('#background-aux').fadeOut(0, function() {
                                $('#background-aux').css('background-image', 'url(file:///' + lastimg + ')');
                            });
                        }
                        setTimeout(wallpaperNoneTransition, imagewaittime);
                        break;
                    default:
                        consolemsg('Error: invalid transition effect.');
                        break;
                }
            } else {
                $('#background-aux').css('background-image', 'url(file:///' + file + ')');
            }
            applyCssEffects('#background-aux');
            if (israndom) {
                lastimg = file;
            }
            if (showmsg) {
                if (israndom) {
                    setTimeout(function() {
                        wallpaperConsoleStatus(file);
                    }, imagewaittime);
                } else {
                    wallpaperConsoleStatus(file);
                }
            }
        } else {
            if (defaultcolorcss != '') {
                $('#background-aux').css('background-color', defaultcolorcss);
                $('#background-aux').css('background-image', '');
                $('#background-aux').css('display', 'none');
                $('#background-aux').css('opacity', '1.0');
                $('#background-colored').css('background-color', defaultcolorcss);
                $('#background-img').css('background-color', defaultcolorcss);
                $('#background-img').css('background-image', '');
                restoreCssEffects('#background-aux');
                restoreCssEffects('#background-img');
            }
            try {
                if (showmsg && defaultcolorcss != '') {
                    consolemsg('Deleted wallpaper image and set color {0}.'.format(setRgbLineMsg(defaultcolorcss)));
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
    } catch (e) {
        consolemsg(parseException(e));
    } finally {}
}

function applyCssEffects(div_id) {
    // Apply css effects to #div_id
    restoreCssEffects(div_id);
    filterline = '';

    // Add effects to filterline
    if (effects.blur.enabled) {
        filterline += 'blur(' + effects.blur.value + 'px) ';
    }
    if (effects.grayscale.enabled) {
        filterline += 'grayscale(' + effects.grayscale.value + '%) ';
    }
    if (effects.brightness.enabled) {
        filterline += 'brightness(' + effects.brightness.value + '%) ';
    }
    if (effects.contrast.enabled) {
        filterline += 'contrast(' + effects.contrast.value + '%) ';
    }
    if (effects.huerotate.enabled) {
        filterline += 'hue-rotate(' + effects.huerotate.value + 'deg) ';
    }
    if (effects.invert.enabled) {
        filterline += 'invert(' + effects.invert.value + '%) ';
    }
    if (effects.saturation.enabled) {
        filterline += 'saturate(' + effects.saturation.value + '%) ';
    }
    if (effects.opacity.enabled) {
        filterline += 'opacity(' + effects.opacity.value + '%) ';
    }
    if (effects.sepia.enabled) {
        filterline += 'sepia(' + effects.sepia.value + '%) ';
    }

    // Set filterline
    $(div_id).css('-webkit-filter', filterline);
    $(div_id).css('filter', filterline);

    // Particular css properties
    $(div_id).css('transform', 'scale(' + effects.scale.value + ')');
}

function restoreCssEffects(div_id) {
    // Restore css effects
    $(div_id).css('-webkit-filter', '');
    $(div_id).css('filter', '');
    $(div_id).css('transform', '');
}

function clearAll() {
    // Clear all statuses
    clearRandomFunTimer();
    selectedfolder = '';
    selectedimg = '';
    consolemsg('Clearing wallpaper.');
    setWallpaper('', true);
}

function clearRandomFunTimer() {
    // Delete timer of random wallpaper
    try {
        clearTimeout(timedrandomizefun);
        consolemsg('Randomize thread stopped.');
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

function createRGBColor(colorstr) {
    // Create color from sting
    color = colorstr.split(' ');
    color = color.map(function(c) {
        return Math.ceil(c * 255);
    });
    return 'rgb(' + color + ')';
}

function roundNumber(num, scale) {
    // Round a number by <scale> decimals
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
    // Function that cut word into nchars if length is greater than <nchars>
    if (word.length <= nchars) {
        return word;
    } else {
        return '...' + word.substring(word.length - nchars, word.length);
    }
}
