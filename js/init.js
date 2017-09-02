/*
BLUR-WALLPAPER.
Project website: https://github.com/ppizarror/blur-wallpaper

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

// Load library functions
var colorThief = new ColorThief();

// Local vars
var blur = 0;
var defaultcolorcss;
var defaultconsolebgcolor;
var defaultconsolefontcolor;
var files = {};
var israndom = false;
var randomtime = 0;
var selectedimg;
var showconsole = false;
var timedrandomizefun;
var hideauthorbool;

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

// Property Listener
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Load random directory
        if (properties.customrandomdirectory) {
            if (properties.customrandomdirectory.value) {
                consolemsg('Set random directory {0}.'.format(properties.customrandomdirectory.value));
                nextRandomImage();
                israndom = true;
                if (randomtime > 0 && israndom) {
                    clearRandomFunTimer();
                    timedrandomizefun = setTimeout(nextRandomImage, randomtime);
                    consolemsg('Randomized function set to {0} minutes.'.format(randomtime / 60000));
                } else {
                    clearRandomFunTimer();
                }
            }
        }

        // Read single selected image
        if (properties.customimage) {
            if (properties.customimage.value) {
                setWallpaper(properties.customimage.value);
                israndom = false;
                selectedimg = properties.customimage.value;
                try {
                    clearTimeout(timedrandomizefun);
                    consolemsg('Randomized function stopped.');
                } catch (e) {} finally {}
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
            defaultcolorcss = properties.backgroundcolor.value.split(' ');
            defaultcolorcss = defaultcolorcss.map(function(c) {
                return Math.ceil(c * 255);
            });
            defaultcolorcss = 'rgb(' + defaultcolorcss + ')';
            consolemsg('Default background color: {0}.'.format(defaultcolorcss));
            setWallpaper();
        }

        // Console font color
        if (properties.consolefontcolor) {
            defaultconsolefontcolor = properties.consolefontcolor.value.split(' ');
            defaultconsolefontcolor = defaultconsolefontcolor.map(function(c) {
                return Math.ceil(c * 255);
            });
            defaultconsolefontcolor = 'rgb(' + defaultconsolefontcolor + ')';
            consolemsg('Console font color: {0}.'.format(defaultconsolefontcolor));
            $('#consoletext').css('color', defaultconsolefontcolor);
            $('#author').css('color', defaultconsolefontcolor);
        }

        // Console background color
        if (properties.consolebgcolor) {
            defaultconsolebgcolor = properties.consolebgcolor.value.split(' ');
            defaultconsolebgcolor = defaultconsolebgcolor.map(function(c) {
                return Math.ceil(c * 255);
            });
            defaultconsolebgcolor = 'rgb(' + defaultconsolebgcolor + ')';
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
