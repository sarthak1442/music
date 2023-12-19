const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/audio1.mp3",
    title: "Affuuu",
    artist: "pooja",
    imgSrc: "./assests/audio1.jpg",
  },
  {
    songSrc: "./music/audio2.mp3",
    title: "Affuuu",
    artist: "lata mangeshkar",
    imgSrc: "./assests/audio2.jpg",
  },
  {
    songSrc: "./music/audio3.mp3",
    title: "Affuuu",
    artist: "raghav mathur",
    imgSrc: "./assests/audio3.jpg",
  },
  {
    songSrc: "./music/audio4.mp3",
    title: "Affuuu",
    artist: "rahat fateh ali khan",
    imgSrc: "./assests/audio4.jpg",
  },
  {
    songSrc: "./music/audio5.mp3",
    title: "Affuuu",
    artist: "shreya ghoshal",
    imgSrc: "./assests/audio5.jpg",
  },
  {
    songSrc: "./music/audio6.mp3",
    title: "Affuuu",
    artist: "lata mangeshkar",
    imgSrc: "./assests/audio6.jpg",
  },
  {
    songSrc: "./music/audio7.mp3",
    title: "Dream Girl Affuuu",
    artist: "udit narayan",
    imgSrc: "./assests/audio7.jpg",
  },
  {
    songSrc: "./music/audio8.mp3",
    title: "DJ",
    artist: "vishal shekhar",
    imgSrc: "./assests/audio8.jpg",
  },
  {
    songSrc: "./music/audio9.mp3",
    title: "Affuuu",
    artist: "udbhav",
    imgSrc: "./assests/audio6.jpg",
  },
  {
    songSrc: "./music/audio10.mp3",
    title: "Affuuu",
    artist: "mix",
    imgSrc: "./assests/audio10.jpg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});