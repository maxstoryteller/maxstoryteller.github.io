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
    document.getElementById("intro").style.display = "none";
    document.getElementById("main").style.display = "block";
    
    document.getElementById("cover").src = "images/cover1.jpg";
    document.getElementById("track-info").textContent = "Funk Cut – Unknown Artist";
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