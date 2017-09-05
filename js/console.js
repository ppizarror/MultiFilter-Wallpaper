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

// Console messages
var consolemsglist = ['<b>[CONSOLE] Blur-Wallpaper v{0} {1} by ppizarror</b>'.format(themeversion, themedate)];
var consolemsglistinfo = [''];
var maxmsg = 13; // Maximum number of active messages
var maxwordlengthdirs = 30; // Maximun src length of file shown on console
var msgadded = 1; // Total messages added

// Console configuration
var consolecfg = {
    "alpha": 1.0,
    "bgcolor": "",
    "fontcolor": "",
    "height": 200,
    "hideauthor": true,
    "scale": 1.0,
    "show": false,
    "width": 500
}

function consolemsg(msg) {
    // Create a message on the console
    try {
        // Add msg to list
        msgstr = '';
        if (msgadded < 10) {
            msgstr = '0' + msgadded;
        } else {
            msgstr = msgadded;
        }
        msg_info = '{0} <b>[<i>{1}</i>]</b> '.format(msgstr, new Date().format('m/d H:i:s'));
        if (msg != consolemsglist[consolemsglist.length - 1]) {
            consolemsglist.push(msg);
            consolemsglistinfo.push(msg_info);
            msgadded += 1;
        }
        if (consolemsglist.length > maxmsg) {
            consolemsglist.splice(1, 1);
            consolemsglistinfo.splice(1, 1)
        }

        // Concatenate all messages and write to console
        msgc = '';
        for (i = 0; i < consolemsglist.length; i++) {
            msgc += consolemsglistinfo[i] + consolemsglist[i] + '<br>';
        }
        $('#console #consoletext').html(msgc);
    } catch (e) {} finally {}
}

function setConsoleStatus(status) {
    // Enable/Disable console
    if (status) {
        $('#console').css('display', 'block');
    } else {
        $('#console').css('display', 'none');
    }
}

function setAuthorStatus(status) {
    // Enable/Disable author under console
    if (status) {
        $('#author').css('display', 'block');
    } else {
        $('#author').css('display', 'none');
    }
}

function parseException(e) {
    // Set exception message
    return "<span class='msgexception'>EXCEPTION!</span> {0} {1}".format(e.message, e.stack);
}

function setRgbLineMsg(c) {
    // Create span with same color as message
    return '<span style="color: {0}; text-shadow: 0 0 1px #000000, 0 0 1px #000000;"><b>{0}</b></span>'.format(c);
}

function consoleScale() {
    // Change scale of console
    sc = consolecfg.scale;
    newh = consolecfg.height * sc;
    neww = consolecfg.width * sc;
    newhcorr = -86 - (newh - consolecfg.height);
    $('#console').css('width', '{0}px'.format(neww));
    $('#console').css('height', '{0}px'.format(newh));
    $('#console').css('margin-top', '{0}px'.format(newhcorr));
}

function wallpaperConsoleStatus(file) {
    // Write wallpaper status
    b1 = 'Wallpaper set: <i>{0}</i>'.format(cutword(file, maxwordlengthdirs));
    b2 = "";
    if (effects.blur.enabled && effects.blur.value > 0) {
        b2 += 'Blur {0}px'.format(effects.blur.value);
    } else {
        b2 += 'Blur disabled';
    }
    if (b2 != "") {
        b2 += ", ";
    }
    if (effects.grayscale.enabled && effects.grayscale.value > 0) {
        b2 += 'Grayscale {0}%'.format(effects.grayscale.value);
    } else {
        b2 += 'Grayscale disabled';
    }
    if (b2 != "") {
        b2 += ", ";
    }
    if (effects.brightness.enabled && effects.brightness.value > 0) {
        b2 += 'Brightness {0}%'.format(effects.brightness.value);
    } else {
        b2 += 'Brightness disabled';
    }
    if (b2 != "") {
        b2 += ", ";
    }
    if (effects.contrast.enabled && effects.contrast.value > 0) {
        b2 += 'Contrast {0}%'.format(effects.contrast.value);
    } else {
        b2 += 'Contrast disabled';
    }
    if (b2 != "") {
        b2 += ", ";
    }
    if (effects.huerotate.enabled && effects.huerotate.value > 0) {
        b2 += 'Hue rotation angle {0}deg'.format(effects.huerotate.value);
    } else {
        b2 += 'Hue rotation disabled';
    }
    if (b2 != "") {
        b2 += ", ";
    }
    if (effects.invert.enabled && effects.invert.value > 0) {
        b2 += 'Invert {0}%'.format(effects.invert.value);
    } else {
        b2 += 'Invert disabled';
    }
    consolemsg('{0} | {1}.'.format(b1, b2));
}
