// Console messages
var consolemsglist = [];
var maxmsg = 5;

function consolemsg(msg) {
    // Add msg to list
    consolemsglist.push('[{0}] {1}'.format(new Date().format('m-d-Y h:i:s'), msg));
    if (consolemsglist.length > maxmsg) {
        consolemsglist.splice(1, 1);
    }

    // Concatenate all messages
    msgc = '';
    for (i = 0; i < consolemsglist.length; i++) {
        msgc += consolemsglist[i] + '<br>';
    }

    // Create a message on the console
    $('#console #consoletext').html(msgc);
}

function setWallpaper(file) {
    // Set image wallpaper
    $('#background-img').css('background-image', 'url(file:///' + file + ')');
    $('#background-img').css('-webkit-filter', 'blur(' + blur + 'px)');
    $('#background-img').css('filter', 'blur(' + blur + 'px)');
    $('#background-img').css('transform', 'scale(1.1)');
    consolemsg('Wallpaper set: {0} | Blur {1}px.'.format(file, blur));
}

// String format
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}
