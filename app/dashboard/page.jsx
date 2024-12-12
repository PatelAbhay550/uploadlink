'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import {
  UserCircleIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ArrowRightOnRectangleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();
  const maxFiles = 7;

  useEffect(() => {
    const fetchPDFs = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'pdfs'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const pdfData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt),
        }));

        setPdfs(pdfData);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPDFs();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  function truncateFileName(fileName, maxLength = 20) {
    if (fileName.length <= maxLength) return fileName;
  
    const [name, extension] = fileName.split(/(?=\.[^.]+$)/); // Split name and extension
    const visibleChars = Math.floor((maxLength - extension.length - 3) / 2);
  
    const start = name.slice(0, visibleChars); // First few characters
    const end = name.slice(-visibleChars); // Last few characters
  
    return `${start}...${end}${extension}`;
  }
  const remainingUploads = maxFiles - pdfs.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Uploadlink
            </h1>
          </div>
          <div className="relative">
  <button
    onClick={() => setShowDropdown((prev) => !prev)}
    className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
  >
    <UserCircleIcon className="h-6 w-6 text-gray-300" />
    <span className="font-medium text-gray-300">{user?.email || 'User'}</span>
  </button>
  {showDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800/50 rounded-lg shadow-lg">
      <Link href="/UserProfile">
        <button
          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <UserCircleIcon className="h-5 w-5 inline mr-2" />
          Profile
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 inline mr-2" />
        Logout
      </button>
    </div>
  )}
</div>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-6 w-6 text-indigo-400" />
              <h3 className="text-lg font-semibold text-gray-200">Remaining Uploads</h3>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {remainingUploads} / {maxFiles}
            </p>
          </div>

          {/* Upload Files Card */}
          <div
            onClick={() => router.push('/PDFUpload')}
            className="cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors flex flex-col justify-center items-center"
          >
            <ArrowUpTrayIcon className="h-10 w-10 text-indigo-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-200">Upload Files</h3>
            <p className="text-gray-400 mt-1 text-sm">Click here to upload your documents</p>
          </div>
        </div>

        {/* Recent Files */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
            <DocumentTextIcon className="h-6 w-6 text-indigo-400" />
            <span>Recent Uploads</span>
          </h2>
          <div className="mt-4 space-y-4">
            {pdfs.slice(0, 5).map((pdf) => (
              <div
                key={pdf.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-700/50"
              >
                <div>
                  <p className="font-medium text-gray-200">{truncateFileName(pdf.fileName, 25)}</p>
                  <p className="text-sm text-gray-400">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    {pdf.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={pdf.fileUrl}
                  target="_blank"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
