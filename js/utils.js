function consolemsg(msg) {
    // Create a message on the console
    $('#console #consoletext').html(msg);
}

function setWallpaper(file) {
    // Set image wallpaper
    $('#background-img').css('background-image', 'url(file:///' + file + ')');
    $('#background-img').css('-webkit-filter', 'blur(' + blur + 'px)');
    $('#background-img').css('filter', 'blur(' + blur + 'px)');
    $('#background-img').css('transform', 'scale(1.1)');
}
