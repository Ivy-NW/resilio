const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Africastalking = require('africastalking');
const path = require('path');

const app = express();
const port = 5000;

// Africa's Talking credentials from environment variables
const AFRICAS_TALKING_API_KEY = 'atsk_85b03f99693c2098d03cd541b9ea345207afcdda64ec88a5eeaec164221bbe62febb11c7';
const AFRICAS_TALKING_USERNAME = 'airtimeapi';

// Initialize Africa's Talking SDK
const africastalking = Africastalking({
    apiKey: AFRICAS_TALKING_API_KEY,
    username: AFRICAS_TALKING_USERNAME
});

// Create an SMS instance
const sms = africastalking.SMS;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from 'public' directory

// Serve the React app's main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle donations
app.post('/api/donate', async (req, res) => {
    const { phoneNumber, boxType, amount, address } = req.body;

    // Validate input data
    if (!phoneNumber || !boxType ||
        (boxType === 'Money Box' && !amount) || (boxType !== 'Money Box' && !address)) {
        console.log('Invalid input data:', { phoneNumber, boxType, amount, address });
        return res.status(400).json({ success: false, message: 'Invalid input data' });
    }

    // Construct the SMS message based on the donation type
    let message = '';
    if (boxType === 'Money Box') {
        message = `Thank you for your generous donation of KES ${amount} to the Money Box! Your support helps us make a difference.`;
    } else {
        message = `Thank you for donating items from the ${boxType}. Our team will arrange for pickup at the address provided: ${address}. Your contribution is greatly appreciated!`;
    }

    try {
        // Check if SMS is correctly initialized
        if (!sms) {
            throw new Error('SMS service not initialized');
        }

        // Send SMS using Africa's Talking package
        const response = await sms.send({
            to: phoneNumber,
            message: message
        });
        console.log('SMS sent successfully:', JSON.stringify(response, null, 2));
        res.json({ success: true, message: 'SMS sent successfully' });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: false, message: 'Failed to send SMS', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
