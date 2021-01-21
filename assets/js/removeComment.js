import axios from "axios";

const commentList = document.querySelector("#jsCommentList");
const commentDelBtnAll = document.querySelectorAll(".jsDeleteBtn");
const commentNumber = document.querySelector("#jsCommentNumber");

let commentSpan; 

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const deleteComment = ()=> {
    const selectedLi = commentSpan.parentElement;
    selectedLi.remove();
    decreaseNumber();
}


const handleDelete = async(comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url : `/api/${videoId}/comment/del`,
        method : "POST",
        data: {
            selectedOne : comment
        }
    });
    // console.log(response);
    if(response.status === 200){
        deleteComment();
    }
}


function handleClick() { 
    console.log(this)
    commentSpan = this.previousElementSibling;
    const comment = commentSpan.innerText;
    console.log(comment);
    handleDelete(comment);
}


function init(){
    for(const item of commentDelBtnAll) {
        item.addEventListener("click", handleClick);
    }
}

if(commentList) {
    init();
}

export default handleClick;