const express = require('express');
const captureAndRecognize = require('./screenshot');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/capture', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send({ error: 'URL parameter is missing.' });
    }

    try {
        const prices = await captureAndRecognize(url);
        res.send({ prices });
    } catch (error) {
        res.status(500).send({ error: 'Error capturing and recognizing the URL content.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
