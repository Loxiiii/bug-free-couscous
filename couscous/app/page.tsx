"use client"

import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('excelFile', file as File);

      const response = await axios.post('/api/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag and drop an Excel file here, or click to select one.</p>
      </div>
      {file && (
        <div className="mt-4">
          <p>Selected File: {file.name}</p>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;