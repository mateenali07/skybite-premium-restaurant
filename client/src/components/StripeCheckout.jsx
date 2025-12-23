import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import API_URL from '../config';
import { useCart } from '../context/CartContext';

// Public Key (Test Mode)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { total, cart, clearCart } = useCart();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        // 1. Get Client Secret from Backend
        // Note: Since we are mocking the backend secret, this step is symbolic in this demo environment
        // unless the user adds a real Secret Key to the backend.
        try {
            const { data: { clientSecret } } = await axios.post(`${API_URL}/create-payment-intent`, {
                amount: Math.round(total * 100)
            });

            // 2. Confirm Payment (Real Stripe would fail with a mock secret, so we wrap this)
            // For this 'Simulator', we will assume success if the card is "valid" in the UI.

            const cardElement = elements.getElement(CardElement);

            // Simulating network delay
            await new Promise(r => setTimeout(r, 1500));

            // If we had real keys:
            // const result = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: { card: cardElement }
            // });

            // Mock Success
            console.log("Payment Mock Success");
            onSuccess();

        } catch (err) {
            setError(err.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="mb-4 font-bold text-gray-700">Pay with Card</h3>
            <div className="p-3 bg-white border rounded mb-4">
                <CardElement />
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
        </form>
    );
};

export const StripeCheckout = ({ onSuccess }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={onSuccess} />
    </Elements>
);
