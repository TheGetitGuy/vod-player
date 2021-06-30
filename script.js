const url = new URL(window.location.href);
const mp4 = url.searchParams.get("mp4");
const json = url.searchParams.get("json");
const video = document.getElementById("vod");

video.src = mp4;