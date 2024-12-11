import { NextResponse } from 'next/response';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

const PRICES = {
  'free': 'price_free', // Free tier doesn't need Stripe price ID
  'pro': 'price_your_stripe_price_id'  // Add your Stripe price ID here
};

export async function POST(request) {
  try {
    const { tierId } = await request.json();
    
    if (tierId === 'free') {
      return NextResponse.json({ message: 'Free tier selected' });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICES[tierId],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 