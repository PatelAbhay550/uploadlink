'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const tiers = [
    {
        name: 'Free',
        id: 'free',
        price: '$0',
        features: ['5 PDF summaries/month', 'Basic AI summary'],
    },
    {
        name: 'Pro',
        id: 'pro',
        price: '$15',
        features: ['50 PDF summaries/month', 'Advanced AI summary'],
    },
];

export default function SubscriptionPlans() {
    const [selectedTier, setSelectedTier] = useState('free');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubscribe = async (tierId) => {
        try {
            setLoading(true);
            
            if (tierId === 'free') {
                // Handle free tier signup
                router.push('/dashboard');
                return;
            }

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tierId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gray-900 text-gray-100">
                <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tiers.map((tier) => (
                        <div 
                            key={tier.id}
                            className={`border p-6 rounded-lg bg-gray-800 hover:bg-gray-750 transition-all ${
                                selectedTier === tier.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'
                            }`}
                            onClick={() => setSelectedTier(tier.id)}
                        >
                            <h3 className="font-bold text-2xl text-blue-400">{tier.name}</h3>
                            <p className="text-3xl font-bold my-3">{tier.price}<span className="text-lg text-gray-400">/month</span></p>
                            <ul className="my-6 space-y-3">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <span className="text-emerald-400 text-lg">✓</span>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSubscribe(tier.id)}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium
                                    hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed
                                    transition-all duration-200 transform hover:-translate-y-1"
                            >
                                {loading ? 'Processing...' : `Get Started with ${tier.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
    );
}
