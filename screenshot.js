const puppeteer = require('puppeteer');

async function captureScreenshot(url) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const viewportWidth = 1280;  // 设定一个固定的视口宽度
    await page.setViewport({ width: viewportWidth, height: 800 });  // 设置一个初始视口高度

    await page.goto(url, { waitUntil: 'networkidle2' });

    // 获取页面的实际高度
    const pageHeight = await page.evaluate(() => {
        return document.documentElement.scrollHeight;
    });

    // 设置页面视口大小以匹配整个页面的高度（宽度保持不变）
    await page.setViewport({ width: viewportWidth, height: pageHeight });

    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });
    await browser.close();
    return screenshot;
}

module.exports = captureScreenshot;
