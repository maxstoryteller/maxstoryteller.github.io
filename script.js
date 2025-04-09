// Информация о треке
const track = {
    audio: "music/track.mp3",
    cover: "images/covers/cover.jpeg"
};

// Список видеофайлов
const videoSources = [
    "video1.mp4", // Замените на ваши имена файлов
    "video2.mp4",
    "video3.mp4"
];

let audioPlayer = null;

// Функция инициализации аудио
function initAudio() {
    audioPlayer = document.getElementById("player");
    if (!audioPlayer) {
        console.error("Audio player element with id 'player' not found!");
        return;
    }
    // Устанавливаем источник, если он еще не установлен (из HTML)
    if (!audioPlayer.currentSrc) {
       audioPlayer.src = track.audio;
    }
    audioPlayer.loop = true; // Убеждаемся, что loop установлен

    // Пытаемся запустить аудио
    audioPlayer.play().catch(error => {
        console.log("Audio autoplay was prevented:", error);
        // Добавляем слушатель для попытки запуска по первому клику пользователя
        document.body.addEventListener('click', playAudioOnClick, { once: true });
        document.body.addEventListener('touchstart', playAudioOnClick, { once: true }); // Для мобильных
    });
}

// Функция для запуска аудио по клику (если autoplay не сработал)
function playAudioOnClick() {
    if (audioPlayer && audioPlayer.paused) {
        audioPlayer.play().catch(e => console.log("Audio play error after user interaction:", e));
    }
    // Удаляем слушатели, чтобы не срабатывали повторно
    document.body.removeEventListener('click', playAudioOnClick);
    document.body.removeEventListener('touchstart', playAudioOnClick);
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

    // Скрыть интро и показать главную страницу
    introSection.style.display = "none";
    mainSection.style.display = "block";

    // Выбрать случайное видео
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    const randomVideoSrc = videoSources[randomIndex];

    // Установить источник видео и запустить воспроизведение
    // Сначала удаляем существующие источники, если они есть
    while (videoElement.firstChild) {
        videoElement.removeChild(videoElement.firstChild);
    }
    // Добавляем новый источник
    const sourceElement = document.createElement('source');
    sourceElement.src = randomVideoSrc;
    sourceElement.type = 'video/mp4'; // Убедитесь, что тип правильный
    videoElement.appendChild(sourceElement);

    // Перезагружаем видео, чтобы новый источник применился
    videoElement.load();
    // Пытаемся запустить видео (autoplay должен сработать, но можно добавить .play() для надежности)
    videoElement.play().catch(error => {
        console.log("Video autoplay prevented:", error);
        // Можно добавить обработчик клика для запуска видео, если autoplay не сработал
        document.body.addEventListener('click', playVideoOnClick, { once: true });
        document.body.addEventListener('touchstart', playVideoOnClick, { once: true });
    });

    // Показываем обложку
    coverImage.src = track.cover;
}

// Функция для запуска видео по клику (если autoplay не сработал)
function playVideoOnClick() {
    const videoElement = document.getElementById("main-video");
    if (videoElement && videoElement.paused) {
        videoElement.play().catch(e => console.log("Video play error after user interaction:", e));
    }
    // Удаляем слушатели
    document.body.removeEventListener('click', playVideoOnClick);
    document.body.removeEventListener('touchstart', playVideoOnClick);
}

// Запускаем инициализацию аудио при загрузке DOM
document.addEventListener('DOMContentLoaded', initAudio);

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
  