import { useState } from "react";
import { X } from "lucide-react";

const ImageMessage = ({ mediaUrl }: { mediaUrl: string }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div>
      <img
        src={mediaUrl}
        alt="sent image"
        className="w-full cursor-pointer h-auto rounded-lg"
        onClick={() => setPreviewUrl(mediaUrl)}
      />

      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
            <img
              src={previewUrl}
              alt="preview"
              className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-lg"
            />

            {/* Close Button */}
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageMessage;
