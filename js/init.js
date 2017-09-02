// Load library functions
var colorThief = new ColorThief();

// Local vars
var blur = 0;
var defaultcolorcss;
var files = {};
var israndom;
var randomtime;
var selectedimg;
var timedrandomizefun;

function updateFileList(currentFiles) {}

function randomImageResponse(propertyName, filePath) {
    setWallpaper(filePath);
    selectedimg = filePath;
}

function nextRandomImage() {
    window.wallpaperRequestRandomFileForProperty('customrandomdirectory', randomImageResponse);
}

// A global object that can listen to property changes.
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Load random directory
        if (properties.customrandomdirectory) {
            if (properties.customrandomdirectory.value) {
                nextRandomImage();
                israndom = true;
                if (randomtime > 0 && israndom) {
                    timedrandomizefun = setTimeout(nextRandomImage, randomtime);
                } else {
                    try {
                        clearTimeout(timedrandomizefun);
                        consolemsg('Randomized function stopped.');
                    } catch (e) {} finally {}
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
            randomtime = properties.minutes * 60000;
            if (randomtime > 0 && israndom) {
                timedrandomizefun = setTimeout(nextRandomImage, randomtime);
                consolemsg('Randomized function set to {0} minutes.'.format(properties.minutes));
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
        // First time that files are sent.
        if (!files.hasOwnProperty(propertyName)) {
            files[propertyName] = changedFiles;
        } else {
            files[propertyName] = files[propertyName].concat(changedFiles);
        }
        updateFileList(files[propertyName]);
    },
    userDirectoryFilesRemoved: function(propertyName, removedFiles) {
        // The user removed files from the directory while the wallpaper was running.
        // Remove these files from the global array first.
        for (var i = 0; i < removedFiles.length; ++i) {
            var index = files[propertyName].indexOf(removedFiles[i]);
            if (index >= 0) {
                files[propertyName].splice(index, 1);
            }
        }
        updateFileList(files[propertyName]);
    }
};
