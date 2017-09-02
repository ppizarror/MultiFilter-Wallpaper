// Load library functions
var colorThief = new ColorThief();

// Local vars
var files = {};
var blur;
var israndom;
var selectedimg;
var randomtime;

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
            }
        }

        // Read single selected image
        if (properties.customimage) {
            if (properties.customimage.value) {
                setWallpaper(properties.customimage.value);
                israndom = false;
                selectedimg = properties.customimage.value;
            }
        }

        // Read blur
        if (properties.blur) {
            blur = properties.blur.value;
            setWallpaper(selectedimg);
            properties.schemecolor.value = '1 1 1';
            consolemsg(JSON.stringify(properties));
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
