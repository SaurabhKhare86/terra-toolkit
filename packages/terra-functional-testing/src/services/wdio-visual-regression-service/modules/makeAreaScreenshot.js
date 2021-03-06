import fsExtra from 'fs-extra';
import path from 'path';
import uuidv4 from 'uuid/v4';
import logger from '@wdio/logger';

import ScreenshotStrategyManager from '../utils/ScreenshotStrategyManager';
import getScreenDimensions from '../scripts/getScreenDimensions';
import virtualScroll from '../scripts/virtualScroll';
import pageHeight from '../scripts/pageHeight';
import saveBase64Image from '../utils/saveBase64Image';
import { cropImage, mergeImages } from '../utils/image';
import ScreenDimension from '../utils/ScreenDimension';
import normalizeScreenshot from '../utils/normalizeScreenshot';

const log = logger('wdio-visual-regression-service:makeAreaScreenshot');
const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

async function storeScreenshot(browser, screenDimensions, cropDimensions, base64Screenshot, filePath) {
  const normalizedBase64Screenshot = await normalizeScreenshot(browser, screenDimensions, base64Screenshot);
  log.info(
    'crop screenshot with width: %s, height: %s, offsetX: %s, offsetY: %s',
    cropDimensions.getWidth(),
    cropDimensions.getHeight(),
    cropDimensions.getX(),
    cropDimensions.getY(),
  );

  const croppedBase64Screenshot = await cropImage(normalizedBase64Screenshot, cropDimensions);

  await saveBase64Image(filePath, croppedBase64Screenshot);
}

export default async function makeAreaScreenshot(browser, startX, startY, endX, endY) {
  log.info('requested a screenshot for the following area: %j', {
    startX, startY, endX, endY,
  });

  const screenDimensions = await browser.execute(getScreenDimensions);
  log.info('detected screenDimensions %j', screenDimensions);
  const screenDimension = new ScreenDimension(screenDimensions, browser);

  const screenshotStrategy = ScreenshotStrategyManager.getStrategy(browser, screenDimension);
  screenshotStrategy.setScrollArea(startX, startY, endX, endY);

  const uuid = uuidv4();

  const dir = path.join(tmpDir, uuid);

  try {
    await fsExtra.ensureDir(dir);

    const cropImages = [];
    const screenshotPromises = [];

    log.info('set page height to %s px', screenDimension.getDocumentHeight());
    await browser.execute(pageHeight, `${screenDimension.getDocumentHeight()}px`);

    let loop = false;
    do {
      const {
        x, y, indexX, indexY,
      } = screenshotStrategy.getScrollPosition();
      log.info('scroll to coordinates x: %s, y: %s for index x: %s, y: %s', x, y, indexX, indexY);
      /* eslint-disable no-await-in-loop */

      await browser.execute(virtualScroll, x, y, false);
      await browser.pause(100);

      log.info('take screenshot');
      const base64Screenshot = await browser.takeScreenshot();
      const cropDimensions = screenshotStrategy.getCropDimensions();
      const filePath = path.join(dir, `${indexY}-${indexX}.png`);
      /* eslint-enable no-await-in-loop */

      screenshotPromises.push(storeScreenshot(browser, screenDimension, cropDimensions, base64Screenshot, filePath));

      if (!Array.isArray(cropImages[indexY])) {
        cropImages[indexY] = [];
      }

      cropImages[indexY][indexX] = filePath;

      loop = screenshotStrategy.hasNextScrollPosition();
      screenshotStrategy.moveToNextScrollPosition();
    } while (loop);

    const [mergedBase64Screenshot] = await Promise.all([
      Promise.resolve().then(async () => {
        await Promise.all(screenshotPromises);
        log.info('merge images together');
        const mergedBase64Images = await mergeImages(cropImages);
        log.info('remove temp dir');
        await fsExtra.remove(dir);
        return mergedBase64Images;
      }),
      Promise.resolve().then(async () => {
        log.info('reset page height');
        await browser.execute(pageHeight, '');

        log.info('revert scroll to x: %s, y: %s', 0, 0);
        await browser.execute(virtualScroll, 0, 0, true);
      }),
    ]);

    return mergedBase64Screenshot;
  } catch (e) {
    try {
      await fsExtra.remove(dir);
    } catch (error) {
      // do nothing
    }

    throw e;
  }
}
