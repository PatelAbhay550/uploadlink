'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { generateChatResponse, generateSummary } from '@/app/utils/ai';
import { 
  ArrowLeftIcon, 
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UserCircleIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export default function ChatClient({ pdfId }) {
  const [pdf, setPdf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPDF = async () => {
      if (!user || !pdfId) return;

      try {
        const docRef = doc(db, 'pdfs', pdfId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().userId === user.uid) {
          const pdfData = docSnap.data();
          setPdf(pdfData);
          
          // Load existing chat messages
          const chatRef = collection(db, `pdfs/${pdfId}/messages`);
          const messagesSnap = await getDocs(chatRef);
          const existingMessages = messagesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate()
          }));
          setMessages(existingMessages);

          if (!pdfData.summary) {
            setGenerating(true);
            try {
              const summary = await generateSummary(pdfData.text || 'No text available');
              await updateDoc(docRef, { summary });
              setSummary(summary);
            } catch (error) {
              console.error('Error generating summary:', error);
              setError('Failed to generate summary. Please try again later.');
            }
            setGenerating(false);
          } else {
            setSummary(pdfData.summary);
          }
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setError('Failed to load PDF data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();
  }, [pdfId, user, router]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || generating) return;

    setError(''); // Clear any previous errors
    const newMessage = {
      content: inputMessage,
      type: 'user',
      timestamp: new Date()
    };

    try {
      // Add message to Firestore
      const chatRef = collection(db, `pdfs/${pdfId}/messages`);
      await addDoc(chatRef, newMessage);
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setGenerating(true);

      // Get AI response
      const response = await generateChatResponse(
        [...messages, newMessage],
        pdf.text || 'No text available'
      );

      const aiMessage = {
        content: response,
        type: 'ai',
        timestamp: new Date()
      };

      // Add AI response to Firestore
      await addDoc(chatRef, aiMessage);
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error in chat:', error);
      setError('Failed to process your request. Please try again.');
    } finally {
      setGenerating(false);
      scrollToBottom();
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div>
                <h1 className="font-semibold text-lg flex items-center gap-2">
                  <DocumentTextIcon className="h-5 w-5 text-indigo-400" />
                  {pdf?.fileName}
                </h1>
                <p className="text-sm text-gray-400">Chat with your PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Summary Card */}
        {summary && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-semibold">AI Summary</h3>
            </div>
            <p className="text-gray-300">{summary}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 text-red-400">
            {error}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl h-[calc(100vh-380px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4 flex items-start gap-3">
              <ComputerDesktopIcon className="h-6 w-6 text-indigo-400 mt-1" />
              <div>
                <p className="text-gray-200">
                  Hello! I've analyzed "{pdf?.fileName}". What would you like to know about it?
                </p>
              </div>
            </div>
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  {message.type === 'user' ? (
                    <UserCircleIcon className="h-6 w-6 text-indigo-400" />
                  ) : (
                    <ComputerDesktopIcon className="h-6 w-6 text-indigo-400" />
                  )}
                  <div>
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700/50 text-gray-200'
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generating && (
              <div className="flex justify-start">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your PDF..."
                disabled={generating}
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={generating}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors flex items-center gap-2"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                {generating ? 'Processing...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 