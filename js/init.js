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

function updateFileList(mode, currentFiles) {
    // Write status message on console
    switch (mode) {
        case 'add':
            consolemsg('Added or changed file {0}.'.format(currentFiles));
            break;
        case 'del':
            consolemsg('File {0} deleted.'.format(currentFiles));
            break;
        default:
            break;
    }
}

function randomImageResponse(propertyName, filePath) {
    // Set random wallpaper
    setWallpaper(filePath);
    selectedimg = filePath;
}

function dummy2varfun(a, b) {}

function nextRandomImage() {
    // Next Random Image
    try {
        for (i = 0; i < maxrandomiterations; i++) {
            r = Math.random();
            if (r < randomlimitsup) {
                consolemsg('Chosing random image with {0} iterations. r={1}<{2}'.format(i, roundNumber(r, 2), randomlimitsup));
                window.wallpaperRequestRandomFileForProperty('customrandomdirectory', randomImageResponse);
                return;
            }
            window.wallpaperRequestRandomFileForProperty('customrandomdirectory', dummy2varfun);
        }
    } catch (e) {
        consolemsg(parseException(e));
    } finally {}

}

function setWallpaperSingleImage() {
    // Set single image
    setWallpaper(selectedimg, false);
}

// Property Listener
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Load random directory
        if (properties.customrandomdirectory) {
            if (properties.customrandomdirectory.value) {
                try {
                    consolemsg('Set random directory "<i>{0}</i>".'.format(cutword(properties.customrandomdirectory.value, maxwordlengthdirs)));
                    israndom = true;
                    selectedfolder = properties.customrandomdirectory.value;
                    selectedimg = '';
                    lastimg = '';
                    nextRandomImage();
                    if (randomtime > 0 && israndom) {
                        clearRandomFunTimer();
                        intervalsetminutesmsg('Randomized function', randomtime);
                        timedrandomizefun = setInterval(nextRandomImage, randomtime);
                    } else {
                        clearRandomFunTimer();
                    }
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearAll();
            }
        }

        // Read single selected image
        if (properties.customimage) {
            if (properties.customimage.value) {
                try {
                    clearRandomFunTimer();
                    setWallpaper(properties.customimage.value, true);
                    israndom = false;
                    selectedimg = properties.customimage.value;
                    selectedfolder = '';
                    lastimg = '';
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearAll();
            }
        }

        // Read blur
        if (properties.blur) {
            try {
                blur = properties.blur.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Minute transition
        if (properties.minutes) {
            randomtime = properties.minutes.value * 60000;
            if (randomtime > 0 && israndom) {
                try {
                    clearRandomFunTimer();
                    timedrandomizefun = setInterval(nextRandomImage, randomtime);
                    intervalsetminutesmsg('Randomized function', randomtime);
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearRandomFunTimer();
            }
        }

        // Background color if no image
        if (properties.backgroundcolor) {
            try {
                defaultcolorcss = createRGBColor(properties.backgroundcolor.value);
                consolemsg('Default background color: {0}.'.format(setRgbLineMsg(defaultcolorcss)));
                setWallpaper();
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console font color
        if (properties.consolefontcolor) {
            try {
                defaultconsolefontcolor = createRGBColor(properties.consolefontcolor.value);
                consolemsg('Console font color: {0}.'.format(setRgbLineMsg(defaultconsolefontcolor)));
                $('#consoletext').css('color', defaultconsolefontcolor);
                $('#author').css('color', 'rgb(255, 255, 255)');
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console background color
        if (properties.consolebgcolor) {
            try {
                defaultconsolebgcolor = createRGBColor(properties.consolebgcolor.value);
                consolemsg('Console background color: {0}.'.format(setRgbLineMsg(defaultconsolebgcolor)));
                $('#consoletext').css('background-color', defaultconsolebgcolor);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide console
        if (properties.showconsole) {
            try {
                showconsole = properties.showconsole.value;
                setConsoleStatus(showconsole);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide author
        if (properties.hideauthor) {
            try {
                hideauthorbool = properties.hideauthor.value;
                setAuthorStatus(!hideauthorbool);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console opacity
        if (properties.consolealpha) {
            try {
                consolealpha = properties.consolealpha.value / 100;
                $('#console').css('opacity', consolealpha);
                consolemsg('Console opacity set to {0}.'.format(consolealpha));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Transition style
        if (properties.transitionstyle) {
            try {
                transitioneffect = properties.transitionstyle.value;
                consolemsg("Set '{0}' transition effect.".format(transitioneffect));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Transition duration
        if (properties.transitioneffecttime) {
            try {
                transitionduration = properties.transitioneffecttime.value;
                consolemsg('Set transition duration to {0} ms.'.format(transitionduration));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
    },
    userDirectoryFilesAddedOrChanged: function(propertyName, changedFiles) {
        if (!files.hasOwnProperty(propertyName)) {
            files[propertyName] = changedFiles;
        } else {
            files[propertyName] = files[propertyName].concat(changedFiles);
        }
        updateFileList('add', files[propertyName]);
    },
    userDirectoryFilesRemoved: function(propertyName, removedFiles) {
        for (var i = 0; i < removedFiles.length; ++i) {
            var index = files[propertyName].indexOf(removedFiles[i]);
            if (index >= 0) {
                files[propertyName].splice(index, 1);
            }
        }
        updateFileList('del', files[propertyName]);
    }
};
