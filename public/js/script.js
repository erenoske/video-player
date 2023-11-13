const global = {
  adjusting: false
}
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
const settings = document.getElementById('settings');
const settingsBox = document.getElementById('settings-box');
let progressTimeout;
let playTimeout;


const dataSizes = document.querySelectorAll('.settings-item');
dataSizes.forEach(item => {
  item.addEventListener('click', () => {
    const videoTime = video.currentTime;
    dataSizes.forEach(item => {
      item.classList.remove('size-active');
    });
    sizeItemClick(item, videoTime); 
  });
});


function sizeItemClick(element, videoTime) {
  const dataSize = element.getAttribute('data-size');
  if(dataSize === '144') {
    video.src = config.path + config.pathNames[5];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
  if(dataSize === '240') {
    video.src = config.path + config.pathNames[4];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
  if(dataSize === '360') {
    video.src = config.path + config.pathNames[3];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
  if(dataSize === '480') {
    video.src = config.path + config.pathNames[2];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
  if(dataSize === '720') {
    video.src = config.path + config.pathNames[1];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
  if(dataSize === '1080') {
    video.src = config.path + config.pathNames[0];
    element.classList.add('size-active');
    video.play();
    video.currentTime = videoTime; 
  }
}

function settingsToggle()  {
  settingsBox.classList.toggle('hidden');
  settings.classList.toggle('rotated');
  if(global.adjusting === true) {
    global.adjusting = false;
  } else {
    global.adjusting = true;
  }
}

function settingsRemove() {
      settingsBox.classList.add('hidden');
      global.adjusting = false;
}

settings.addEventListener('click', settingsToggle);

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
    if(document.querySelector('.skeleton-active')) {
      document.querySelector('.skeleton-active').classList.remove('skeleton-active');
    }
}

function hideControl() {
    divProgress.style.display = 'none';
    divProgressPreview.style.display = 'none';
    controls.style.display = 'none';
    bottom.style.display = 'none';
    if(!(document.fullscreenElement == null)) {
        document.body.style.cursor = 'none';
    } 
    settingsRemove();
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
    if(!(isDragging)) {
      divProgress.style.width = `${(video.currentTime / video.duration) * 100}%`;
    }

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
        document.body.style.cursor = 'auto';
      } else {
        fullscreenButton.classList.remove(...fullscreenButton.classList);
        fullscreenButton.classList.add( 'fa-solid', 'fa-compress', 'media-button');
        document.body.style.cursor = 'auto';
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
   showControl();
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
            showControl();
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


divProgressFull.addEventListener('mouseup', e => {
    const rect = divProgressFull.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    video.play();
    divProgress.style.width = percentage + '%';
    play.classList.remove(...play.classList);
    play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
    mobilPlayButton.style.display = 'none';
    video.currentTime = (percentage * video.duration) / 100;
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(() => { hideControl() }, 5000);
});


divProgressFull.addEventListener('touchend', e => {
  const touch = e.changedTouches[0];
  const rect = divProgressFull.getBoundingClientRect();
  const offsetX = touch.clientX - rect.left;
  const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
  video.play();
  divProgress.style.width = percentage + '%';
  play.classList.remove(...play.classList);
  play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
  mobilPlayButton.style.display = 'none';
  video.currentTime = (percentage * video.duration) / 100;
  clearTimeout(progressTimeout);
  progressTimeout = setTimeout(() => { hideControl() }, 5000);
});


video.addEventListener('seeking', function() {
    loaderSecond.style.display = 'block'; 
    mobilPlayButton.style.display = 'none'; 
  });
  
video.addEventListener('seeked', function() {
  loaderSecond.style.display = 'none'; 
});
video.addEventListener('waiting', function() {
  loaderSecond.style.display = 'block';
});

video.addEventListener('playing', function() {
  loaderSecond.style.display = 'none';
  play.classList.remove(...play.classList);
  play.classList.add('fa-sharp', 'fa-solid', 'fa-pause', 'media-button');
  settingsRemove();
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
    let percentage = (offsetX / rect.width) * 100;
    const videoCurrentTime = (percentage * video.duration) / 100;
    if(percentage > 100)  {
      percentage = 100;
    } 
    if(percentage < 0) {
      percentage = 0;
    }
    divProgress.style.width = percentage + '%';
    
    //Get minites
    let minutes = Math.floor(videoCurrentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }
  
    let seconds = Math.floor(videoCurrentTime % 60);
    if(seconds < 10) {
        seconds = '0' + String(seconds);
    }
  

    let minutesDuration = Math.floor(video.duration / 60);
    if (minutesDuration < 10) {
        minutesDuration = '0' + String(minutes);
    }
  
    let secondsDuration = Math.floor(video.duration % 60);
    if(secondsDuration < 10) {
        secondsDuration = '0' + String(seconds);
    }
  
    
  
    currentTime.innerHTML = `<p>${minutes}:${seconds} / ${minutesDuration}:${secondsDuration}</p>`;
    
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
});

function controlCheck () {
   if(video.paused) {
    showControl();
   }
   if(global.adjusting === true) {
    showControl();
   }
}

setInterval(controlCheck, 3000);
