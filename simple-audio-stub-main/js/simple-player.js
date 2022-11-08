console.log("hello world")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const scrollBar = document.getElementById('scroll-bar');
const volumeSlider = document.getElementById('volume-slider');
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
let isScrolling = false;
//BUTTON LISTENER
playPauseButton.onclick = function(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
//AUDIO LISTENERS
//AUDIO EVENT LISTENERS
// event triggered once audio loaded
}
audio.oncanplaythrough = function(){
    scrollBar.disabled = false;
}

// event triggered when audio plays
audio.onplay = function(){
    playPauseButton.src = "images/pause.svg"
}

//event triggered when audio is paused
audio.onpause = function(){
    playPauseButton.src = "images/play.svg"
}

//event triggered by meta data load
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    scrollBar.innerHTML = Math.floor(audio.duration);
}
//event triggered when time updates
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime);
    if(!isScrolling){
        scrollBar.value = Math.floor(audio.currentTime);
    }
}

//event triggered when audio ends
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    scrollBar.value = 0;
    playPauseButton.src = "images/play.svg";
}

// SCROLL BAR LISTENER
// event triggered on interaction with seek bar
scrollBar.oninput = function(){
    isScrolling = true;
}

scrollBar.onchange = function(){
    audio.currentTime = scrollBar.value;
}

// working audio control
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
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