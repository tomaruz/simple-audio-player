console.log("hello world")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const scrollBar = document.getElementById('scroll-bar');
const volumeSlider = document.getElementById('volume-slider');
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const imagearray = [image1, image2, image3, image4]

let isScrolling = false;
//BUTTON LISTENER
playPauseButton.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    //AUDIO LISTENERS
    //AUDIO EVENT LISTENERS
    // event triggered once audio loaded
}
audio.oncanplaythrough = function () {
    scrollBar.disabled = false;
}

function imageonclick(image) {
    for (let i = 0; i < imagearray.length; i++) {
        if (imagearray[i] == image) {
            imagearray[i].classList.add("activeimage")
        }
        else {
            imagearray[i].classList.remove("activeimage")
        }
    }
}

image1.onclick = function () {
    audio.src = "audio/Soft-Background-for-Interview.webm"
    playPauseButton.src = "images/play.svg"
    imageonclick(image1)
}

image2.onclick = function () {
    audio.src = "audio/Hey There - half.cool.mp3"
    playPauseButton.src = "images/play.svg"
    imageonclick(image2)
}

image3.onclick = function () {
    audio.src = "audio/It Was a Time - TrackTribe.mp3"
    playPauseButton.src = "images/play.svg"
    imageonclick(image3)
}

image4.onclick = function () {
    audio.src = "audio/Mulholland - King Canyon.mp3"
    playPauseButton.src = "images/play.svg"
    imageonclick(image4)
}

// event triggered when audio plays
audio.onplay = function () {
    playPauseButton.src = "images/pause.svg"
}

//event triggered when audio is paused
audio.onpause = function () {
    playPauseButton.src = "images/play.svg"
}

//event triggered by meta data load
audio.onloadedmetadata = function () {
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    scrollBar.innerHTML = Math.floor(audio.duration);
}
//event triggered when time updates
audio.ontimeupdate = function () {
    currentTime.innerHTML = formatTime(audio.currentTime);
    if (!isScrolling) {
        scrollBar.value = Math.floor(audio.currentTime);
    }
}

//event triggered when audio ends
audio.onended = function () {
    currentTime.innerHTML = formatTime(0);
    scrollBar.value = 0;
    playPauseButton.src = "images/play.svg";
}

// SCROLL BAR LISTENER
// event triggered on interaction with seek bar
scrollBar.oninput = function () {
    isScrolling = true;
}

scrollBar.onchange = function () {
    audio.currentTime = scrollBar.value;
    isScrolling = false;
}

// working audio control, event information being past to the function
volumeSlider.addEventListener('input', (event) => {
    const value = event.target.value;
    // have to devide by 100 because it can only be from 0 to 1
    audio.volume = value / 100;
});

//UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}