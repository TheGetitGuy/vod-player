const r = () => {
    // Grabbing variables from the Url object
    const url = new URL(window.location.href);
    const mp4 = url.searchParams.get("mp4");
    const json = url.searchParams.get("json");
    const timeMins = url.searchParams.get("mins");
    const timeSecs = url.searchParams.get("secs");
    
    if (!mp4 || !json) {
        return;
    }

    const vodElement = document.getElementById("vod");
    const chatElement = document.getElementById("chat");

    vodElement.currentTime = (Math.floor(timeMins*60) + Math.floor(timeSecs));

    const changeUrlForTimeStamp = () =>{
        //building the parameters for the timestamp
        //then setting state so you can send the url after seekedorupdated
        let params = url.searchParams;
        let currentMins = Math.floor(vodElement.currentTime/60);
        let currentSecs = Math.round(vodElement.currentTime%60);
        params.set('mins', currentMins)
        params.set('secs', currentSecs)

        history.replaceState(null,"", (url.origin+'?'+params.toString()))
    };

    const cap = 100; //The maximum comments

    let comments = [];

    const scroll = () => {
        chatElement.scrollTop = chatElement.scrollHeight;
    };

    const renderChat = () => {
        chatElement.innerHTML = "";
        const renderableComments = [];
        for (const comment of comments) {
            if (comment.content_offset_seconds > vodElement.currentTime) {
                break;
            }
            renderableComments.push(comment);
        }
        renderableComments.splice(0, renderableComments.length - cap);
        for (const comment of renderableComments) {
            const commentElement = document.createElement("p");
            
            const timeElement = document.createElement("span");
            const hours = Math.floor(comment.content_offset_seconds / 60 / 60);
            const minutes = Math.floor(comment.content_offset_seconds / 60);
            const seconds = Math.floor(comment.content_offset_seconds);
            timeElement.innerText = `${hours}:${`${(minutes - hours * 60)}`.padStart(2, 0)}:${`${(seconds - minutes * 60)}`.padStart(2, 0)}`;
            timeElement.classList.add("time");

            const displayNameElement = document.createElement("span");
            displayNameElement.innerText = comment.commenter.display_name;
            displayNameElement.style.color = comment.message.user_color;
            displayNameElement.classList.add("display-name");

            const dividerElement = document.createElement("span");
            dividerElement.innerText = ":";
            dividerElement.classList.add("divider");
            const fragmentsToAppend = []
            for (fragment of comment.message.fragments){
                const fragmentElement = document.createElement("span");
                if (!('emoticon' in fragment)){
                    fragmentElement.innerText = fragment.text;
                    fragmentElement.classList.add("fragment");
                    fragmentsToAppend.push(fragmentElement)
            } else { 
                    //build and append the Emotes
                    const emoteElement = document.createElement("img")
                    emoteElement.src = (`https://static-cdn.jtvnw.net/emoticons/v1/${fragment.emoticon.emoticon_id}/1.0`)
                    emoteElement.alt = fragment.text
                    emoteElement.classList.add("emoticon") 
                    fragmentElement.classList.add("fragment");
                    fragmentElement.appendChild(emoteElement)
                    fragmentsToAppend.push(fragmentElement);
                }
            }
            commentElement.appendChild(timeElement);
            commentElement.appendChild(displayNameElement);
            commentElement.appendChild(dividerElement);
            commentElement.appendChild(...fragmentsToAppend);
            chatElement.appendChild(commentElement);
        }
        scroll();
    };

    vodElement.ontimeupdate = () => {
        renderChat();
        changeUrlForTimeStamp(); // Update constantly
    };
    vodElement.onseeked = () => {
        changeUrlForTimeStamp();  // Update only when seeked, up to evan
    }

    vodElement.src = mp4;

    chat.addEventListener("scroll", () => {
        scroll();
    });

    addEventListener("resize", () => {
        scroll();
    });

    fetch(json).then((res) => {
        res.json().then((data) => {
            comments = data.comments;
            renderChat();
        });
    });

    const home = document.getElementById("home");
    home.style = "display: none;"
};

r();