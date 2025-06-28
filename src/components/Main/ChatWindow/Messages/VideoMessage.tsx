import ReactPlayer from "react-player";
import { Download, PlayCircle } from "lucide-react";
import { useState } from "react";

const VideoMessage = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-[300px] rounded-xl overflow-hidden bg-black">
      {isPlaying ? (
        <ReactPlayer
          src={src}
          controls
          playing
          width="100%"
          height="100%"
          style={{
            aspectRatio: "16 / 9",
          }}
        />
      ) : (
        <div
          className="relative w-[250px] aspect-video bg-black dark:bg-gray-900 cursor-pointer flex justify-center items-center"
          onClick={() => setIsPlaying(true)}
        >
          <PlayCircle className="w-14 h-14 text-white" />
        </div>
      )}

      <a
        href={src}
        download
        className="absolute top-2 right-2 bg-white dark:bg-[#1f1f1f] p-1 rounded-full shadow hover:opacity-80 transition"
        title="Download"
        onClick={(e) => e.stopPropagation()}
      >
        <Download className="w-4 h-4 text-black dark:text-white" />
      </a>
    </div>
  );
};

export default VideoMessage;
