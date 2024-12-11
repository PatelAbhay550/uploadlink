import ChatClient from './ChatClient';

// Server Component
export default function ChatPage({ params }) {
  return <ChatClient pdfId={params.pdfId} />;
} 