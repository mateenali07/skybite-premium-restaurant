const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// Safe Stripe initialization
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
    console.error("WARNING: STRIPE_SECRET_KEY is missing. Payment features will fail.");
}
const stripe = stripeKey ? Stripe(stripeKey) : null;

router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    if (!stripe) {
        return res.status(500).json({ error: "Stripe is not configured on the server." });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Intent Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
