import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AudioMessage = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = parseFloat(e.target.value);
  };

  const formatTime = (time: number) =>
    isNaN(time)
      ? "0:00"
      : `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;

  return (
    <div className="flex items-center gap-3 bg-blue-50 dark:bg-[#2A2A2A] px-4 py-3 rounded-xl max-w-xs w-full">
      <button
        onClick={togglePlay}
        className="text-blue-600 dark:text-white cursor-pointer p-1 hover:scale-110 transition-transform"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>

      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleSeek}
        className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />

      <span className="text-xs text-muted-foreground w-10 text-right">
        {formatTime(duration - progress)}
      </span>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export default AudioMessage;
