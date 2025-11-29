import os
import subprocess

# Ввод пути к видео
video_path = input("Введите путь к видео: ").strip()
video_path = os.path.expanduser(video_path)  # разворачиваем ~

# Проверка существования файла
if not os.path.isfile(video_path):
    print("Файл не найден!")
    exit()

# Формируем имя для MP3
base_name = os.path.splitext(os.path.basename(video_path))[0]
audio_path = os.path.join(os.path.dirname(video_path), f"{base_name}.mp3")

# Конвертация через ffmpeg
subprocess.run([
    "ffmpeg",
    "-i", video_path,
    "-vn",
    "-ab", "192k",
    "-ar", "44100",
    "-y",
    audio_path
])

print(f"Аудио сохранено как {audio_path}")

