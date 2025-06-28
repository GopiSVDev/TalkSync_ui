import { Download, FileText } from "lucide-react";

const FileMessage = ({ src }: { src: string }) => {
  return (
    <div className="flex items-center max-w-xs p-3 rounded-xl bg-blue-50 dark:bg-[#2A2A2A] text-sm text-black dark:text-white gap-3">
      <div className="p-2 rounded-full bg-blue-100 dark:bg-[#3A3A3A] text-blue-600 dark:text-white">
        <FileText className="w-5 h-5" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="truncate font-medium">Attachment</div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 underline dark:text-blue-400 break-all"
        >
          {src.split("/").pop()}
        </a>
      </div>

      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-blue-200 dark:hover:bg-[#444] transition"
      >
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
};

export default FileMessage;
