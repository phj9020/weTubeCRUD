const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
const volumnBtn = document.querySelector("#jsVolumeButton");


function handlePlayClick(){
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`
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
    } else {
        videoPlayer.muted = true;
        volumnBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }
}

function init(){
    playBtn.addEventListener("click", handlePlayClick)
    volumnBtn.addEventListener("click", handleVolumeClick)
}

// videoContainer가 존재하면 init함수 호출
if(videoContainer) {
    init();
}
