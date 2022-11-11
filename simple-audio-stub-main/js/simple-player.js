console.log("hello world")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const audioOnButton = document.getElementById('audio-on-button');
const scrollBar = document.getElementById('scroll-bar');
const volumeSlider = document.getElementById('volume-slider');
const audio = new Audio("audio/Lazy Walk - Cheel.mp3");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const imagearray = [image1, image2, image3, image4];

//when page reloaded image is already selected with it is track
window.addEventListener("load", () => {
    imageonclick(image1);
});

let isPlaying = false;
let isScrolling = false;
//BUTTON LISTENER

playPauseButton.onclick = function () {
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }

}

// audioOnButton.addEventListener = function () {
//     if (volumeSlider.range.value > 1) {
//         audioOnButton.src = "images/no-volume.png";
// }
// }

//AUDIO LISTENERS
//AUDIO EVENT LISTENERS
// event triggered once audio loaded
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
    // console.log("is playing = " + isPlaying) 
    audio.src = "audio/Lazy Walk - Cheel.mp3"
    imageonclick(image1)
    audio.play()
}

image2.onclick = function () {
    // console.log("is playing = " + isPlaying) 
    audio.src = "audio/Classic Mariachi - Jimena Contreras.mp3"
    imageonclick(image2)
    audio.play()
}

image3.onclick = function () {
    // console.log("is playing = " + isPlaying) 
    audio.src = "audio/Walking in the Sky - Nico Staf.mp3"
    imageonclick(image3)
    audio.play()
}

image4.onclick = function () {
    // console.log("is playing = " + isPlaying) 
    audio.src = "audio/In Memory of Jean Talon - Mini Vandals.mp3"
    imageonclick(image4)
    audio.play()
}

// event triggered when audio plays
audio.onplay = function () {
    playPauseButton.src = "images/pause.svg"
}

//event triggered when audio is paused
audio.onpause = function () {
    playPauseButton.src = "images/play.svg"
}


//event triggered by metadata load 
audio.onloadedmetadata = function () {
    totalTime.innerHTML = formatTime(audio.duration)
    currentTime.innerHTML = formatTime(0)
    scrollBar.max = Math.floor(audio.duration)
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
    // isPlaying = false;
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

    //when manually scrolling volume off and on, volume icon changes
    if (audio.volume == 0) {
        audioOnButton.src = "images/volume-off.png"
    }
    else {
        audioOnButton.src = "images/speaker-filled-audio-tool.png"
    }
});

//when click on the volume icon, turns the sound off
audioOnButton.onclick = function () {
    if (audioOnButton.src = "images/volume-off.png") {
        volumeSlider.value = 0;
        audio.volume = 0;
    }
}


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