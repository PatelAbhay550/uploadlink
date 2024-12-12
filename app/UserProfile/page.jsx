'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { auth, db } from '@/firebase';

import { useRouter } from 'next/navigation';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  BellIcon, 
  ShieldCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  XMarkIcon,
  HomeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export default function UserProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStatus, setResetStatus] = useState({ type: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfs, setPdfs] = useState([]);
  const [deleteError, setDeleteError] = useState('');
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
  const stats = [
    { label: 'PDFs Processed', value: '45', icon: DocumentTextIcon },
    { label: 'Subscription', value: 'Pro Plan', icon: CreditCardIcon },
    { label: 'Storage Used', value: '2.4 GB', icon: ShieldCheckIcon },
  ];

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetStatus({
        type: 'success',
        message: 'Password reset email sent! Please check your inbox.'
      });
    } catch (error) {
      setResetStatus({
        type: 'error',
        message: error.message
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) return;
      
      // Delete user from Firebase Auth
      await deleteUser(user);
      
      // Redirect to home page after successful deletion
      router.push('/');
    } catch (error) {
      setDeleteError(error.message);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  const remainingUploads = maxFiles - pdfs.length;
  const PasswordResetModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reset Password</h3>
          <button 
            onClick={() => {
              setShowResetModal(false);
              setResetStatus({ type: '', message: '' });
            }}
            className="text-gray-400 hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {!resetStatus.type ? (
          <>
            <p className="text-gray-400 mb-4">
              We'll send a password reset link to your email address:
              <span className="block font-medium text-white mt-1">{user?.email}</span>
            </p>
            <button
              onClick={handlePasswordReset}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Send Reset Link
            </button>
          </>
        ) : (
          <div className={`p-4 rounded-lg ${
            resetStatus.type === 'success' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
              : 'bg-red-500/20 text-red-400 border border-red-500/20'
          }`}>
            {resetStatus.message}
          </div>
        )}
      </div>
    </div>
  );

  const DeleteAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-red-500/20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-red-400">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Delete Account</h3>
          </div>
          <button 
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteError('');
            }}
            className="text-gray-400 hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-400">
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
          
          {deleteError && (
            <div className="p-4 rounded-lg bg-red-500/20 text-red-400 border border-red-500/20">
              {deleteError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const updatedPasswordSection = (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
      <div className="flex items-center gap-3">
        <KeyIcon className="h-5 w-5 text-indigo-400" />
        <div>
          <p className="font-medium">Password</p>
          <p className="text-sm text-gray-400">Secure your account</p>
        </div>
      </div>
      <button 
        onClick={() => setShowResetModal(true)}
        className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors"
      >
        Reset Password
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {user?.email?.split('@')[0] || 'User'}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                  Pro Member
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/20">
                  Email Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center space-x-3">
                <stat.icon className="h-6 w-6 text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-200">{stat.label}</h3>
              </div>
              <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {pdfs.length}
              </p>
            </div>
          ))}
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <UserCircleIcon className="h-6 w-6 text-indigo-400" />
              <span>Account Settings</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300">Change</button>
              </div>
              {updatedPasswordSection}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BellIcon className="h-6 w-6 text-indigo-400" />
              <span>Preferences</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <BellIcon className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-gray-400">Email notifications for updates</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotification(!notification)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notification ? 'bg-indigo-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    notification ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <ArrowPathIcon className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="font-medium">Auto-Sync</p>
                    <p className="text-sm text-gray-400">Sync PDFs across devices</p>
                  </div>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300">Configure</button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span>Danger Zone</span>
          </h2>
          <p className="text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Add Modals */}
      {showResetModal && <PasswordResetModal />}
      {showDeleteModal && <DeleteAccountModal />}
    </div>
  );
} 
