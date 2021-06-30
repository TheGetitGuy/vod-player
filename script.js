const url = new URL(window.location.href);
const mp4 = url.searchParams.get("mp4");
const json = url.searchParams.get("json");

const vodElement = document.getElementById("vod");
const chatElement = document.getElementById("chat");

const cap = 100;

let comments = [];

const renderChat = () => {
    chatElement.innerHTML = "";
    const renderableComments = [];
    for (const comment of comments) {
        if (comment.content_offset_seconds > vodElement.currentTime) {
            break;
        }
        renderableComments.push(comment);
    }
    renderableComments.splice(0, renderableComments.length - 100);
    for (const comment of renderableComments) {
        const commentElement = document.createElement("div");

        const displayNameElement = document.createElement("span");
        displayNameElement.innerText = comment.commenter.display_name;
        displayNameElement.classList.add("display-name");

        const bodyElement = document.createElement("span");
        bodyElement.innerText = comment.message.body;
        bodyElement.classList.add("body");

        commentElement.appendChild(displayNameElement);
        commentElement.appendChild(bodyElement);
        chatElement.appendChild(commentElement);
    }
    chatElement.scrollTop = chatElement.scrollHeight;
};

vodElement.ontimeupdate = () => {
    renderChat();
};

vodElement.src = mp4;

chat.addEventListener("scroll", () => {
    chatElement.scrollTop = chatElement.scrollHeight;
});

fetch(json).then((res) => {
    res.json().then((data) => {
        comments = data.comments;
        renderChat();
    });
});