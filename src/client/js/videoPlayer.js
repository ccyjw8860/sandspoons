const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (e) => {
  //만약 비디오가 재생되고 있으면 일시정지
  if (video.paused) {
    playBtn.innerText = "Play";
    video.play();
  } else {
    //아니면 재생
    playBtn.innterText = "Pause";
    video.pause();
  }
};

const handleMute = (e) => {};
console.log("I'm VIDEO PLAYER");
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
// video.addEventListener("pause", handlePause);
// video.addEventListener("play", handlePlay);
