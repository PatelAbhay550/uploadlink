import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="font-bold text-xl">
                        PDF AI Chat
                    </Link>
                    
                    {user && (
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                                Dashboard
                            </Link>
                            <Link href="/profile" className="relative">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    {user.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {user.email?.[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
} 