// Информация о треке
const track = {
    audio: "music/track.mp3",
    cover: "images/covers/cover.jpeg"
};

// Список видеофайлов
const videoSources = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4"
];

let audioPlayer = null;

// Функция инициализации аудио
function initAudio() {
    audioPlayer = document.getElementById("player");
    if (!audioPlayer) {
        console.error("Audio player element not found!");
        return;
    }
    audioPlayer.src = track.audio;
    audioPlayer.loop = true;
    audioPlayer.play().catch(error => {
        console.log("Autoplay prevented:", error);
        document.addEventListener('click', playAudioOnClick, { once: true });
    });
}

function playAudioOnClick() {
    if (audioPlayer && audioPlayer.paused) {
        audioPlayer.play().catch(e => console.log("Audio play error after click:", e));
    }
}

// Функция запуска сайта и выбора случайного видео
function startSite() {
    const introSection = document.getElementById("intro");
    const mainSection = document.getElementById("main");
    const videoElement = document.getElementById("main-video");
    const coverImage = document.getElementById("cover");

    if (!introSection || !mainSection || !videoElement || !coverImage) {
        console.error("Required elements not found!");
        return;
    }

    introSection.style.display = "none";
    mainSection.style.display = "block";

    const randomIndex = Math.floor(Math.random() * videoSources.length);
    const randomVideoSrc = videoSources[randomIndex];

    while (videoElement.firstChild) {
        videoElement.removeChild(videoElement.firstChild);
    }
    const sourceElement = document.createElement('source');
    sourceElement.src = randomVideoSrc;
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);

    videoElement.load();
    videoElement.play().catch(error => {
        console.log("Video autoplay prevented:", error);
        document.addEventListener('click', playVideoOnClick, { once: true });
    });

    coverImage.src = track.cover;
}

function playVideoOnClick() {
    const videoElement = document.getElementById("main-video");
    if (videoElement && videoElement.paused) {
        videoElement.play().catch(e => console.log("Video play error after click:", e));
    }
}

function toggleAudio() {
    if (audioPlayer) {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(e => console.log("Audio play error:", e));
        } else {
            audioPlayer.pause();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initAudio();

    const spinningDisc = document.getElementById('spinning-disc');
    if (spinningDisc) {
        spinningDisc.addEventListener('click', startSite);
    }
});