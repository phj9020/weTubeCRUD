const recordContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsStartRecordBtn");
const videoPreview = document.querySelector("#jsVideoPreview");

let videoRecorder;

const handleVideoData = (event)=> {
    // console.log(event);
    const { 
        // videoFile = event.data
        data : videoFile
    } = event;
    // download file 
    // create URL 
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    // download Link  name of file = "recorded.webm"
    link.download = "recorded.webm";
    document.body.appendChild(link);
    // faking click
    link.click();
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start Recording";
}

const startRecording = (stream) => {
    //mediaRecorder()
    videoRecorder = new MediaRecorder(stream);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
}


const getVideo = async() => {
    //get media from user, put it inside of video 
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {width: 1280, height: 720}
            // video: true
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop Recording";
        startRecording(stream);
    } catch (error) {
        // record를 못하게 한다면 
        console.log(error);
        recordBtn.innerHTML = `Can't record`;
        
    } finally {
        recordBtn.removeEventListener("click", getVideo);

    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);

}
if(recordContainer) {
    init();
}