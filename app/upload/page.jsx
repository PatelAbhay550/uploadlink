'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [remainingUploads, setRemainingUploads] = useState(0);
  const [fileName, setFileName] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const maxFiles = 7;

  useEffect(() => {
    const fetchUploadCount = async () => {
      if (!user) return;

      const q = query(collection(db, 'pdfs'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      setRemainingUploads(maxFiles - querySnapshot.docs.length);
    };

    fetchUploadCount();
  }, [user]);

  const onDrop = async (acceptedFiles) => {
    if (!user) {
      alert('Please log in to upload files.');
      return;
    }

    if (remainingUploads <= 0) {
      alert('You have reached the maximum upload limit.');
      return;
    }

    const file = acceptedFiles[0];
    if (!file || file.size > 50 * 1024 * 1024) {
      alert('Please upload a valid file under 50MB.');
      return;
    }

    // Use the custom file name if provided, otherwise use the original name
    const uploadFileName = fileName.trim() || file.name;
    setUploading(true);
    setCurrentFile(file);

    try {
      const storageRef = ref(storage, `files/${user.uid}/${Date.now()}-${uploadFileName}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'pdfs'), {
        userId: user.uid,
        fileName: uploadFileName,
        fileUrl: downloadURL,
        createdAt: new Date().toISOString(),
      });

      // No alert on success, just show file upload success state
      setUploading(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during upload:', error);
      alert(`Upload failed: ${error.message}`);
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Dashboard Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors mb-6"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 5l-7 7 7 7"></path>
          </svg>
          <span>Back to Dashboard</span>
        </button>
        {/* Upload Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Remaining Uploads: {remainingUploads} / {maxFiles}
          </h2>
          {/* File Name Input */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">Set File Name (Optional)</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700/50 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter custom file name (or leave blank to use original)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-indigo-500/50'
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? <p>Uploading...</p> : <p>Drag & drop your file here, or click to select</p>}
          </div>
          {/* File Upload Status */}
          {uploading && (
            <div className="mt-4 text-gray-400">
              <p>Uploading {currentFile?.name}...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
