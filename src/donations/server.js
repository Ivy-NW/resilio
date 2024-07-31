const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Africastalking = require('africastalking');
const path = require('path');

const app = express();
const port = 5000;

// Africa's Talking credentials from environment variables
const AFRICAS_TALKING_API_KEY = 'atsk_ae2f2cc1b6d577f531d06c7e82e16be9fd8e2011a5244da49df24247b77bfd8b94316c31';
const AFRICAS_TALKING_USERNAME = 'airtimeapi';

// Initialize Africa's Talking SDK
const africastalking = Africastalking({
    apiKey: AFRICAS_TALKING_API_KEY,
    username: AFRICAS_TALKING_USERNAME
});

// Create a messaging instance
const messaging = africastalking.Messaging;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from 'public' directory

// Function to validate local phone number format (basic validation)
const isValidLocalPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Example: 0712345678 for local Kenyan numbers
    return phoneRegex.test(phoneNumber);
};

// Serve the React app's main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle donations
app.post('/api/donate', async (req, res) => {
    const { phoneNumber, boxType, amount, address } = req.body;

    // Validate input data
    if (!phoneNumber || !boxType || !isValidLocalPhoneNumber(phoneNumber) ||
        (boxType === 'Money Box' && !amount) || (boxType !== 'Money Box' && !address)) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
    }

    let message = '';

    // Construct the SMS message based on the donation type
    if (boxType === 'Money Box') {
        message = `Thank you for donating KES ${amount} to the Money Box!`;
    } else {
        message = `Thank you for donating items from the ${boxType}. Pickup will be arranged at ${address}.`;
    }

    try {
        // Send SMS using Africa's Talking package
        const response = await messaging.send({
            to: phoneNumber,
            message: message,
            from: 'YOUR_SENDER_ID' // Optional: Replace with your sender ID
        });
        console.log('SMS sent successfully:', response);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
