const video = document.getElementById('video');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
const currentTime = document.getElementById('current-time');
const progressBar = document.getElementById('progress-bar');
const divProgress = document.getElementById('divProgress');
const divProgressPreview = document.querySelector('.progress-preview');
const bottom = document.querySelector('.media-bottom');
const controls = document.querySelector('.controls');
const fullscreenButton = document.getElementById('fullscreen');
const container = document.querySelector('.video-container');
const muteButton = document.getElementById('mute-button');
const volumeSlider = document.getElementById('volume');
const previewVolume = document.querySelector('.progress-volume-loaded');
const throttledSetProgress = throttle(setProgress, 300); 
let progressTimeout;

function hideControl() {
    divProgress.style.display = 'none';
    divProgressPreview.style.display = 'none';
    controls.style.display = 'none';
    bottom.style.display = 'none';
    if(!(document.fullscreenElement == null)) {
        document.body.style.cursor = 'none';
    } 
}

function showControl() {
    divProgress.style.display = 'block';
    divProgressPreview.style.display = 'block';
    controls.style.display = 'flex';
    bottom.style.display = 'block';
    if(!(document.fullscreenElement == null)) {
        document.body.style.cursor = 'auto';
    } 
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(() => { hideControl() }, 5000); 
}

function playPause() {
    if (video.paused) {
        video.play();
        play.classList.remove(...play.classList);
        play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
        clearTimeout(progressTimeout);
        progressTimeout = setTimeout(() => { hideControl() }, 5000); 
    } else {
        video.pause();
        play.classList.remove(...play.classList);
        play.classList.add('fa-play', 'fa-solid', 'media-button');
        showControl();
    }
}

function updateProgress() {
    divProgress.style.width = `${(video.currentTime / video.duration) * 100}%`;


    //Get minites
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10) {
        seconds = '0' + String(seconds);
    }

    //Get minites
    let minutesDuration = Math.floor(video.duration / 60);
    if (minutesDuration < 10) {
        minutesDuration = '0' + String(minutes);
    }

    let secondsDuration = Math.floor(video.duration % 60);
    if(secondsDuration < 10) {
        secondsDuration = '0' + String(seconds);
    }

    

    currentTime.innerHTML = `<p>${minutes}:${seconds} / ${minutesDuration}:${secondsDuration}</p>`;
}


function throttle(func, delay) {
    let canRun = true;
    return function(...args) {
      if (canRun) {
        func(...args);
        canRun = false;
        setTimeout(() => {
          canRun = true;
        }, delay);
      }
    };
  }
  

function setProgress() {
     video.pause();
     video.play();
    video.currentTime = (+progressBar.value * video.duration) / 100;
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(() => { hideControl() }, 5000);
}
   

function fullscrenn () {
   if(document.fullscreenElement == null) {
     container.requestFullscreen();
   } else {
     document.exitFullscreen();
   }
}

function skip(duration) {
    video.currentTime += duration
  }
  

function changeScreen () {
    if(document.fullscreenElement == null) {
        fullscreenButton.classList.remove(...fullscreenButton.classList);
        fullscreenButton.classList.add( 'fa-solid', 'fa-expand', 'media-button');
      } else {
        fullscreenButton.classList.remove(...fullscreenButton.classList);
        fullscreenButton.classList.add( 'fa-solid', 'fa-compress', 'media-button');
      }
}

function toggleMute() {
    video.muted = !video.muted;
}


video.addEventListener('volumechange', () => {
   volumeSlider.value = video.volume;
   if(video.muted || video.volume === 0) {
    muteButton.classList.remove(...muteButton.classList);
    muteButton.classList.add( 'fa-solid', 'fa-volume-xmark', 'media-button');
   } else if (video.volume >= 0.5) {
    muteButton.classList.remove(...muteButton.classList);
    muteButton.classList.add( 'fa-solid', 'fa-volume-high', 'media-button');
   } else {
    muteButton.classList.remove(...muteButton.classList);
    muteButton.classList.add( 'fa-solid', 'fa-volume-low', 'media-button');
   }
   video.volume;
   video.muted;
   previewVolume.style.width = `${video.volume * 100}%`;
});

muteButton.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', e => {
    video.volume = e.target.value;
    video.muted = e.target.value === 0;
})

document.addEventListener('keydown', e => {
    const tagName = document.activeElement.tagName.toLowerCase;

    if(tagName === "input") return;

    switch(e.key.toLowerCase()) {
        case " ":
            e.preventDefault();
            playPause();
            break
        case "f":
            fullscrenn();
            break
        case "m":
            toggleMute();
            break
        case "arrowleft":
            skip(-5);
            break
        case "arrowright":
            skip(5);
            break            
    }
});


play.addEventListener('click', playPause);
video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', throttledSetProgress);
video.addEventListener('click', playPause);
video.addEventListener('mousemove', showControl);
fullscreenButton.addEventListener('click', fullscrenn);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateProgress, 150)
});

document.addEventListener('fullscreenchange', changeScreen);