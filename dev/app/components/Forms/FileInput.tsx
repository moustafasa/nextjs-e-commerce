import { useState } from "react";

export default function FileInput() {
  const [file, setFile] = useState<File>();
  return (
    <div
      className=" text-center"
      onDrop={(e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files?.[0]);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      {file && <div className="mt-4">{file.name}</div>}
    </div>
  );
}
