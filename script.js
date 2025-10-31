const sounds = {};


document.querySelectorAll("button").forEach(btn => {
  const soundFile = btn.dataset.sound;
  const audio = new Audio(soundFile);
  sounds[soundFile] = { audio, playing: false };

  btn.addEventListener("click", () => {
    const soundObj = sounds[soundFile];

    if (!soundObj.playing) {
      // 再生開始
      soundObj.audio.currentTime = 0;
      soundObj.audio.play();
      soundObj.playing = true;
      btn.style.backgroundColor = "#99ff99"; // 再生中は色を変える
    } else {
      // 再生停止
      soundObj.audio.pause();
      soundObj.audio.currentTime = 0;
      soundObj.playing = false;
      btn.style.backgroundColor = "#ffcc66"; // 元の色に戻す
    }

    // 音が自然に終わった時に状態を戻す
    soundObj.audio.onended = () => {
      soundObj.playing = false;
      btn.style.backgroundColor = "#ffcc66";
    };
  });
});