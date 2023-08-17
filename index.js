const captureScreenshot = require('./screenshot');
const fs = require('fs');

(async () => {
    const base64Image = await captureScreenshot('https://vercel.com/pricing');
    
    // 解码Base64图像数据
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // 将图像数据写入文件
    fs.writeFileSync('screenshot.png', imageBuffer);
    
    console.log("Image saved as screenshot.png");
})();
