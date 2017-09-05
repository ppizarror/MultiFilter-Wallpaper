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

        // Blur effect
        if (properties.effectblur) {
            try {
                effects.blur.enabled = properties.effectblur.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Blur value
        if (properties.blur) {
            try {
                effects.blur.value = properties.blur.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Grayscale effect
        if (properties.effectgrayscale){
            try {
                effects.grayscale.enabled = properties.effectgrayscale.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Grayscale value
        if (properties.grayscale){
            try {
                effects.grayscale.value = properties.grayscale.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Brightness effect
        if (properties.effectbrightness){
            try {
                effects.brightness.enabled = properties.effectbrightness.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Brightness value
        if (properties.brightness){
            try {
                effects.brightness.value = properties.brightness.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Contrast effect
        if (properties.effectcontrast){
            try {
                effects.contrast.enabled = properties.effectcontrast.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Contrast value
        if (properties.contrast){
            try {
                effects.contrast.value = properties.contrast.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hue rotation effect
        if (properties.effecthuerotate){
            try {
                effects.huerotate.enabled = properties.effecthuerotate.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hue rotation value
        if (properties.huerotate){
            try {
                effects.huerotate.value = properties.huerotate.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Invert effect
        if (properties.effectinvert){
            try {
                effects.invert.enabled = properties.effectinvert.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Invert value
        if (properties.invert){
            try {
                effects.invert.value = properties.invert.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Saturation effect
        if (properties.effectsaturation){
            try {
                effects.saturation.enabled = properties.effectsaturation.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Saturation value
        if (properties.saturation){
            try {
                effects.saturation.value = properties.saturation.value;
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
                consolecfg.fontcolor = createRGBColor(properties.consolefontcolor.value);
                consolemsg('Console font color: {0}.'.format(setRgbLineMsg(consolecfg.fontcolor)));
                $('#consoletext').css('color', consolecfg.fontcolor);
                $('#author').css('color', 'rgb(255, 255, 255)');
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console background color
        if (properties.consolebgcolor) {
            try {
                consolecfg.bgcolor = createRGBColor(properties.consolebgcolor.value);
                consolemsg('Console background color: {0}.'.format(setRgbLineMsg(consolecfg.bgcolor)));
                $('#consoletext').css('background-color', consolecfg.bgcolor);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide console
        if (properties.showconsole) {
            try {
                consolecfg.show = properties.showconsole.value;
                setConsoleStatus(consolecfg.show);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide author
        if (properties.hideauthor) {
            try {
                consolecfg.hideauthor = properties.hideauthor.value;
                setAuthorStatus(!consolecfg.hideauthor);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console opacity
        if (properties.consolealpha) {
            try {
                consolecfg.alpha = properties.consolealpha.value / 100;
                $('#console').css('opacity', consolecfg.alpha);
                consolemsg('Console opacity set to {0}.'.format(consolecfg.alpha));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

		/*
        // Console scale
        if (properties.consolescale) {
            try {
                consolecfg.scale = properties.consolescale.value / 100;
                consoleScale();
                consolemsg('Console scale set to {0}.'.format(consolecfg.scale));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
		*/

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
