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

/*
Theme version
*/
var themedate = '(03/09/2017)';
var themeversion = '2.0';

/*
Effects
*/
var effects = {
    "blur": {
        "value": 0,
        "enabled": false
    },
    "brightness": {
        "value": 0,
        "enabled": false
    },
    "contrast": {
        "value": 0,
        "enabled": false
    },
    "grayscale": {
        "value": 0,
        "enabled": false
    },
    "huerotate": {
        "value": 0,
        "enabled": false
    },
    "invert": {
        "value": 0,
        "enabled": false
    },
    "saturation": {
        "value": 0,
        "enabled": false
    },
}

/*
Global variables
*/
var defaultcolorcss = ''; // Default background color
var files = {}; // Files list
var imagewaittime = 3000; // Time to load background images in miliseconds
var israndom; // Checks if user selected random folder or single image
var lastimg = ''; // Last used image
var maxrandomiterations = 500; // Maximum iterations to randomize wallpaper
var randomlimitsup = 0.05; // Random limit number
var randomtime; // Random function timer in miliseconds
var selectedfolder; // User random folder selection
var selectedimg; // Actual image on background
var timedrandomizefun = null; // Random timed function
var transitionduration = 400; // Duration of transition effect
var transitioneffect = 'none'; // Background transition effect
