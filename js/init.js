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

function nextRandomImage() {
    // Next Random Image
    window.wallpaperRequestRandomFileForProperty('customrandomdirectory', randomImageResponse);
}

function setWallpaperSingleImage() {
    // Set single image
    setWallpaper(selectedimg);
}

// Property Listener
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Load random directory
        if (properties.customrandomdirectory) {
            if (properties.customrandomdirectory.value) {
                try {
                    consolemsg('Set random directory {0}.'.format(properties.customrandomdirectory.value));
                    israndom = true;
                    selectedfolder = properties.customrandomdirectory.value;
                    selectedimg = '';
                    consolemsg(randomtime);
                    consolemsg('hola');
                    nextRandomImage();
                    nextRandomImage();
                    if (randomtime > 0 && israndom) {
                        clearRandomFunTimer();
                        consolemsg('Randomized function set to {0} minutes.'.format(randomtime / 60000));
                        timedrandomizefun = setTimeout(nextRandomImage, randomtime);
                    } else {
                        clearRandomFunTimer();
                    }
                    clearSingleImageFunTimer();
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}

            }
        } else
        // Read single selected image
        {
            if (properties.customimage) {
                if (properties.customimage.value) {
                    setWallpaper(properties.customimage.value);
                    israndom = false;
                    selectedimg = properties.customimage.value;
                    selectedfolder = '';
                    properties.customrandomdirectory.value = '';
                    clearRandomFunTimer();
                    clearSingleImageFunTimer();
                    timedsingleimgfun = setTimeout(setWallpaperSingleImage, 60000);
                }
            }
        }

        // Read blur
        if (properties.blur) {
            blur = properties.blur.value;
            setWallpaper(selectedimg);
        }

        // Minute transition
        if (properties.minutes) {
            randomtime = properties.minutes.value * 60000;
            if (randomtime > 0 && israndom) {
                clearRandomFunTimer();
                timedrandomizefun = setTimeout(nextRandomImage, randomtime);
                consolemsg('Randomized function set to {0} minutes.'.format(properties.minutes.value));
            } else {
                try {
                    clearTimeout(timedrandomizefun);
                    consolemsg('Randomized function stopped.');
                } catch (e) {} finally {}
            }
        }

        // Background color if no image
        if (properties.backgroundcolor) {
            defaultcolorcss = createRGBColor(properties.backgroundcolor.value);
            consolemsg('Default background color: {0}.'.format(defaultcolorcss));
            setWallpaper();
        }

        // Console font color
        if (properties.consolefontcolor) {
            defaultconsolefontcolor = createRGBColor(properties.consolefontcolor.value);
            consolemsg('Console font color: {0}.'.format(defaultconsolefontcolor));
            $('#consoletext').css('color', defaultconsolefontcolor);
            $('#author').css('color', defaultconsolefontcolor);
        }

        // Console background color
        if (properties.consolebgcolor) {
            defaultconsolebgcolor = createRGBColor(properties.consolebgcolor.value);
            consolemsg('Console background color: {0}.'.format(defaultconsolebgcolor));
            $('#consoletext').css('background-color', defaultconsolebgcolor);
        }

        // Hide/Unhide console
        if (properties.showconsole) {
            showconsole = properties.showconsole.value;
            setConsoleStatus(showconsole);
        }

        // Hide/Unhide author
        if (properties.hideauthor) {
            hideauthorbool = properties.hideauthor.value;
            setAuthorStatus(!hideauthorbool);
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
