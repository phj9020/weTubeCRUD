const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
const volumnBtn = document.querySelector("#jsVolumeButton");
const expandBtn = document.querySelector("#jsExpandButton");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const volumeRange = document.querySelector("#jsVolume");

function handlePlayClick(){
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`
    }
}

function handleVolumeClick(){
    // 초기 player mute 는 false 
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumnBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        volumeRange.value = videoPlayer.volume;
    } else {
        videoPlayer.muted = true;
        volumnBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        volumeRange.value = 0;
    }
}

function exitFullScreen(){
    expandBtn.innerHTML = `<i class="fas fa-expand"></i>`;
    expandBtn.addEventListener("click", goFullScreen);
    document.exitFullscreen()
        .catch(error => Promise.resolve(error));
    expandBtn.removeEventListener("click",exitFullScreen);
}

function goFullScreen(){
    videoContainer.requestFullscreen();
    expandBtn.innerHTML = `<i class="fas fa-compress"></i>`;
    expandBtn.removeEventListener("click", goFullScreen);
    expandBtn.addEventListener("click",exitFullScreen);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
    
    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }

    return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime(){
    const currentTimeVideo = Math.floor(videoPlayer.currentTime);
    currentTime.innerHTML = formatDate(currentTimeVideo);
}

function setTotalTime(){
    // get duration of video and formatDate 30.9 -> 31
    const totalTimeString = formatDate(Math.floor(videoPlayer.duration));
    // console.log(totalTimeString)
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 900);
    // videoPlayer.addEventListener("timeupdate", getCurrentTime)
}

function handleEnded(){
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}


function handleDrag(event){
    // console.log(event.target.value)
    const { 
        target : { value }
    } = event;

    videoPlayer.volume = value;
    
    if(value >= "0.6") {
        volumnBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        videoPlayer.muted = false;
    } else if (value >= "0.3") {
        volumnBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
        videoPlayer.muted = false;
    } else if (value === "0") {
        volumnBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        videoPlayer.muted = true;
    } else {
        volumnBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
        videoPlayer.muted = false;
    }
}

function showVolume(){
    volumeRange.style.display= "block";
    volumeRange.style.opacity= 1;
}

function hideVolume(){
    volumeRange.style.display= "none";
    volumeRange.style.opacity= 0;

}

function init(){
    videoPlayer.volume = 0.5; // mobile
    playBtn.addEventListener("click", handlePlayClick);
    volumnBtn.addEventListener("click", handleVolumeClick);
    expandBtn.addEventListener("click", goFullScreen);
    // once video loaded metadata call setTotalTime function 
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended", handleEnded);
    volumeRange.addEventListener("input", handleDrag);
    volumnBtn.addEventListener("mouseenter", showVolume);
    volumeRange.addEventListener("mouseleave", hideVolume);
 
}

// videoContainer가 존재하면 init함수 호출
if(videoContainer) {
    init();
}
