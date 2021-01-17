const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
console.log(videoContainer)
console.log(videoPlayer)
console.log(playBtn)

function handlePlayClick(){
    if(videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function init(){
   playBtn.addEventListener("click", handlePlayClick)
}

// videoContainer가 존재하면 init함수 호출
if(videoContainer) {
    init();
}
