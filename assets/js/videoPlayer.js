const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
const volumnBtn = document.querySelector("#jsVolumeButton");
const expandBtn = document.querySelector("#jsExpandButton");

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

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumnBtn.addEventListener("click", handleVolumeClick);
    expandBtn.addEventListener("click", goFullScreen);
}

// videoContainer가 존재하면 init함수 호출
if(videoContainer) {
    init();
}
