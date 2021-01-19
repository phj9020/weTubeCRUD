const recordContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsStartRecordBtn");
const videoPreview = document.querySelector("#jsVideoPreview");


const startRecording = async() => {
    //get media from user, put it inside of video 
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        console.log(stream);
    } catch (error) {
        // record를 못하게 한다면 
        recordBtn.innerHTML = `Can't record`;
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init(){
    recordBtn.addEventListener("click", startRecording)

}
if(recordContainer) {
    init();
}