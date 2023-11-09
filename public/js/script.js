const video = document.getElementById('video');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
const currentTime = document.getElementById('current-time');
const divProgress = document.getElementById('divProgress');
const divProgressPreview = document.querySelector('.progress-preview');
const divProgressFull = document.querySelector('.progress-full');
const bottom = document.querySelector('.media-bottom');
const controls = document.querySelector('.controls');
const fullscreenButton = document.getElementById('fullscreen');
const container = document.querySelector('.video-container');
const muteButton = document.getElementById('mute-button');
const volumeSlider = document.getElementById('volume');
const previewVolume = document.querySelector('.progress-volume-loaded');
const loader = document.querySelector('.lds-dual-ring');
const loaderSecond = document.getElementById('loader-second');
const mobilPlayButton = document.getElementById('mobil-play-button');
let progressTimeout;
let playTimeout;



function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
    document.querySelector('.skeleton-active').classList.remove('skeleton-active');
}

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
        mobilPlayButton.style.display = 'none';
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

function toggleProgressBar() {

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
            showControl();
            break
        case "arrowright":
            skip(5);
            break            
    }
});


play.addEventListener('click', playPause);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('click', playPause);
mobilPlayButton.addEventListener('click', playPause);
video.addEventListener('mousemove', showControl);
fullscreenButton.addEventListener('click', fullscrenn);
document.addEventListener('DOMContentLoaded', showLoader);
window.onload = function() {
    video.load(); 
  
    video.addEventListener('loadedmetadata', function() {
        updateProgress();
        hideLoader();
        container.style.display = 'flex'; 
    });
};
document.addEventListener('fullscreenchange', changeScreen);


divProgressFull.addEventListener('mouseup', (event) => {
    const rect = divProgressFull.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    video.play();
    play.classList.remove(...play.classList);
    play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
    mobilPlayButton.style.display = 'none';
    video.currentTime = (percentage * video.duration) / 100;
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(() => { hideControl() }, 5000);
    
});

divProgressFull.addEventListener('touchend', function(event) {
  const touch = event.changedTouches[0];
  const rect = divProgressFull.getBoundingClientRect();
  const offsetX = touch.clientX - rect.left;
  const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
  video.play();
  play.classList.remove(...play.classList);
  play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
  mobilPlayButton.style.display = 'none';
  video.currentTime = (percentage * video.duration) / 100;
  clearTimeout(progressTimeout);
  progressTimeout = setTimeout(() => { hideControl() }, 5000);

  event.preventDefault(); 
});


video.addEventListener('seeking', function() {
    loaderSecond.style.display = 'block'; 
    mobilPlayButton.style.display = 'none'; 
  });
  
  video.addEventListener('seeked', function() {
    loaderSecond.style.display = 'none'; 
  });






let isDragging = false;

divProgressFull.addEventListener('mousedown', function(event) {
  isDragging = true;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


const throttledSetProgress = throttle(setProgress, 500); 

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

function setProgress(percentage) {
    video.pause();
    play.classList.remove(...play.classList);
    play.classList.add('fa-play', 'fa-solid', 'media-button');
    showControl();
    video.currentTime = (percentage * video.duration) / 100;
    
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(() => { hideControl() }, 5000);
}

function onMouseMove(event) {
  if (isDragging) {
    //1. kısım
    const rect = divProgressFull.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    divProgress.style.width = percentage + '%';
    //2.kısım
    throttledSetProgress(percentage);
  }
}

function onMouseUp() {
  isDragging = false;

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}


divProgressFull.addEventListener('touchstart', function(event) {
  isDragging = true;

  const touch = event.touches[0];
  const offsetX = touch.clientX - divProgressFull.getBoundingClientRect().left;

  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);

  function onTouchMove(event) {
    if (isDragging) {
      const touch = event.touches[0];
      const newOffsetX = touch.clientX - divProgressFull.getBoundingClientRect().left;
      const rectWidth = divProgressFull.getBoundingClientRect().width;
      const percentage = Math.max(0, Math.min(100, (newOffsetX / rectWidth) * 100));
      divProgress.style.width = percentage + '%';
      throttledSetProgress(percentage);
    }
  }

  function onTouchEnd() {
    isDragging = false;

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }

  event.preventDefault(); // Sayfa kaydırma hareketini engellemek için
});


