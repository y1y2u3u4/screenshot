const express = require('express');
const captureScreenshot = require('./screenshot');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/capture', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send({ error: 'URL parameter is missing.' });
    }

    try {
        const base64Image = await captureScreenshot(url);
        
        // 解码Base64图像数据
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // 设置Content-Type为图像，并发送图像数据
        res.header('Content-Type', 'image/png').send(imageBuffer);
        
    } catch (error) {
        res.status(500).send({ error: 'Error capturing the URL content.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
