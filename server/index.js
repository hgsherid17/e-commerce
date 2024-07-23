const express = require('express');
const stripe = require('stripe')('sk_test_51PfQVNJyX9kTwHpnjUMHCu9PTJQKOonafBQrPaj6jwSSgyHzKdCmlxNUHpkNMPfxw4v5aiihmN4wKtgvX5sZlSbE00m8ByMV3u');
const cors = require('cors');
const port = 3301;

const app = express();
// Super sensitive information!!! Dont steal hackerz!!!1!
// const stripe = Stripe('sk_test_51PfQVNJyX9kTwHpnjUMHCu9PTJQKOonafBQrPaj6jwSSgyHzKdCmlxNUHpkNMPfxw4v5aiihmN4wKtgvX5sZlSbE00m8ByMV3u');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    // Ensure rounded in cents
    const amountInCents = Math.round(amount * 100)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send('Internal Server Error');
    }
    
});

app.listen(port, () => console.log("Stripe server running on port " + port));