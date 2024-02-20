let play = document.getElementById("Play");
let previous = document.getElementById("Previous");
let next = document.getElementById("Next");
let audio = document.querySelector("audio");
let mainAudio = document.querySelector("#main-audio")
let img = document.querySelector("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let wrapper = document.querySelector(".main_div")
let progressBar = document.querySelector(".progress-bar");
let progressArea = document.querySelector(".progress-area");


let songIndex = 2;
let musicIndex = 2;


let allMusic = [
    {
        name: "Alone",
        artist: "Alan Walker",
        img:"music-1",
        src:"music-1"
    },
    {
        name: "sugar & Brownies ",
        artist: "Dharia",
        img:"music-2",
        src:"music-2"
    },    
    {
        name: "Peaches",
        artist: "Justin Bieber",
        img:"music-3",
        src:"music-3"
    },
    {
        name: "Girls Like You",
        artist: "Paul Sheehan",
        img:"music-4",
        src:"music-4"
    },
    {
        name: "On my way",
        artist: "Alan Walker",
        img:"music-5",
        src:"music-5"
    },
    {
        name: "Hymn for weekend",
        artist: "Guy Berryman",
        img:"music-6",
        src:"music-6"
    },
    {
        name: "Dusk till Dawn",
        artist: "Robert Kurtzman",
        img:"music-7",
        src:"music-7"
    }
];


// for playing the music
let isplaying = false;

let playmusic = () => {
    isplaying = true;
    audio.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
};

let pausemusic = () => {
    isplaying = false;
    audio.pause();
    play.classList.replace('fa-pause', 'fa-play');
};

play.addEventListener("click", () => {
    if (isplaying == false) {
        playmusic();
    } else {
        pausemusic();
    };
});

// function to load the song
const loadsong = (allMusic) => {
    title.textContent = allMusic.name;
    artist.textContent = allMusic.artist;
    audio.src = "Music/" + allMusic.src + ".mp3";
    img.src = "images/" + allMusic.img + ".jpg";
    audio.play();
}

//to switch to next song
songIndex = 0;
const nextsong = () => {
    songIndex = (songIndex + 1) % allMusic.length;
    loadsong(allMusic[songIndex]);
    playmusic();
}

const prevsong = () => {
    songIndex = (songIndex - 1 + allMusic.length) % allMusic.length;
    loadsong(allMusic[songIndex]);
    playmusic();
}


next.addEventListener('click', nextsong);
previous.addEventListener('click', prevsong);

//volume control
let volume_slider = document.querySelector('.volume_slider');

function setVolume(){
    audio.volume = volume_slider.value / 100;
}

// update progesss bar width according to time

mainAudio.addEventListener("timeupdate", (e) =>{
    const currentTime = e.target.currentTime; // current time of song
    const duration = e.target.duration; //total duration of song
    let progresswidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progresswidth}%`;

    
    let songCurrentTime = wrapper.querySelector(".current"),
    songDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", () => {

        let audioDuration = mainAudio.duration;

        //update song total duration
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10){ //adding 0 if sec is lecc than 10
            totalSec = `0${totalSec}`;
        }

        songDuration.innerText = `${totalMin}: ${totalSec}`;

 
    });
           
        //update playing song current time
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);

        if(currentSec < 10){ //adding 0 if sec is lecc than 10
            currentSec = `0${currentSec}`;
        }

        songCurrentTime.innerText = `${currentMin}: ${currentSec}`;

});

// update song time acc to progress bar width

progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
    playmusic();

})



// playlist container code

const ulTag = wrapper.querySelector("ul");

for (let index = 0; index < allMusic.length; index++){
    const element = allMusic[index];
    //pass the song name

    let liTag = `<li id="song${index}" li-index="${index}" data-src="${allMusic[index].src}.mp3" >
                    <div class="row">
                        <span id="playlist-song-name">${allMusic[index].name}</span>
                        <p id="playlist-song-artist">${allMusic[index].artist}</p>
                    </div>
                    <audio id="${allMusic[index].src}" src="Music/${allMusic[index].src}.mp3"></audio>
                </li>`

    ulTag.insertAdjacentHTML("beforeend", liTag);


    // //update audio duration for each song
    let liAudioDuration = ulTag.querySelector(`#${allMusic[index].src}`);
    let liAudioTag = ulTag.querySelector(`#${allMusic[index].src}`);
    
    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    })

} //for loop end


document.addEventListener('DOMContentLoaded', function () {
    const playlist = document.getElementById('playlist');
    const audio = document.getElementById('main-audio');
  
    if (!playlist || !audio) {
      console.error("Playlist or audio element not found.");
      return;
    }
  
    playlist.addEventListener('click', function (event) {
      const target = event.target;
      if (target.tagName === 'LI') {
        let audioElementId = target.getAttribute('li-index');
        console.log(audioElementId);
  
        if (!audioElementId) {
          console.error("li-index attribute not found on clicked LI element.");
          console.log(target); // Log the entire clicked element for inspection
          return;
        }

        const audioElement = document.querySelector(`#song${audioElementId}`);
        console.log(audioElement)
        if (!audioElement) {
          console.error(`Audio element with ID '${audioElement}' not found.`);
          return;
        }

        const liAudio = audioElement.querySelector('audio');
        const audioSource = liAudio.getAttribute('src');
  
        if (!audioSource) {
          console.error(`Audio source not found for element with ID '${audioElementId}'.`);
          return;
        }
  
        // Set the audio source and play
        audio.src = audioSource;
        loadsong(allMusic[audioElementId]);

      }
    });
  });
  
//   document.addEventListener('DOMContentLoaded', function () {
//     const playlist = document.getElementById('playlist');
//     const audio = document.getElementById('main-audio');

//     playlist.addEventListener('click', function (event) {
//       const target = event.target;
//       if (target.tagName === 'li') {
//         const audioSource = target.getAttribute('data-src');
//         const audioElement = document.getElementById(audioSource);
        
//         // Set the audio source and play
//         audio.src = audioElement.getAttribute('src');
//         audio.load();
//         audio.play();
//       }
//     });
//   });


// const allLiTags = ulTag.querySelectorAll('li');
// function playingNow(){
//     for (let j = 0; j < allLiTags.length; j++){

//         if(allLiTags[j].getAttribute("li-index") == 0) {
//             allLiTags[j].classList.add("playing");
//         }
//         allLiTags[j].setAttribute("onclick", "clicked(this)");
//     } 
// }




// playingNow();
//play song on click

// function clicked(element){
//     let getLiIndex = element.getAttribute("li-index");
//     musicIndex = getLiIndex;
//     // loadsong(allMusic[songIndex]);
//     playmusic();
// }

