"use client";

import React from "react";
import { SingleImageDropzone } from "@/provider/SingleImageDropzone ";

interface FileUploadProps {
  onChange: (file?: File | undefined) => void | Promise<void>;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  return (
    <>
      <SingleImageDropzone
        className="w-full h-60 outline-none"
        onChange={onChange}
      />
    </>
  );
};

export default FileUpload;
