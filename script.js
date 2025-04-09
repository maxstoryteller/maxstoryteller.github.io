// Информация о треке
const track = {
    audio: "music/track.mp3",
    cover: "images/covers/cover.jpeg"
};

let audioPlayer = null;

// Функция инициализации аудио
function initAudio() {
    audioPlayer = document.getElementById("player");
    audioPlayer.src = track.audio;
    audioPlayer.loop = true;
    audioPlayer.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });
}

// Функция запуска сайта
function startSite() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("main").style.display = "block";
    
    // Показываем обложку
    document.getElementById("cover").src = track.cover;
}

// Запускаем аудио при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAudio();
    // Устанавливаем обложку сразу при загрузке
    document.getElementById("cover").src = track.cover;
});

// Добавляем обработчики для клавиш (опционально)
document.addEventListener('keydown', (e) => {
    if (document.getElementById("main").style.display === "block") {
        if (e.code === "ArrowRight") {
            playNextTrack();
        } else if (e.code === "ArrowLeft") {
            playPreviousTrack();
        }
    }
});
  