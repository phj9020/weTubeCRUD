import axios from "axios";

const addCommentForm = document.querySelector("#jsAddComment");
const commentList = document.querySelector("#jsCommentList");
const commentNumber = document.querySelector("#jsCommentNumber");


const increaseNumber = () => {
    // 기존에 있던 숫자들을 int로 바꿔주고 1을 증가시킨다
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1
}


// fake comment
const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);  // 최신댓글이 앞에 오도록 맨 앞에 붙여준다
    increaseNumber();
}

// 로그인 시 댓글 api가 정상적으로 뜬다
const sendComment = async(comment)=> {
    // get video id
    const videoId = window.location.href.split("/videos/")[1];
    const response= await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            // data.comment가 postAddComment()의 body comment 로 들어간다 
            comment
        }
    });
    console.log(response)
    if(response.status === 200) {
        addComment(comment);
    }
}



const handleSubmit = (event)=> {
    event.preventDefault(); //새로고침 방지
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm) {
    init();
};