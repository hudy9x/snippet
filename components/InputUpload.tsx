import { ChangeEvent, useRef, useState } from "react";
import { FileData, upload } from "../services/file";

interface IUploadFileProps {
  path: string;
  onUploaded?: (files: FileData[]) => void;
}

export default function InputUpload({
  path,
  onUploaded = () => {},
}: IUploadFileProps) {
  const [files, setFiles] = useState<FileData[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.files);
    const files = ev.target.files;

    if (!files) return;

    const all = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      all.push(upload(path, file));
    }

    Promise.all(all).then((responses) => {
      ev.target.value = "";
      onUploaded(responses);
      setFiles((files) => [...files, ...responses]);
    });
  };

  return (
    <div className="mt-1">
      {files.length ? (
        <div className="file-container flex flex-col gap-3 py-3">
          {files.map((file, index) => {
            return (
              <div key={file.fullPath}>
                <div className="text-sm bg-gray-50 py-1 px-2 border border-dashed rounded-md flex gap-2">
                  <span className="rounded-full bg-gray-200 w-5 h-5 text-xs flex items-center justify-center text-gray-600">
                    {index}
                  </span>
                  <span>{file.fullPath}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onClick}
        className="inline-flex w-full items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload your image
      </button>
      <input
        multiple
        onChange={onChange}
        ref={ref}
        className="hidden"
        type="file"
        name=""
        id=""
      />
    </div>
  );
}
