// Load library functions
var colorThief = new ColorThief();

// Local vars
var blur = 0;
var defaultcolorcss;
var files = {};
var israndom = false;
var randomtime = 0;
var selectedimg;
var timedrandomizefun;

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
